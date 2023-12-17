import { EthAddress } from '@darkforest_eth/types';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { Request, Response } from 'express';
import { VERIFY_DRIP, readDb, targetChannelId, verifySignature, writeDb } from './utils.js';
import { sendDrip } from './actions/faucet.js';

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

export const discords = async (req: Request, res: Response) => {
  const db = await readDb();
  console.log(`discords`, db.discords);
  res.json(db.discords);
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
