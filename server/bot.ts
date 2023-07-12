import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { Request, Response } from 'express';
import fs, { promises } from 'fs';

const targetChannelId = '909812397680767006';
const DISCORDS_PATH = './discords.json';

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
  if (message.content === '/verify') {
    console.log(`verifiying ${message.author.username}`);

    console.log(message);
    message.channel.send(`verifying ${message.author.username}`);
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
