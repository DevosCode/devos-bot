const { findOrCreateMember } = require("./../../utils/database/requetes/members");
const { getGuildSettingsByGuildId } = require("../../utils/database/requetes/settings_guild");
const { updateChannelNameWithCount } = require("../../utils/event");
const { GuildMember } = require('discord.js');
// const canvafy = require("canvafy");
/**
 * 
 * @param {*} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
  await member.roles.add(client.config.autorole_roles, 'Ajout des autoroles.');
  await findOrCreateMember(member, member.guild.id);
  const settings = await getGuildSettingsByGuildId(member.guild.id);
  if (settings.GENERAL_CHANNEL) {
    const general_channel = member.guild.channels.cache.get(settings.GENERAL_CHANNEL) || await member.guild.channels.fetch(settings.GENERAL_CHANNEL).catch(() => null);
    console.log(general_channel, "--", settings.GENERAL_CHANNEL);
    if (general_channel) await general_channel.send(`Bienvenue ${member.toString()} !\nN'hésite pas à faire comme chez toi et à venir parler dans le général 😉. Tu peux nous parler de toi ou de ce qui t'amène ici par exemple.`);
  }
  if (settings.WELCOME_CHANNEL) {
    // const welcome_channel = member.guild.channels.cache.get(settings.WELCOME_CHANNEL) || await member.guild.channels.fetch(settings.WELCOME_CHANNEL).catch(() => null);
    // const welcome_card = await new canvafy.WelcomeLeave()
    //   .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
    //   .setBackground("image", "https://i.imgur.com/8fOLTXQ.png")
    //   .setTitle("Bienvenue")
    //   .setDescription("Devos Code, serveur communautaire de programmation !")
    //   .setBorder(client.config.colors.main.toHex())
    //   .setAvatarBorder(client.config.colors.main.toHex())
    //   .setOverlayOpacity(0.3)
    //   .build();

    // welcome_channel.send({
    //   files: [
    //     { attachment: welcome_card.toBuffer(), name: `welcome-${member.id}.png` }
    //   ]
    // });
  }

  // edit stats channels
  const all_members = member.guild.memberCount;
  const members = member.guild.members.cache.filter(m => m.user.bot === false).size;
  if (settings.STATS_ALL_CHANNEL) {
    const all_members_channel = member.guild.channels.cache.get(settings.STATS_ALL_CHANNEL) || await member.guild.channels.fetch(settings.STATS_ALL_CHANNEL).catch(() => null);
    await updateChannelNameWithCount(all_members_channel, all_members);
  }
  if (settings.STATS_MEMBERS_CHANNEL) {
    const members_channel = member.guild.channels.cache.get(settings.STATS_MEMBERS_CHANNEL) || await member.guild.channels.fetch(settings.STATS_MEMBERS_CHANNEL).catch(() => null);
    await updateChannelNameWithCount(members_channel, members);
  }
  if (settings.STATS_BOTS_CHANNEL) {
    const bots_channel = member.guild.channels.cache.get(settings.STATS_BOTS_CHANNEL) || await member.guild.channels.fetch(settings.STATS_BOTS_CHANNEL).catch(() => null);
    const bots = all_members - members;
    await updateChannelNameWithCount(bots_channel, bots);
  }
};