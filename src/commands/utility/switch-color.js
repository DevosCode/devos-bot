const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder,  StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const CustomClient = require("./../../structure/Client");
const { error, success } = require("./../../utils/interaction-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('switch-color')
    .setDescription("Changer la couleur de votre pseudo."),
    
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({client, interaction}) {
    const colorRoles = await client.db.ColorsInventories.findAll({ where: { MemberId: interaction.user.id } });

    console.log(colorRoles);
    return 
    if (!colorRoles.length) return interaction.reply(`${interaction.user.toString()}, Vous n'avez acheté aucun rôle de couleur.`);

    const options = [];
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`switch-color-roles.${interaction.user.id}`)
      .setPlaceholder("Choisissez une couleur");
      // .setOptions(options)


    for (const colorRole of colorRoles) {
    //   options.push({
    //     label: colorRole.label,
    //     value: colorRole.role_id,
    //     description: `Couleur ID : ${colorRole.id}`,
    //   });
      selectMenu.addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel(colorRole.label)
            .setDescription(`Couleur ID : ${colorRole.id}`)
            .setValue(colorRole.role_id)
      )
    }

    const embed = new EmbedBuilder()
      .setColor(client.config.colors.main)
      .setDescription("Choisissez la nouvelle couleur à mettre parmi vos couleurs achetées.");
    //   .setTitle('Magasin')
    //   .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });


    const row = new ActionRowBuilder()
      .addComponents(selectMenu);

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
