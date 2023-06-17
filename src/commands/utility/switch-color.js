const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { colorOfMember} = require("./../../utils/database/requetes/color");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('switch-color')
    .setDescription("Changer la couleur de votre pseudo."),

  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const colorList = await colorOfMember(interaction.member.id);
    
    if (!colorList.length) return interaction.reply(`${interaction.user.toString()}, Vous n'avez acheté aucun rôle de couleur.`);

    const options = [];
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`switch-color-roles.${interaction.user.id}`)
      .setPlaceholder("Choisissez une couleur");

    for (const colorRole of colorList) { 
      selectMenu.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(`${colorRole.label}`)
          .setDescription(`Aperçu : ${colorRole.value}`)
          .setValue(colorRole.id.toString())
      )
    }

    const embed = new EmbedBuilder()
      .setColor(client.config.colors.main)
      .setDescription("Choisissez la nouvelle couleur à mettre parmi vos couleurs achetées.");

    const row = new ActionRowBuilder()
      .addComponents(selectMenu);

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
