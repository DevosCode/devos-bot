module.exports = {
  description: 'Affiche le nombre de credits que vous avez ou celui d\'un autre utilisateur.',
  type: 'CHAT_INPUT',
  options: [
    { name: 'membre', description: 'Choisissez un membre.', type: 'USER' }
  ],
  async run({ client, interaction }) {
    const member = interaction.options.getMember('membre') || interaction.member;

    if (!member) return interaction.error('Je ne trouve pas ce membre sur le serveur.');
    if (member.user.bot) return interaction.error('Les bots n\'ont pas de credits.');

    const usersDB = await client.pool.query(`SELECT * FROM users where id = ${member.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) {
      if (member.id == interaction.member.id) return interaction.error('Votre profil n\'est pas enregistré. Faites la commande `/create-profile` ou envoyez un message pour enregistrer un profil.');
      else return interaction.error(`${member.toString()} n'a pas encore de profil.`);
    }

    interaction.reply({
      embeds: [{
        color: client.config.colors.blue,
        author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() },
        title: 'Credits',
        description: member.id == interaction.member.id ? `Vous avez ${userDB.credits} credit${userDB.credits > 1 ? 's' : ''}.` : `${member.toString()} a ${userDB.credits} credit${userDB.credits > 1 ? 's' : ''}.`,
        footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
      }]
    });
  }
};