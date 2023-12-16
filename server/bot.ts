import { EthAddress } from '@darkforest_eth/types';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { utils } from 'ethers';
import { Request, Response } from 'express';
import fs, { promises } from 'fs';

const targetChannelId = '909812397680767006';
const DISCORDS_PATH = './discords.json';

export function verifySignature(sig: string, sender: string, message: string): boolean {
  const recovered = utils.verifyMessage(message, sig);
  console.log(`recovered`, recovered, `sender`, sender);
  return recovered.toLowerCase().trim() === sender.toLowerCase().trim();
}

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.InteractionCreate, (interaction) => {
  console.log(`interaction`, interaction);
});

client.on(Events.ClientReady, () => {
  console.log(`Logged me in as ${client?.user?.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.channelId !== targetChannelId) return;
  if (!message.author.bot) {
    let verified = false;

    try {
      console.log(`verifiying ${message.author.username}`);
      const roles = message.member?.roles.cache.map((role) => role.name); // Map roles to their names.
      console.log(`[SERVER] roles`, roles);
      const content = JSON.parse(message.content) as { sender: EthAddress; signature: string };
      if (content.signature && content.sender) {
        verified = verifySignature(content.signature, content.sender, message.author.username);
        if (!verified) {
          throw new Error('Signature verification failed');
        }
        if (verified) {
          console.log(`[SERVER] verified ${message.author.username}!`);
          const discords: { [key: string]: string } = JSON.parse(
            await promises.readFile(DISCORDS_PATH, 'utf-8')
          );
          if (discords[content.sender] === message.author.username) {
            throw new Error(`You've already verified ${message.author.username} for this address`);
          }
          discords[content.sender] = message.author.username;
          await promises.writeFile(DISCORDS_PATH, JSON.stringify(discords));
          console.log([
            `[SERVER] verified that ${message.author.username} controls ${content.sender}`,
          ]);
          console.log(`[SERVER] requesting drip for ${message.author.username}`);
        }
        await message.channel.send(`Verified ${message.author.username}!`);
      }
    } catch (error) {
      console.log(`[SERVER] error`, error);
      await message.channel.send(
        `Failed to verify: ${message.author.username}. Make sure you correctly entered your username before copying the message at https://arena.dfdao.xyz`
      );
    }
    await message.channel.send(
      `TEST: verifying ${message.author.username}: ${verified ? 'Success' : 'Failure'}`
    );
  }
});

export const discords = async (req: Request, res: Response) => {
  if (!fs.existsSync(DISCORDS_PATH)) {
    await promises.writeFile(DISCORDS_PATH, JSON.stringify({}));
  }
  const discords: { [key: string]: string } = JSON.parse(
    await promises.readFile(DISCORDS_PATH, 'utf-8')
  );
  console.log(`discords`, discords);
  res.json(discords);
};

export const disconnectAddress = async (req: Request, res: Response) => {
  // 1. Extract address
  // 2. If address exists, remove it from the mapping.
  // 3. Set mapping ...
};

// Handle CLI args for signature verification
if (process.argv[2] === 'verify') {
  const sig = process.argv[3];
  const sender = process.argv[4];
  const message = process.argv[5];
  console.log(`sig`, sig, `sender`, sender, `message`, message);
  console.log(`verified`, verifySignature(sig, sender, message));
}

// How to call this from command line?
// node ./server/src/bot.js verify <signature> <sender> <username>
