import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { verify } from '../../actions/verify.js';
import { targetChannelId } from '../../utils.js';
import { drip, dripCommand } from '../../actions/faucet.js';

export const data = new SlashCommandBuilder()
  .setName('drip')
  .addStringOption((option) =>
    option.setName('wallet').setDescription('Wallet address').setRequired(false)
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
  await drip(interaction);
}
