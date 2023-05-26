module.exports = {
  description: 'Affiche ton niveau ou celui d\'un utilisateur.',
  type: 'CHAT_INPUT',
  options: [
    { name: 'membre', description: 'Choisissez un membre.', type: 'USER' }
  ],
  async run({ client, interaction }) {
    const member = interaction.options.getMember('membre') || interaction.member;

    if (!member) return interaction.error('Je ne trouve pas ce membre sur le serveur.');
    if (member.user.bot) return interaction.error('Les bots n\'ont pas de credits.');

    const usersDB = await client.pool.query(`SELECT * FROM users WHERE id = ${member.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) {
      if (member.id == interaction.member.id) return interaction.error('Vous n\'avez pas de niveau.');
      else return interaction.error(`${member.toString()} n'a pas de niveau.`);
    }

    const xpObjectif = userDB.level ** 2 * 100;

    const pourcentage = userDB.experience * 100 / xpObjectif;

    interaction.reply({
      embeds: [{
        color: client.config.colors.main,
        author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() },
        title: 'Rank',
        description: `Niveau : ${userDB.level}\nExperience : ${xpObjectif - (xpObjectif - userDB.experience)} / ${xpObjectif}\n\n${client.config.emojis.xpbar_left}${client.config.emojis.xpbar_full.repeat(Math.floor(pourcentage / 7))}${client.config.emojis.xpbar_empty.repeat(Math.floor((100 - pourcentage) / 7))}${client.config.emojis.xpbar_right}`,
        footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
      }]
    });
  }
};