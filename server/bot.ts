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
  console.log(`recovered`, recovered);
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
      const content = JSON.parse(message.content) as { sender: EthAddress; signature: string };
      if (content.signature && content.sender) {
        verified = verifySignature(content.signature, content.sender, '');
        if (verified) {
          const discords: { [key: string]: string } = JSON.parse(
            await promises.readFile(DISCORDS_PATH, 'utf-8')
          );
          discords[content.sender] = message.author.username;
          await promises.writeFile(DISCORDS_PATH, JSON.stringify(discords));
        }
      }
    } catch (error) {
      console.log(error);
    }
    message.channel.send(
      `verifying ${message.author.username}: ${verified ? 'Success' : 'Failure'}`
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
