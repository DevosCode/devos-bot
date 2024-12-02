const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");
const { findOrCreateMember } = require("./../../utils/database/requetes/members");
const { getGuildSettingsByGuildId, getSettingGroup } = require("../../utils/database/requetes/settings_guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give-default-roles')
    .setDescription('Donne tout les rôles par défaut à tout les membres qui ne les ont pas.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  /**
 * @param {Object} options
 * @param {CustomClient} options.client - Le client
 * @param {CommandInteraction} options.interaction - L'interaction de commande
 */
  async run({ client, interaction }) {
    const member = interaction.member;
    if (!member) return error(interaction, 'Je ne trouve pas ce membre sur le serveur.');

    await findOrCreateMember(member);
    const settings = await getGuildSettingsByGuildId(member.guild.id);
    // les roles que recoivent les membres à leur arriver
    const welcome_roles = await getSettingGroup(member.guild.id, "WELCOME_ROLES");
    const members = await interaction.guild.members.fetch();
    if (welcome_roles.length > 0) {
      interaction.deferReply();
      // for (const member of members)
      // { 
      //   if (!member[1].user.bot){
      //     try { 
      //      // si le membre les a deja ca ne fait rien
      //      await member[1].roles.add(welcome_roles, 'Ajout des autoroles.');
      //     } catch (error) {
      //      client.log.error(`Je n'ai pas pus attribuer à ${member[1].user.username} le role ${roleId}`) 
      //     }
      //   }
      // }

      try {
        await Promise.all(members.map(async (member) => {
          if (!member.user.bot) {
            try {
              // si le membre les a deja ca ne fait rien
              await member.roles.add(welcome_roles, 'Ajout des autoroles.');
            } catch (error) {
              client.log.error(`Je n'ai pas pus attribuer à ${member.user.username} le role ${roleId}`)
            }
          }
        }))
      } catch (error) {
        client.log.error(`Les requêtes d'ajouts de rôles ont échouées`)
      }
    } else {
      return error(interaction, `Il n'y a pas de WELCOME_ROLES en base de donnée.`);
    }
    await success(interaction, `J'ai mis à jour les rôles des membres.`, { editReply: true });
  }
};