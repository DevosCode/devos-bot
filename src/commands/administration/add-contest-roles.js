const { SlashCommandBuilder , PermissionFlagsBits} = require('discord.js');
const {addGuildSetting} = require("../../utils/database/requetes/settings_guild");
const { error, success } = require("../../utils/interaction-utils");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-contest-roles')
    .setDescription("Ajouter un role qui peut créer un contest") 
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('Le rôle à ajouter.')
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
    
    await addGuildSetting("CONTEST_MANAGER_ROLES", role.id, interaction.guild.id);

    success(interaction, `Le role ${role.name} pourra maintenant créer des contests.`);
  },
};
