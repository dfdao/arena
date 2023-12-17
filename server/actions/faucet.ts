import { ethers, utils } from 'ethers';
import { FAUCET_ADDRESS } from '@darkforest_eth/contracts';
import 'dotenv/config';
import { Request, Response } from 'express';
import {
  BURNER_DRIP,
  Drip,
  VERIFY_DRIP,
  findWalletsByDiscordId,
  getNetwork,
  pKey,
  readDb,
  writeDb,
} from '../utils.js';
import { CommandInteraction } from 'discord.js';
import { faucet, provider } from '../contracts.js';

export const logStats = async function () {
  try {
    console.log(`Network`, getNetwork().name);
    console.log('server booting up at', new Date().toUTCString());
    console.log('faucet address', FAUCET_ADDRESS);
    console.log(`faucet owner`, await faucet.getOwner());
    const balance = await faucet.getBalance();
    console.log(`faucet balance`, ethers.utils.formatEther(balance));
    console.log(`[FAUCET] has balance`, ethers.utils.formatEther(balance));
    if (balance.lte(1)) {
      throw new Error('balance below 1. Plz refill me');
    }
    const maxDrip = ethers.utils.formatEther(await faucet.getMaxDripAmount());
    console.log(`faucet max drip`, maxDrip);
    if (parseFloat(maxDrip) < BURNER_DRIP || parseFloat(maxDrip) < VERIFY_DRIP) {
      throw new Error('Faucet max drip is lower than burner drip or verify drip');
    }
  } catch (error) {
    console.log(`[ERROR] logStats`, error);
  }
};

export const sendDrip = async function (address: string, amount: number, discordId?: string) {
  const db = await readDb();
  if (discordId) {
    // Confirm that the discordId has NOT received a prior drip.
    const dripHistory = db.discordToDripTime[discordId];
    if (dripHistory && dripHistory.length > 0) {
      const drip = dripHistory[dripHistory.length - 1];
      console.log(`[FAUCET] User already received drip`, drip);
      throw new Error(`This user has already received a drip`);
    }
  }

  console.log(`${address} balance`, ethers.utils.formatEther(await provider.getBalance(address)));
  const dripTx = await faucet.drip(address, utils.parseEther(amount.toString()));
  await dripTx.wait();
  console.log(
    `${address} balance after drip`,
    ethers.utils.formatEther(await provider.getBalance(address))
  );
  console.log(`[FAUCET] finished drip, now adding to DB if linked to Discord`);
  const discord = db.discords[address];
  if (!discord) {
    return console.log(`[SERVER] no discord username found for ${address} in db`);
  }
  const drip: Drip = { address, user: discord, amount, timestamp: Date.now() };

  if (!db.discordToDripTime) db.discordToDripTime = {};

  if (!db.discordToDripTime[discord.discordId]) {
    db.discordToDripTime[discord.discordId] = [drip];
  } else {
    db.discordToDripTime[discord.discordId].push(drip);
  }
  await writeDb(db);
  console.log(
    `[Faucet] added $${amount} XDAI at ${new Date(drip.timestamp).toUTCString()} for ${
      discord.discordUsername
    } to db`
  );
};

export const dripRequest = async (req: Request, res: Response) => {
  let address = req.params.address;
  try {
    console.log('requesting drip at', new Date().toUTCString());

    if (!ethers.utils.isAddress(req.params.address)) {
      throw new Error(`address ${req.params.address} is not valid`);
    }

    await sendDrip(address, BURNER_DRIP);
    res.status(200).send();
  } catch (error) {
    console.log('[ERROR] send drip', error);
    res.status(500).send(error);
  }
  return;
};

export const drip = async (interaction: CommandInteraction) => {
  try {
    const { username, id } = interaction.user;
    const users = await findWalletsByDiscordId(id);
    const wallet = interaction.options.get('wallet')?.value as string;

    if (wallet && !utils.isAddress(wallet)) throw new Error(`Invalid wallet address`);
    if (users.length > 1) {
      console.log(`[DRIP] user has multiple wallets linked.`);
      if (!wallet) {
        console.log(
          `[DRIP] no wallet specified. Please specify which wallet to drip to via /drip <wallet>`
        );
        let errorStr = `You have multiple wallets linked to this account. Please specify which wallet to drip to via /drip <wallet>`;
        users.map((u) => (errorStr += `\n/drip ${u.address}`));
        throw new Error(errorStr);
      }
    }
    await dripCommand(interaction, '', username, wallet, id);
  } catch (error) {
    await interaction.followUp({
      content: `Drip failed. \n\n${error}`,
      ephemeral: true,
    });
  }
};

export const dripCommand = async (
  interaction: CommandInteraction,
  replyText: string,
  username: string,
  sender: string,
  userId: string
) => {
  let sentDrip = false;
  try {
    console.log(`[BOT] requesting faucet drip of $${VERIFY_DRIP} XDAI for ${username}`);
    await interaction.editReply((replyText += `\n❓ Requesting $${VERIFY_DRIP} XDAI ...`));

    await sendDrip(sender, VERIFY_DRIP, userId);
    sentDrip = true;
    await interaction.editReply((replyText += `\n✅ Sent $${VERIFY_DRIP} XDAI ...`));
  } catch (error) {
    console.log(`[FAUCET] error`, error);
    await interaction.followUp({
      content: `Drip failed. \n\n${error}`,
      ephemeral: true,
    });
  }
  return sentDrip;
};
