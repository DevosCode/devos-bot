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