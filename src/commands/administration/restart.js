const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils"); 
const { updateAndRestartBot } = require("./../../utils/server")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Met à jour la branche du bot et le relance.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  /**
 * @param {Object} options
 * @param {CustomClient} options.client - Le client
 * @param {CommandInteraction} options.interaction - L'interaction de commande
 */
  async run({ client, interaction }) {

    let channelReady =  interaction.guild.channels.cache.get(client.config.channel_message_ready) || await interaction.guild.channels.fetch(client.config.channel_message_ready).catch(() => null);
    if (!!channelReady==false) {
      return await error(interaction, "Le salon `channel_message_ready` n'a pas été configurer, verifier config.js");
    }
    await success(interaction, `Au >> toi.`);
    updateAndRestartBot(channelReady);
  }
};