const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");
const { colorOfGuild } = require("../../utils/database/requetes/color");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('store')
    .setDescription('Affiche le magasin pour acheter des produits.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('couleurs')
        .setDescription('Affiche les couleurs achetables.')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('items')
        .setDescription('Affiche les items.')
    ),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {

    const store_type = interaction.options.getSubcommand();

    if (store_type == 'couleurs') {
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(`store-colors.${interaction.user.id}`)
        .setPlaceholder('Choisissez une ou plusieurs couleurs');

      const items = await colorOfGuild(interaction.guild.id); 
      if (items.length == 0) return error(interaction, "Ce serveur ne possede aucune couleur.");
      for (const item of items) {
        selectMenu.addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel(item.label)
            .setDescription(`Prix : ${item.prix} crédits, Aperçu : ${item.value}, ID : ${item.id}`)
            .setValue(item.id.toString())
        );
      }

      const row = new ActionRowBuilder()
        .addComponents(selectMenu);

      const embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        .setTitle('Magasin')
        .setDescription('Achetez-vous des couleurs en faisant glisser le select menu.')
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

      interaction.reply({
        embeds: [embed],
        components: [row]
      });
    } else {
      // const items = await getItems(interaction.guild.id);
      const embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        .setTitle('Magasin')
        .setDescription('Ce magasin est en construction, revenez plus tard.')
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

      interaction.reply({
        embeds: [embed]
      });
    }
  }
};