const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { error } = require("../../utils/interaction-utils");
const CustomClient = require("./../../structure/Client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche la liste des commandes ou des informations sur une commande.')
    .addStringOption(option =>
      option.setName('commande')
        .setDescription('Informations sur une commande.')
        .setRequired(false)
    ),
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
  async run({ client, interaction }) {
    const commandName = interaction.options.getString('commande');
    let embed;
    if (!commandName) {
      embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setTitle('Liste des commandes')
        .setDescription('Toutes les commandes ci-dessous s\'effectuent en slash commande (`/`).')
        .addFields(
          { name: `${client.config.emojis.administration} Administration`, value: Object.values(client.commands).filter(c => c.category == 'administration').map(cmd => `\`${cmd.name}\``).join(', ') },
          { name: `${client.config.emojis.economy} Economie`, value: Object.values(client.commands).filter(c => c.category == 'economy').map(cmd => `\`${cmd.name}\``).join(', ') },
          { name: `${client.config.emojis.utility} Utilitaire`, value: Object.values(client.commands).filter(c => c.category == 'utility').map(cmd => `\`${cmd.name}\``).join(', ') }
        )
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

    } else {
      const command = client.commands[commandName.toLowerCase()];

      if (!command) return error(interaction, 'Je ne trouve pas cette commande.');

      embed = new EmbedBuilder()
        .setColor(client.config.colors.main)
        .setTitle(`Commande ${command.name}`)
        .setDescription(command.data.description)
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });


      if (command.data.options) {
        embed.addFields({ name: 'Options', value: command.data.options.map(o => `\`${o.name}\`: ${o.description}`).join('\n') });
      }

      if (command.permissions) {
        embed.addFields({ name: 'Permissions', value: command.permissions.map(p => `\`${p}\``).join('\n') });
      }

    }
    interaction.reply({ embeds: [embed] });
  }
};