const { findOrCreateMember } = require("./../../utils/database/requetes/members");
const { getGuildSettingsByGuildId } = require("../../utils/database/requetes/settings_guild");
const { updateChannelNameWithCount } = require("../../utils/event");
const { GuildMember } = require('discord.js');

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
    const general_channel = member.guild.channels.cache.get(settings.GENERAL) || await member.guild.channels.fetch(settings.GENERAL).catch(() => null);
    console.log(general_channel, "--", settings.GENERAL_CHANNEL);
    console.log("------------salon general--", general_channel.name)
    if (general_channel  && general_channel.type === 'GUILD_TEXT') await general_channel.send(`Bienvenue ${member.toString()} !\nN'hésite pas à faire comme chez toi et à venir parler dans le général 😉. Tu peux nous parler de toi ou de ce qui t'amène ici par exemple.`);
  }
  if (settings.WELCOME_CHANNEL) {
    const welcome_channel = member.guild.channels.cache.get(settings.WELCOME_CHANNEL) || await member.guild.channels.fetch(settings.WELCOME_CHANNEL).catch(() => null);
    const welcome_card = await new canvafy.WelcomeLeave()
      .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
      .setBackground("image", "https://i.imgur.com/8fOLTXQ.png")
      .setTitle("Bienvenue")
      .setDescription("Devos Code, serveur communautaire de programmation !")
      .setBorder(client.config.colors.main.toHex())
      .setAvatarBorder(client.config.colors.main.toHex())
      .setOverlayOpacity(0.3)
      .build();

    welcome_channel.send({
      files: [
        { attachment: welcome_card.toBuffer(), name: `welcome-${member.id}.png` }
      ]
    });
  }

  // edit stats channels
  const all_members = member.guild.memberCount;
  const members = member.guild.members.cache.filter(m => m.user.bot === false).size;
  if (settings.STATS_ALL_CHANNEL) {
    const all_members_channel = member.guild.channels.cache.get(settings.STATS_ALL_CHANNEL) || await member.guild.channels.fetch(settings.STATS_ALL_CHANNEL).catch(() => null);
    console.log("--join salon stats--", all_members_channel.name)
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



  // const all_members_channel = member.guild.channels.cache.get(client.config.stats.all) || await member.guild.channels.fetch(client.config.stats.all).catch(() => null);
  // const members_channel = member.guild.channels.cache.get(client.config.stats.members) || await member.guild.channels.fetch(client.config.stats.members).catch(() => null);
  // const bots_channel = member.guild.channels.cache.get(client.config.stats.bots) || await member.guild.channels.fetch(client.config.stats.bots).catch(() => null);

  // const settings_all_members_channel_db = await getSetting("STATS_ALL", member.guild.id);
  // const settings_members_channel_db = await getSetting("STATS_MEMBERS", member.guild.id);
  // const settings_bots_channel_db = await getSetting("STATS_BOTS", member.guild.id);

  // let settings_all_members_channel, settings_members_channel, settings_bots_channel;

  // await member.guild.members.fetch();
  // if (settings_all_members_channel_db) settings_all_members_channel = await client.channels.fetch(settings_all_members_channel.value);
  // if (settings_members_channel_db) settings_members_channel = await client.channels.fetch(settings_members_channel.value);
  // if (settings_bots_channel_db) settings_bots_channel = await client.channels.fetch(settings_bots_channel.value);

  // const all_members = member.guild.memberCount;
  // const members = member.guild.members.cache.filter(m => m.user.bot === false).size;
  // const bots = all_members - members;

  // decoupe le nom du salon par apport à : et ajoute la statistique, ex: "general: 140" -> "general: 141" et "general" -> "general: 2"
  // if (settings_all_members_channel) settings_all_members_channel.setName(settings_all_members_channel.split(':')[0].trim() + `: ${all_members}`, "Stats counter.");
  // if (settings_members_channel) settings_members_channel.setName(settings_members_channel.split(':')[0].trim() + `: ${members}`, "Stats counter.");
  // if (settings_bots_channel) settings_bots_channel.setName(settings_bots_channel.split(':')[0].trim() + `: ${bots}`, "Stats counter.");

  // await member.guild.members.fetch();

  // const all_members = member.guild.memberCount;
  // const members = member.guild.members.cache.filter(m => m.user.bot === false).size;
  // const bots = all_members - members;

  // all_members_channel.setName(`🌍 Global: ${all_members}`, "Stats counter.");
  // members_channel.setName(`🧑 Membres: ${members}`, "Stats counter.");
  // bots_channel.setName(`🤖 Bots: ${bots}`, "Stats counter.");

};