const { SlashCommandBuilder , PermissionFlagsBits} = require('discord.js');
const {addGuildSetting} = require("../../utils/database/requetes/settings_guild");
const { error, success } = require("../../utils/interaction-utils");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-ticket-roles')
    .setDescription("Ajouter un role à mentionner à mentionner lors de la création d'un ticket") 
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('Le rôle à mentionner.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({interaction}) {
    const role = interaction.options.getRole('role'); 
    
    await addGuildSetting("TICKET_ROLES", role.id, interaction.guild.id);

    success(interaction, `Le role ${role.name} sera maintenant mentionner à chaque création de ticket.`);
  },
};
