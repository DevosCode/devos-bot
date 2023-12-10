const dotenv = require("dotenv");
dotenv.config();

module.exports = async (client) => {
  let guildId, guild;

  if (process.env.RUN == "PROD") {
    guildId = client.config.devoscode_id;
    guild = client.guilds.cache.get(guildId);
  } else {
    // DEV
    guildId = client.config.devoscode_test_id;
    guild = client.guilds.cache.get(guildId);
  }

  // client.application?.commands.set(client.slashs); 
  // await removeGlobalCommand(client); 
  const command = await guild.commands.set(client.slashs);

  // client.user.setPresence({ status: client.config.presence.type, activities: [{ name: client.config.presence.status }] });
  client.user.setPresence({ status:  client.config.presence.type, activities: [ {name: `Il y a ${guild.memberCount} devos-membre`}] });
  client.log.info(`[${client.user.username}]: I'm ready.`);
};

/**
 * Retire les slashcommands globaux du bots
 * @param {*} client 
 */
const removeGlobalCommand = async (client) => {
  const globalCommands = await client.application?.commands.fetch();
  if (globalCommands) {
    for (const command of globalCommands.values()) {
      await client.application?.commands.delete(command);
      client.log.warn(`Commande Slash globale supprimée : ${command.name}`);
    }
  }
}