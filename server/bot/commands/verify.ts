import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { setTimeout } from 'timers/promises';
import { verify } from '../../actions/verify.js';
import { targetChannelId } from '../../utils.js';

export const data = new SlashCommandBuilder()
  .setName('verify')
  .setDescription('verify an address')
  .addStringOption((option) =>
    option
      .setName('message')
      .setDescription('The copied text from arena.dfdao.xyz')
      .setRequired(true)
  );
export async function execute(interaction: CommandInteraction) {
  if (interaction.channelId !== targetChannelId) {
    await interaction.reply({
      content: `Invalid channel. Please use <#${targetChannelId}>`,
      ephemeral: true,
    });
    return;
  }
  await interaction.deferReply({ ephemeral: true });
  await verify(interaction);
}
