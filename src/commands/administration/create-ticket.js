const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-ticket")
    .setDescription("Crée le panel de ticket.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const ticketChannel = interaction.guild.channels.cache.get("YOUR_TICKET_CHANNEL_ID") || await interaction.guild.channels.fetch("YOUR_TICKET_CHANNEL_ID").catch(() => null);

    await interaction.reply({ content: "Panel de ticket créé avec succès.", ephemeral: true });

    ticketChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("YOUR_EMBED_COLOR")
          .setTitle("Ticket")
          .setDescription("Pour créer un ticket, réagissez avec :envelope_with_arrow:")
          .setFooter("YOUR_FOOTER_TEXT", interaction.client.user.displayAvatarURL()),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("create-ticket")
            .setLabel("Créer un ticket")
            .setEmoji("📩")
            .setStyle("PRIMARY")
        ),
      ],
    });
  },
};
