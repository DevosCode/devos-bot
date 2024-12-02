const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("./../structure/Client");
const { colorOfMember } = require("./../utils/database/requetes/color");
const { findOrCreateMember } = require('../utils/database/requetes/members');

module.exports = {
  /**
  * @param {Object} options
  * @param {CustomClient} options.client - Le client
  * @param {CommandInteraction} options.interaction - L'interaction de commande
  */
  async run({ client, interaction }) {
    if (interaction.user.id !== interaction.customId.split('.')[1]) return interaction.deferUpdate();
    // reccupere toutes les couleurs
    const userDB = (await findOrCreateMember(interaction.member)).member;
    const color_roles = await colorOfMember(userDB.id);
    // reccupere la couleur selectionner
    const selectedColor = color_roles.find((element) => {
      return element.id == interaction.values[0] && element.guildId == interaction.guild.id;
    });
    if (!selectedColor) return interaction.reply(`${interaction.user.toString()}, Vous ne possedez pas cette couleur.`);
    for (const color_role of color_roles) {
      if (color_role.guildId == interaction.guild.id) {
        try {
          await interaction.member.roles.remove(color_role.roleId);
        } catch {
          // on ignore 
        }
      }
    }

    try {
      await interaction.member.roles.add(selectedColor.roleId);
      await interaction.update({
        content: `Je vous ai correctement mit le rôle \`${selectedColor.label}\`.`,
        components: [],
        embeds : []
      });
    } catch {
      await interaction.update({
        content: `Le rôle \`${selectedColor.label}\` n'est pas disponnible sur ce serveur, contactez le staff.`,
        components: [],
        embeds : []
      });
    }
  }
};