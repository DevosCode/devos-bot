module.exports = {
  description: 'Crée vote profil si vous n\'en avez pas.',
  type: 'CHAT_INPUT',
  async run({ client, interaction }) {
    const usersDB = await client.pool.query(`SELECT * FROM users where id = ${interaction.user.id}`);
    const userDB = usersDB.rows[0];

    if (userDB) return interaction.error('Vous avez déjà un profil. Faites la commande `/credits` pour voir votre nombre de credit.');

    await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${interaction.user.id}, 0, 0, 1)`);
    interaction.success('Votre profile a bien été crée. Faites la commande `/credits` pour voir votre nombre de credit.');
  }
};