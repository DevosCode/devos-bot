const { findOrCreateMember } = require("./../../utils/database/requetes/members");
const { getGuildSettingsByGuildId } = require("../../utils/database/requetes/settings_guild");
const { updateChannelNameWithCount } = require("../../utils/event");
const { GuildMember } = require('discord.js');


module.exports = async (client, member) => {
  
  const settings = await getGuildSettingsByGuildId(member.guild.id);

  const all_members = member.guild.memberCount;
  const members = member.guild.members.cache.filter(m => m.user.bot === false).size;
  if (settings.STATS_ALL_CHANNEL) {
    const all_members_channel = member.guild.channels.cache.get(settings.STATS_ALL_CHANNEL) || await member.guild.channels.fetch(settings.STATS_ALL_CHANNEL).catch(() => null);
    console.log("--leave salon stats--", all_members_channel.name)
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


  // if (!member.user.bot)  await client.pool.query(`DELETE FROM users WHERE id = ${member.id}`);

  // const all_members_channel = member.guild.channels.cache.get(client.config.stats.all) || await member.guild.channels.fetch(client.config.stats.all).catch(() => null);
  // const members_channel = member.guild.channels.cache.get(client.config.stats.members) || await member.guild.channels.fetch(client.config.stats.members).catch(() => null);
  // const bots_channel = member.guild.channels.cache.get(client.config.stats.bots) || await member.guild.channels.fetch(client.config.stats.bots).catch(() => null);
  // const settings_all_members_channel_db = await getSettings("STATS_ALL", member.guild.id);
  // const settings_members_channel_db = await getSettings("STATS_MEMBERS", member.guild.id);
  // const settings_bots_channel_db = await getSettings("STATS_BOTS", member.guild.id);

  // let settings_all_members_channel, settings_members_channel, settings_bots_channel;

  // await member.guild.members.fetch();
  // if (settings_all_members_channel_db) settings_all_members_channel = await client.channels.fetch(settings_all_members_channel.value);
  // if (settings_members_channel_db) settings_members_channel = await client.channels.fetch(settings_members_channel.value);
  // if (settings_bots_channel_db) settings_bots_channel = await client.channels.fetch(settings_bots_channel.value);

  // const all_members = member.guild.memberCount;
  // const members = member.guild.members.cache.filter(m => m.user.bot === false).size;
  // const bots = all_members - members;
  
  // // decoupe le nom du salon par apport à : et ajoute la statistique, ex: "general: 140" -> "general: 141" et "general" -> "general: 2"
  // if (settings_all_members_channel) settings_all_members_channel.setName(settings_all_members_channel.split(':')[0].trim() + `: ${all_members}`, "Stats counter.");
  // if (settings_members_channel) settings_members_channel.setName(settings_members_channel.split(':')[0].trim() +`: ${members}`, "Stats counter.");
  // if (settings_bots_channel) settings_bots_channel.setName(settings_bots_channel.split(':')[0].trim()+`: ${bots}`, "Stats counter.");
};