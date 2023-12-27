import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { verify } from '../../actions/verify.js';
import { verifyChannelId } from '../../utils.js';

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
  if (interaction.channelId !== verifyChannelId) {
    await interaction.reply({
      content: `Invalid channel: ${interaction.channelId}. Please use <#${verifyChannelId}>`,
      ephemeral: true,
    });
    return;
  }
  await interaction.deferReply({ ephemeral: true });
  await verify(interaction);
}
