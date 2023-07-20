const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CustomClient = require("../../structure/Client");
const { getSetting, editGuildSetting } = require("../../utils/database/requetes/settings_guild");
const { error, success } = require("./../../utils/interaction-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('contest')
    .setDescription('Affiche les commandes pour les contests.')
    .setDescription('Soumettre votre travail pour le contest.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('submit')
        .setDescription('Soumettre votre travail pour le contest.')
        .addAttachmentOption(option =>
          option
            .setName('ZipFile')
            .setDescription('Un fichier zip contenant l\'ensemble de votre composition.')
            .setRequired(false)
        )
        .addAttachmentOption(option =>
          option
            .setName('Link')
            .setDescription('Un lien vers un dépôt en ligne permettant de télécharger votre rendu.')
            .setRequired(false)
        ),
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('new')
        .setDescription('Déclarer le début d\'un nouveau contest.')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Le nom du contest.')
            .setRequired(true)
        ),
    ),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const contest_type = interaction.options.getSubcommand();
    if (contest_type == "new") {
      const name = interaction.options.getString('name');
      await editGuildSetting("CONTEST_NAME", name, interaction.member.guild.id);
      return success(interaction, `J'annonce le début du contest "${name}"!`);
    } else if (contest_type == "submit") {
      const zipFile = interaction.options.getAttachment('ZipFile');
      const githubLink = interaction.options.getString('Link');
      if (!zipFile && !githubLink) {
        return error(interaction, 'Vous devez renseigner une des 2 méthodes de rendu.');
      }
      const contestChannel = await getSetting("CONTEST_CHANNEL", interaction.guild.id)
      const contestName = await getSetting("CONTEST_NAME", interaction.guild.id)
      if (!contestChannel) {
        return error(interaction, 'Le parametre CONTEST_CHANNEL n\'a pas été configuré.');
      }
      if (!contestName) {
        return error(interaction, 'Le parametre CONTEST_NAME n\'a pas été configuré.');
      }
      const contest_channel = interaction.guild.channels.cache.get(contestChannel.dataValues.value) || await interaction.guild.channels.fetch(contestChannel.dataValues.value).catch(() => null);
      let thread = await contest_channel.threads.cache.find(x => x.name == interaction.member.user.username + ` - ` + contestName.dataValues.value);

      embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle(`${contestName.dataValues.value}`)
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

      if (!thread) {
        thread = await contest_channel.threads.create({
          name: interaction.member.user.username + ` - ` + contestName.dataValues.value,
          autoArchiveDuration: 4320, // 3 jours
          reason: `Soumission d\'un contest par ${interaction.member.user.username}`,
          message: `Voici la proposition de ${interaction.member.toString()} pour le contest: ${contestName.dataValues.value}.`,
        });
        if (zipFile) {
          await thread.send({
            files: [{
              attachment: zipFile.attachment,
              name: `Contest de ${interaction.member.user.username} - ${zipFile.name}`
            }]
          })
        }
        if (githubLink) {
          thread.send({
            content: githubLink
          });
        }
      } else {
        if (zipFile) {
          await thread.send({
            content: "Une nouvelle soumission de @everyone.",
            files: [{
              attachment: zipFile.attachment,
              name: `Contest de ${interaction.member.user.username} - ${zipFile.name}`
            }]
          })
        }
        if (githubLink) {
          thread.send({
            content: githubLink
          });
        }
      }
      return success(interaction, "Votre proposition a bien été pris en compte!");
    } else {
      return error(interaction, 'Je ne connais pas cette sub commande.');
    }
    return error(interaction, 'Contacter le staff.');
  }
};