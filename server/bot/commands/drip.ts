import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { verifyChannelId } from '../../utils.js';
import { drip } from '../../actions/faucet.js';

export const data = new SlashCommandBuilder()
  .setName('drip')
  .setDescription('Get some sweet XDAI')
  .addStringOption((option) =>
    option.setName('wallet').setDescription('Wallet address').setRequired(false)
  );

export async function execute(interaction: CommandInteraction) {
  if (interaction.channelId !== verifyChannelId) {
    await interaction.reply({
      content: `Invalid channel. Please use <#${verifyChannelId}>`,
      ephemeral: true,
    });
    return;
  }
  await interaction.deferReply({ ephemeral: true });
  await drip(interaction);
}
