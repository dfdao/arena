import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
// const wait = require('node:timers/promises').setTimeout; in Typescript
import { setTimeout } from 'timers/promises';

export const data = new SlashCommandBuilder().setName('pong').setDescription('Replies with Pong!');
export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply({ ephemeral: true });
  await setTimeout(4000);
  await interaction.editReply('Pong!');
  // await interaction.reply({ content: 'Pong!', ephemeral: true });
}
