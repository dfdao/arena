import { ethers } from 'ethers';
import { FAUCET_ADDRESS } from '@darkforest_eth/contracts';
import faucetContractAbi from '@darkforest_eth/contracts/abis/DFArenaFaucet.json' assert { type: 'json' };
import 'dotenv/config';
import { Request, Response } from 'express';
import { BURNER_DRIP, Drip, VERIFY_DRIP, getNetwork, pKey, readDb, writeDb } from './utils.js';

if (!pKey) throw new Error('Private key not found');

const provider = new ethers.providers.JsonRpcProvider(getNetwork().httpRpc);

const wallet = new ethers.Wallet(pKey, provider);
const faucet = new ethers.Contract(FAUCET_ADDRESS, faucetContractAbi, wallet);

export const logStats = async function () {
  try {
    console.log(`Network`, getNetwork().name);
    console.log('server booting up at', new Date().toUTCString());
    console.log('faucet address', FAUCET_ADDRESS);
    console.log(`faucet owner`, await faucet.getOwner());
    const balance = await faucet.getBalance();
    console.log(`faucet balance`, ethers.utils.formatEther(balance));
    const maxDrip = ethers.utils.formatEther(await faucet.getDripAmount())
    console.log(`faucet drip`, maxDrip);
    if(parseFloat(maxDrip) < BURNER_DRIP || parseFloat(maxDrip) < VERIFY_DRIP) {
      throw new Error('Faucet max drip is lower than burner drip or verify drip')
    }
  } catch (error) {
    console.log(`[ERROR] logStats`, error);
  }
};

export const sendDrip = async function (address: string, amount: number) {
  const balance = await faucet.getBalance();
  console.log(`[FAUCET] has balance`, balance.toString());
  if (balance.lte(1)) {
    throw new Error('balance too low');
  }
  console.log(`${address} balance`, ethers.utils.formatEther(await provider.getBalance(address)));
  const dripTx = await faucet.drip(address, amount);
  await dripTx.wait();
  console.log(
    `${address} balance after drip`,
    ethers.utils.formatEther(await provider.getBalance(address))
  );
  const db = await readDb();
  const discord = db.discords[address];
  if(!discord) {
    return console.log(`[SERVER] no discord username found for ${address} in db`); 
  }
  const drip: Drip = { address, discord, amount, timestamp: Date.now() } 
  
  if(!db.discordToDripTime) db.discordToDripTime = {}; 

  if(!db.discordToDripTime[discord]) {
    db.discordToDripTime[discord] = [drip]
  }
  else {
    db.discordToDripTime[discord].push(drip)
  }
  await writeDb(db);
  console.log(`[SERVER] added drip at ${new Date(drip.timestamp).toUTCString()} for ${discord} to db`);
};


export const drip = async (req: Request, res: Response) => {
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
    res.status(500).send(error)
  }
  return;
};
