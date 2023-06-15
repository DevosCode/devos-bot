const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder,  StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");
const { getItems } = require("../../utils/database/requetes/items");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('store')
    .setDescription('Affiche le magasin pour acheter des produits.'),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`store.${interaction.user.id}`)
      .setPlaceholder('Choisissez un ou plusieurs items');
 
    const items = await getItems(interaction.guild.id); 
    if (items.length ==0) return error(interaction, "Ce serveur ne possede aucun item.");
    for (const item of items) {
      selectMenu.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(item.label)
          .setDescription(`Prix : ${item.prix} crédits, ID : ${item.id}`)
          .setValue(item.id.toString())
      );
    } 

		const row = new ActionRowBuilder()
			.addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setColor(client.config.colors.main)
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setTitle('Magasin')
      .setDescription('Achetez-vous des produits en faisant glisser le select menu.')
      .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

    interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};