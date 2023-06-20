const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");
const {findOrCreateMember} = require("./../../utils/database/requetes/members");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('credits')
    .setDescription('Affiche le nombre de crédits que vous avez ou celui d\'un autre utilisateur.')
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
    let member = interaction.options.getMember('membre') || interaction.member;
    if (!member) member = interaction.member;
    // if (!member) return error(interaction, 'Je ne trouve pas ce membre sur le serveur.');
    if (member.user.bot) return error(interaction, 'Les bots n\'ont pas de credits.');
    const userDB = (await findOrCreateMember(member)).member;
    // n'est jamais censer arriver
    if (!userDB) {
      if (member.id == interaction.member.id) return error(interaction, 'Votre profil n\'est pas enregistré. Faites la commande `/create-profile` ou envoyez un message pour enregistrer un profil.');
      else return error(interaction, `${member.toString()} n'a pas encore de profil.`);
    }
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.colors.main)
          .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
          .setTitle('Credits')
          .setDescription(member.id === interaction.member.id ? `Vous avez ${userDB.credits} credit${userDB.credits > 1 ? 's' : ''}.` : `${member.toString()} a ${userDB.credits} credit${userDB.credits > 1 ? 's' : ''}.`)
          .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer })
      ]
    });
  }
};