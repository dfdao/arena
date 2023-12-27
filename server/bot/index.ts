import { Client } from 'discord.js';
import { commands } from './commands/index.js';
import { deployCommands } from './deploy-commands.js';
import { setTimeout } from 'timers/promises';
import 'dotenv/config';

export const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
});

client.once('ready', () => {
  console.log('Discord bot is ready! 🤖');
});

// client.on('messageCreate', (message) => {
//   if (!message.guild) return; // Ensure this is not a direct message

//   const guildId = message.guild.id;
//   // dfdao guild id: 850187588148396052
//   console.log(`Guild ID: ${guildId}`);
// });

client.on('guildCreate', async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on('interactionCreate', async (interaction) => {
  console.log(`[BOT] interaction is command`, interaction.isCommand());
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  console.log(`[BOT] commandName`, commandName);
  if (commands[commandName as keyof typeof commands]) {
    console.log(`[BOT] Executing ${commandName}`);
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

if (process.argv[2] === 'commands') {
  const guildId = process.argv[3];
  if (!guildId) throw new Error(`No guild id!`);
  await setTimeout(2000);
  await deployCommands({ guildId });
}
