import { CommandInteraction, GuildMemberRoleManager } from 'discord.js';
import { CAPTCHA_VERIFIED_ROLE, VERIFY_DRIP, readDb, verifySignature, writeDb } from '../utils.js';
import { EthAddress } from '@darkforest_eth/types';
import { dripCommand, sendDrip } from './faucet.js';

export const verify = async (interaction: CommandInteraction) => {
  const { username, id } = interaction.user;
  let replyText = '';
  try {
    console.log(`[BOT] attempting to verify ${username}`);
    replyText += `❓ Verifying...`;
    await interaction.editReply(replyText);
    const roles = interaction.member?.roles as GuildMemberRoleManager;
    const userRoles = roles.cache.map((role) => role.name); // Map roles to their names.
    if (!userRoles?.includes(CAPTCHA_VERIFIED_ROLE)) {
      throw new Error(`Missing verified role. Must verify with a captcha before linking`);
    }
    const message = interaction.options.get('message')?.value as string;
    if (!message) throw new Error(`No signature provided`);

    const content = JSON.parse(message) as { sender: EthAddress; signature: string };
    if (!content || !content.signature || !content.sender)
      throw new Error(`Message does not have format: { sender: string, signature: string }`);

    const verified = verifySignature(content.signature, content.sender, username);

    if (!verified) {
      throw new Error(
        'Signature verification failed.\n Make sure you signed your exact Discord username at https://arena.dfdao.xyz'
      );
    }

    const db = await readDb();
    console.log(`[SERVER] db`, db);
    if (!db.discords) db.discords = {};
    if (db.discords[content.sender]?.discordId === id) {
      throw new Error(`You've already verified wallet ${content.sender} with username ${username}`);
    }

    db.discords[content.sender] = { discordUsername: username, discordId: id };
    await writeDb(db);
    console.log([`[BOT] verified that ${username} controls ${content.sender}`]);
    replyText += `\n✅  Verified`;
    await interaction.editReply(replyText);

    let sentDrip = false;
    sentDrip = await dripCommand(interaction, replyText, username, content.sender, id);

    if (verified && sentDrip) {
      await interaction.followUp({
        content: `🎉 ${username} has been verified and sent $${VERIFY_DRIP} XDAI!`,
      });
    } else if (verified) {
      await interaction.followUp({
        content: `🎉 ${username} has been verified!`,
      });
    }
  } catch (error) {
    console.log(`[SERVER] error`, error);
    await interaction.followUp({
      content: `Failed to verify ${username}:\n\n${error}`,
      ephemeral: true,
    });
  }
};
