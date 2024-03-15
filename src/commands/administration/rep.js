const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");
const { findOrCreateMember } = require("./../../utils/database/requetes/members");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rep')
    .setDescription('Donne 1 crédit à une personne ayant aidé.')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Choisissez un membre.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  /**
 * @param {Object} options
 * @param {CustomClient} options.client - Le client
 * @param {CommandInteraction} options.interaction - L'interaction de commande
 */
  async run({ client, interaction }) {
    const member = interaction.options.getMember('membre');

    if (!member) return error(interaction, 'Je ne trouve pas ce membre sur le serveur.');
    if (member.user.bot) return error(interaction, 'Vous ne pouvez pas donner des crédits à un bot.');
    if (member.id == interaction.member.id) return error(interaction, 'Vous ne pouvez pas vous auto rep.');

    const userDB = (await findOrCreateMember(member)).member;

    const credits = member.roles.cache.has(client.config.booster_role) ? 2 : 1;
    userDB.credits += credits;
    await userDB.save();

    await success(interaction, `J'ai donné \`${credits}\` credit${userDB.credits > 1 ? 's' : ''} à ${member.toString()}. Merci à lui pour sa participation.`);
  }
};