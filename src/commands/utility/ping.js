const { SlashCommandBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Affiche le ping du bot.'),
  /**
  * @param {Object} options
  * @param {CustomClient} options.client - Le client Discord
  * @param {CommandInteraction} options.interaction - L'interaction de commande
  */
  async run({ client, interaction }) {
    interaction.reply(`Pong ! Gateway: \`${client.ws.ping}ms\`.`);
  }
};