const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("../../structure/Client");
const { error, success } = require("../../utils/interaction-utils");
const { findOrCreateMember } = require("../../utils/database/requetes/members");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-level-rank')
    .setDescription('Créer les roles des level.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  /**
 * @param {Object} options
 * @param {CustomClient} options.client - Le client
 * @param {CommandInteraction} options.interaction - L'interaction de commande
 */
  async run({ client, interaction }) {
    for (let i = 0; i <= 50; i +=10){
        const roleName = `Level ${i} +`;
        const roleColor = "#FFA733"
        const role = await interaction.guild.roles.create({
            name: roleName,
            color: roleColor,
            permissions: []
        });
        role.setHoist(true)
    }
    await success(interaction, `J'ai créer tous les roles pour les levels !`, {replied: true});
  }
};