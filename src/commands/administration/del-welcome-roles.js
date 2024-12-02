const { SlashCommandBuilder , PermissionFlagsBits} = require('discord.js');
const {deleteGuildSettingByKeyValueGuildId} = require("../../utils/database/requetes/settings_guild");
const { error, success } = require("../../utils/interaction-utils");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('del-welcome-roles')
    .setDescription("Supprime un rôle parmis les rôles de bienvenu pour les nouveaux membres") 
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('Le rôle à supprimer.')
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
    
    if (!(await deleteGuildSettingByKeyValueGuildId("WELCOME_ROLES", role.id, interaction.guild.id))) return error(interaction, "Le rôle n'a pas pus être supprimé.");

    success(interaction, `Le rôle à été supprimé avec succès.`);
  },
};
