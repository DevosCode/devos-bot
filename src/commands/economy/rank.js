const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Affiche ton niveau ou celui d\'un utilisateur.')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Choisissez un membre.')
        .setRequired(false)
    ),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const member = await interaction.options.getMember('membre') || interaction.member;

    if (!member) return error(interaction, 'Je ne trouve pas ce membre sur le serveur.');
    if (member.user.bot) return error(interaction, 'Les bots n\'ont pas de crédits.');

    const userDB = await client.db.Members.findOne({
      where: {
        member_id: member.id
      }
    });

    if (!userDB) {
      if (member.id === interaction.member.id) return error(interaction, 'Vous n\'avez pas de niveau.');
      else return error(interaction, `${member.toString()} n'a pas de niveau.`);
    }

    const xpObjectif = userDB.level ** 2 * 100;
    const pourcentage = (userDB.experience * 100) / xpObjectif;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.colors.main)
          .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
          .setTitle('Rank')
          // .setDescription(`Niveau : ${userDB.level}\nExperience : ${xpObjectif - (xpObjectif - userDB.experience)} / ${xpObjectif}\n\n${client.config.emojis.xpbar_left}${client.config.emojis.xpbar_full.repeat(Math.floor(pourcentage / 7))}${client.config.emojis.xpbar_empty.repeat(Math.floor((100 - pourcentage) / 7))}${client.config.emojis.xpbar_right}`)
          .setDescription(`Niveau : ${userDB.level}\nExperience : ${xpObjectif - (xpObjectif - userDB.experience)} / ${xpObjectif}`)
          .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer })
      ]
    });
  }
};
