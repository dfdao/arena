import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const targetChannelId = '909812397680767006';

const client = new Client({
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

client.login(process.env.BOT_TOKEN);
