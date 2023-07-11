const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("../structure/Client");
const { error, success } = require("../utils/interaction-utils");
const { findOrCreateMember } = require("../utils/database/requetes/members");
const { getItem, addColorToInventory, memberHaveColor } = require("../utils/database/requetes/color");

module.exports = {
  /**
  * @param {Object} options
  * @param {CustomClient} options.client - Le client
  * @param {CommandInteraction} options.interaction - L'interaction de commande
  */
  async run({ client, interaction }) { 
    if (interaction.user.id !== interaction.customId.split('.')[1]) return interaction.deferUpdate(); 
    const item = await getItem(interaction.values[0]); 
    if (!item) return error(interaction, `${interaction.user.toString()}, L'item demander n'a pas été trouvé, contactez le staff.`, {ephemeral:true});

    const res = await findOrCreateMember(interaction.member);
    const userDB = res.member;
    if (await memberHaveColor(userDB, item.label)) return await error(interaction, `${interaction.user.toString()}, vous possédez déjà cette couleur.`, {ephemeral:true});
    if (userDB.credits < item.prix) return await error(interaction, `${interaction.user.toString()}, Il vous manque ${item.prix - userDB.credits} credits pour acheter ce produit.`, {ephemeral:true});
    // ajoute l'item a son inventaire de couleur
    userDB.credits = userDB.credits - item.prix;
    await userDB.save();
    if (!!await addColorToInventory(userDB.id, item.id)) return await success(interaction, 'Vous avez correctement acheter ce produit. Je vous ai débité 10 credits.', {ephemeral:true});
    await error(interaction, `${interaction.user.toString()}, l'enregistrement a échoué, contactez le staff.`, {ephemeral:true});
  }
};