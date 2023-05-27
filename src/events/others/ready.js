require('dotenv/config');
module.exports = async (client) => {
  let guildId = client.config.devoscode_test_id;
  if (process.env.RUN == "PROD") {
    guildId = client.config.devoscode_id;
  }
  const guild = client.guilds.cache.get(guildId);

  const command = await guild.commands.set(client.slashs);

  client.user.setPresence({ status: client.config.presence.type, activities: [{ name: client.config.presence.status }] });

  client.log.info(`[${client.user.username}]: I'm ready.`);
};