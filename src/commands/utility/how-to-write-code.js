const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('how-to-write-code')
    .setDescription('Comment bien écrire son code.')
    .addUserOption(option =>
      option
        .setName('pour')
        .setDescription('Membre qui ne sait pas écrire son code.')
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
      .setAuthor({ name: member.user.tag, iconURl: member.user.displayAvatarURL() })
      .setTitle('Voici comment bien écrire son code.')
      .setDescription(`${member.toString()}\nVeuillez insérer les caractères suivants dans votre barre de chat.\nL'argument \`[language]\` doit être remplacé par le diminutif du langage en question.\n\\\`\\\`\\\`[language]\ncode\n\\\`\\\`\\\`\nCe qui donne par exemple :\n\`\`\`js\ncode\`\`\``)
      .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

    interaction.reply({ embeds: [embed] });
  }
};