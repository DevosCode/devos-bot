const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  async run({ client, interaction }) {
    const { guild, user } = interaction;
    const ticket_category = guild.channels.cache.get(client.config.ticket_category_id) || await guild.channels.fetch(client.config.ticket_category_id).catch(() => null);
    const category_channels_size = guild.channels.cache.filter(c => c.name.startsWith(`ticket-${user.discriminator}`)).size;

    const ticket = await ticket_category.createChannel(`ticket-${user.discriminator}-${category_channels_size + 1}`, {
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: user.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
        }
      ]
    });

    for (const staff_role_id of client.config.staff_roles_id) {
      const staff_role = guild.roles.cache.find(r => r.id === staff_role_id);

      if (staff_role) ticket.permissionOverwrites.edit(staff_role, { ViewChannel: true, SendMessages: true });
    }

    const ticket_message = await ticket.send({
      content: `${user.toString()}, Voici votre ticket.`,
      embeds: [
        {
          color: client.config.colors.main,
          description: "Le staff vous contactera sous peu.\nPour fermer ce ticket, réagissez avec 🔒",
          footer: {
            icon_url: client.user.displayAvatarURL(),
            text: client.config.footer
          }
        }
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "Fermer le ticket",
              emoji: "🔒",
              style: 2,
              custom_id: `close-ticket`
            }
          ]
        }
      ]
    });

    ticket_message.pin();

    interaction.reply({ content: `Ticket crée ${ticket}`, ephemeral: true });
  }
};