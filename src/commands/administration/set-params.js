const { SlashCommandBuilder , PermissionFlagsBits} = require('discord.js');
const {editGuildSetting} = require("../../utils/database/requetes/settings_guild");
const { error, success } = require("../../utils/interaction-utils");
const {channelKeys, categories} = require("./../../utils/data");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-params')
    .setDescription("Parametrer le serveur")
    .addStringOption(option =>
      option
        .setName('key')
        .setDescription('La clé à parametrer.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('value')
        .setDescription('La valeur de la clé.')
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
    const key = interaction.options.getString('key');
    const value = interaction.options.getString('value'); 
    if (!channelKeys.includes(key.toUpperCase()) && !categories.includes(key.toUpperCase())) return error(interaction, "Cette clé n'existe pas ou ne peux pas être parametrer depuis cette commande.");
    
    await editGuildSetting(key.toUpperCase(), value, interaction.member.guild.id);

    success(interaction, `Maintenant la valeur de "${key.toUpperCase()}" sera "${value}".`);
  },
};
