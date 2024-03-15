const { SlashCommandBuilder , PermissionFlagsBits} = require('discord.js');
const {findOrCreateMember} = require("../../utils/database/requetes/members");
const { error, success } = require("../../utils/interaction-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-credits')
    .setDescription("Affecte à un membre un nombre de crédits définit.")
    .addUserOption(option =>
      option
        .setName('membre')
        .setDescription('Choisissez un membre.')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('credits')
        .setDescription('Nombre de crédits.')
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
    const member = interaction.options.getMember('membre');
    const credits = interaction.options.getInteger('credits');

    if (!member) return error(interaction, "Je ne trouve pas ce membre sur le serveur.");
    if (member.bot) return error(interaction, "Vous ne pouvez pas donner des crédits à un bot.");
    if (credits < 0) return error(interaction, "Vous ne pouvez pas affecter des crédits négatifs à un membre.");

    let res = await findOrCreateMember(member);
    res.member.credits = credits;
    res.member.save();

    success(interaction, `J'ai affecté \`${credits}\` crédits à ${member.toString()}.`);
  },
};
