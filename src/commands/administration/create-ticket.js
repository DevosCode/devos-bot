const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder,  ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { getGuildSettingsByGuildId } = require("../../utils/database/requetes/settings_guild");
const { error, success } = require("../../utils/interaction-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-ticket")
    .setDescription("Crée le panel de ticket.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  /**
 * @param {Object} options
 * @param {CustomClient} options.client - Le client
 * @param {CommandInteraction} options.interaction - L'interaction de commande
 */
  async run({ client, interaction }) {
    let settings = await getGuildSettingsByGuildId(interaction.guild.id);
    let ticketChannel;
    if (settings && settings.TICKET_CHANNEL) ticketChannel = interaction.guild.channels.cache.get(settings.TICKET_CHANNEL) || await interaction.guild.channels.fetch(settings.TICKET_CHANNEL).catch(() => null);
    if (!ticketChannel) return error(interaction, "Vous n'avez pas configurez TICKET_CHANNEL."); 
    success(interaction, "Panel de ticket créé avec succès.", { ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor(client.config.colors.main)
      .setTitle('Ticket.')
      .setDescription("Pour créer un ticket, réagissez avec :envelope_with_arrow:") 
      .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.config.footer });

    ticketChannel.send({
      embeds: [
        embed
      ],

      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("create-ticket")
            .setLabel("Créer un ticket")
            .setEmoji("📩")
            .setStyle("Primary")
        ),
      ],
    });
  },
};
