const { PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { getGuildSettingsByGuildId, getSettingGroup } = require("./../utils/database/requetes/settings_guild");
const { error, success } = require("./../utils/interaction-utils");

module.exports = {
  async run({ client, interaction }) {
    const { guild, user } = interaction;
    const settings = await getGuildSettingsByGuildId(guild.id);
    let ticket_category, category_channels_size;

    if (settings && settings.TICKET_CATEGORY) ticket_category = guild.channels.cache.get(settings.TICKET_CATEGORY) || await guild.channels.fetch(settings.TICKET_CATEGORY).catch(() => null);
    if (!ticket_category) return error(interaction, "TICKET_CATEGORY n'a pas été configuré, veuillez prévenir le staff.");

    category_channels_size = guild.channels.cache.filter(c => c.name.startsWith(`ticket-${user.username}`)).size; 
    if (category_channels_size>2) {
      return error(interaction, `Il y a trop de ticket portant le nom '${user.username}', si le problème persiste contacter le staff.`, {ephemeral:true});
    }
    const ticket = await interaction.guild.channels.create({
      name: `ticket-${user.username}-${category_channels_size + 1}`, 
      type: ChannelType.GuildText,
      parent: ticket_category.id,
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
    let mentions = "";
    for (const staff_role_id of await getSettingGroup(interaction.guild.id, "TICKET_ROLES")) {
      const staff_role = guild.roles.cache.find(r => r.id == staff_role_id); 
      if (staff_role) mentions+= `${staff_role.toString()}`
      if (staff_role) await ticket.permissionOverwrites.edit(staff_role.id, { ViewChannel: true, SendMessages: true });
    }

    const embed = new EmbedBuilder()
      .setColor(client.config.colors.main)
      .setTitle('Ticket')
      .setDescription(`Le staff vous contactera sous peu.\nPour fermer ce ticket, réagissez avec 🔒`) 
      .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });
 
    const ticket_message = await ticket.send({
      content: `${user.toString()}, Voici votre ticket.${mentions}`,
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("close-ticket")
            .setLabel("Fermer le ticket")
            .setEmoji("🔒")
            .setStyle(2)
        ),
      ]
    });

    ticket_message.pin();

    interaction.reply({ content: `Ticket crée ${ticket}`, ephemeral: true });
  }
};