const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Affiche différents classements.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('level')
        .setDescription('Affiche le classement des niveaux.')
    ),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const leadeboard_type = interaction.options.getSubcommand();

    if (leadeboard_type == 'level') {
      const usersDB = await client.db.Members.findAll({
        order: [['experience', 'DESC']],
        limit: 10
      });

      const embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle('Level Leaderboard')
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

      await usersDB.map(async userDB => {
        const member = await interaction.guild.members.fetch(userDB.id);
        embed.addFields({ name: `${member.user.username}#${member.user.discriminator}`, value: `Niveau : ${userDB.level}, Experience : ${userDB.experience}` });
      });

      interaction.reply({ embeds: [embed] });
    }
  }
};