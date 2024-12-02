const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { error, success } = require("./../../utils/interaction-utils");
const {findOrCreateMember} = require("./../../utils/database/requetes/members");
const CustomClient = require("./../../structure/Client")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-profile')
    .setDescription('Crée votre profil si vous n\'en avez pas.'),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client Discord
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
    async run({ client, interaction }) {
    if (!!!(await findOrCreateMember(interaction.member)).create) return error(interaction, 'Vous avez déjà un profil. Faites la commande `/credits` pour voir votre nombre de credit.');
    success(interaction, 'Votre profile a bien été crée. Faites la commande `/credits` pour voir votre nombre de credit.');
  }
};