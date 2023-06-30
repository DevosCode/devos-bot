const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('how-to-ask-question')
    .setDescription('Comment bien poser une question.')
    .addUserOption(option =>
      option.setName('pour')
        .setDescription('Membre qui ne sait pas poser son problème.')
        .setRequired(true)
    ),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const member = interaction.options.getMember('pour');

    const embed = new EmbedBuilder()
      .setColor(client.config.colors.main)
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
      .setTitle('Voici comment bien poser son problème.')
      .setDescription(`${member.toString()}\n1) Montrez l'erreur si vous en avez une. \n2) Expliquez le contexte de votre problème.\n3) Expliquez ce qu'il devrait se passer dans le cas normal.\n4) Montrez votre code.\n\nGoogle est un outil très puissant, n'hésitez pas à l'utiliser.`)
      .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

    interaction.reply({ embeds: [embed] });
  }
};