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
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('credit')
        .setDescription('Affiche le classement des credits.')
    ),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const leadeboard_type = interaction.options.getSubcommand();
    let usersDB, embed;
    let count = 0;
    if (leadeboard_type == 'level') {
      usersDB = await client.db.Members.findAll({
        where: {
          guildId: interaction.member.guild.id,
        },
        order: [['experience', 'DESC']],
        limit: 15
      });

      embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle('Level Leaderboard')
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

      await usersDB.map(async userDB => {
        try {
          if (count < 10) {
            const member = await interaction.guild.members.fetch(userDB.member_id);
            embed.addFields({ name: `${member.user.username}`, value: `Niveau : ${userDB.level}, Experience : ${userDB.experience}` });
            count += 1;
          }
        } catch (error) {
          client.log.warn(`${userDB.member_id} n'a pas été trouvé.`)
        }
      });

    }

    if (leadeboard_type == 'credit') {
      usersDB = await client.db.Members.findAll({
        where: {
          guildId: interaction.member.guild.id,
        },
        order: [['credits', 'DESC']],
        limit: 15
      });

      embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle('Crédits Leaderboard')
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });
      await usersDB.map(async userDB => {
        try {
          if (count < 10) {
            const member = await interaction.guild.members.fetch(userDB.member_id);
            embed.addFields({ name: `${member.user.username}`, value: `Crédits : ${userDB.credits}` });
            count += 1;
          }
        } catch (error) {
          client.log.warn(`${userDB.member_id} n'a pas été trouvé.`)
        }
      });

    }
    interaction.reply({ embeds: [embed] });
  }
};