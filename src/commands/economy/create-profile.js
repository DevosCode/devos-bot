const { SlashCommandBuilder } = require('discord.js');
const { error, success } = require("./../../utils/interaction-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createprofile')
    .setDescription('Crée votre profil si vous n\'en avez pas.'),
  async run({ client, interaction }) {
    // const usersDB = await client.pool.query(`SELECT * FROM users where id = ${interaction.user.id}`);
    // const userDB = usersDB.rows[0];

    // if (userDB) return error(interaction, 'Vous avez déjà un profil. Faites la commande `/credits` pour voir votre nombre de credit.');

    // await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${interaction.user.id}, 0, 0, 1)`);
    // success(interaction, 'Votre profile a bien été crée. Faites la commande `/credits` pour voir votre nombre de credit.');
  }
};