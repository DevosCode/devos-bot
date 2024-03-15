const {error}  = require("./../../utils/interaction-utils");
const { CommandInteraction } = require('discord.js');
const CustomClient = require("./../../structure/Client");

/**
 * @param {Object} options
 * @param {CustomClient} options.client - Le client 
 * @param {CommandInteraction} options.interaction - L'interaction de commande
 */
module.exports = (client, interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands[interaction.commandName];
    if (!command) return error(interaction, 'Cette commande n\'existe pas ou n\'existe plus.');
    if (command.permissions) {
      const roles = [];
      command.permissions.forEach(permission => roles.push(permission.id));
      if (!interaction.member.roles.cache.has(roles)) return error(interaction, 'Vous n\'avez pas la permission de faire cette commande.', { ephemeral: true });
    }
    command.run({ client, interaction });
    client.log.info(`${interaction.user.tag} à fait la commande ${interaction.commandName}`);
  }

  if (interaction.isSelectMenu()) {
    const selectmenu = client.selectmenus[interaction.customId.split('.')[0]];
    if (!selectmenu) error(interaction, 'Ce select menu n\'existe pas ou n\'existe plus.')
    selectmenu.run({ client, interaction });
  }

  if (interaction.isButton()) {
    const button = client.buttons[interaction.customId.split(".")[0]];
    if (!button) return interaction.error("Ce button n'existe pas ou n'existe plus.");
    button.run({ client, interaction });
  }
};