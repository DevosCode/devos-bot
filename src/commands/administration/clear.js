const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("../../structure/Client");
const { error, success } = require("../../utils/interaction-utils");
const { findOrCreateMember } = require("../../utils/database/requetes/members");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Efface un certain nombre de messages dans le salon actuel.')
    .addIntegerOption(option =>
      option.setName('nombre')
        .setDescription('Le nombre de messages à effacer.')
        .setRequired(true)
    )
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre dont les messages doivent être supprimés.')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  /**
 * @param {Object} options
 * @param {CustomClient} options.client - Le client
 * @param {CommandInteraction} options.interaction - L'interaction de commande
 */
  async run({ client, interaction }) {

    const quantity = interaction.options.getInteger('nombre');
    if (quantity <= 0 || quantity > 100) return await error(interaction, 'La quantité doit être comprise entre 1 et 100.');

    const targetMember = interaction.options.getMember('membre');
    const messages = await interaction.channel.messages.fetch({ limit: quantity });
    const messagesToDelete = targetMember
      ? messages.filter(m => m.author.id === targetMember.id)
      : messages;

    if (messagesToDelete.size === 0)  return await error(interaction, 'Aucun message trouvé pour le membre spécifié.'); 
    try {
      await interaction.channel.bulkDelete(messagesToDelete);
    }catch {
      return await error(interaction, 'Il y a des messages remontant à plus de 2 semaines.'); 
    }
    
    await success(interaction, `J'ai effacé ${messagesToDelete.size} message${messagesToDelete.size === 1 ? '' : 's'}.`, {replied: true});
  }
};