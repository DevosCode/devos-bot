module.exports = {
  description: 'Affiche la liste des commande ou des informations sur une commande.',
  type: 'CHAT_INPUT',
  options: [
    { name: 'commande', description: 'Informations sur une commande.', type: 'STRING' }
  ],
  async run({ client, interaction }) {
    const commandName = interaction.options.getString('commande');

    if (!commandName) {
      interaction.reply({
        embeds: [{
          color: client.config.colors.main,
          title: 'Liste des commandes',
          description: 'Toutes les commandes ci-dessous s\'effectuent en slash commande (`/`).',
          fields: [
            { name: `${client.config.emojis.administration} Administration`, value: Object.values(client.commands).filter(c => c.category == 'administration').map(cmd => `\`${cmd.name}\``).join(', ') },
            { name: `${client.config.emojis.economy} Economie`, value: Object.values(client.commands).filter(c => c.category == 'economy').map(cmd => `\`${cmd.name}\``).join(', ') },
            { name: `${client.config.emojis.utility} Utilitaire`, value: Object.values(client.commands).filter(c => c.category == 'utility').map(cmd => `\`${cmd.name}\``).join(', ') }
          ],
          footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
        }]
      });
    } else {
      const command = client.commands[commandName.toLowerCase()];

      if (!command) return interaction.error('Je ne trouve pas cette commande.');

      const embed = {
        color: client.config.colors.main,
        title: `Commande ${command.name}`,
        description: command.description,
        fields: [],
        footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
      };

      if (command.options) {
        embed.fields.push({ name: 'Options', value: command.options.map(o => `\`${o.name}\`: ${o.description}`).join('\n') });
      }

      if (command.permissions) {
        embed.fields.push({ name: 'Permissions', value: command.permissions.map(p => `\`${p}\``).join('\n') });
      }

      interaction.reply({ embeds: [embed] });
    }
  }
};