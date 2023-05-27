const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const CustomClient = require("./../structure/Client");
const { error, success } = require("./../utils/interaction-utils");
const { findOrCreateMember } = require("./../utils/database/requetes/members");

module.exports = {
  /**
  * @param {Object} options
  * @param {CustomClient} options.client - Le client
  * @param {CommandInteraction} options.interaction - L'interaction de commande
  */
  async run({ client, interaction }) {
    if (interaction.user.id !== interaction.customId.split('.')[1]) return interaction.deferUpdate();
    const item = client.config.store.find(s => s.item == interaction.values[0]);

    const res = await findOrCreateMember(interaction.member);
    const userDB = res.member;

    // if (!userDB) return error(interaction, 'Votre profil n\'est pas enregistré. Faites la commande `/create-profile` ou envoyez un message pour enregistrer un profil.');
    if (userDB.credits < item.credits) return error(interaction,`${interaction.user.toString()}, Il vous manque ${item.credits - userDB.credits} credits pour acheter ce produit.`);

    if (item.item == 'ad_role') {
      if (interaction.member.roles.cache.has(client.config.ad_role)) return error(interaction, 'Vous avez déjà acheter ce produit.');
      interaction.member.roles.add(client.config.ad_role);
      await client.pool.query(`UPDATE users SET credits =  ${userDB.credits - 10} WHERE id = ${interaction.user.id}`);
      success(interaction, 'Vous avez correctement acheter ce produit. Je vous ai débité 10 credits.');
    }
  }
};