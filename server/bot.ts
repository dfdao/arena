import { Client, Events, GatewayIntentBits} from 'discord.js';
import config from './config.json' assert { type: "json" };

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
});

const prefix = '!';

client.on(Events.InteractionCreate, interaction => {
  console.log(`interaction`, interaction)
});

client.on(Events.ClientReady, () => {
  console.log(`Logged me in as ${client?.user?.tag}`);
});


client.login(config.BOT_TOKEN);
