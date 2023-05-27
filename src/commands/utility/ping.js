const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Affiche le ping du bot.'),
  async run({ client, interaction }) {
    interaction.reply(`Pong ! Gateway: \`${client.ws.ping}ms\`.`);
  }
};