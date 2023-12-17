import { REST, Routes } from 'discord.js';
import { commands } from './commands/index.js';
import 'dotenv/config';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN not found in .env file');

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    if (!process.env.DISCORD_CLIENT_ID) throw new Error('DISCORD_CLIENT_ID not found in .env file');

    console.log('Started refreshing application (/) commands.');
    const commandsData = Object.values(commands).map((command) => command.data);

    await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guildId), {
      body: commandsData,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}
