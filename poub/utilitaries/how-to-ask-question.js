module.exports = {
  description: 'Comment bien poser une question.',
  type: 'CHAT_INPUT',
  options: [
    { name: 'pour', description: 'Membre qui ne sait pas poser son problème.', type: 'USER', required: true }
  ],
  async run({ client, interaction }) {
    const member = interaction.options.getMember('pour');

    interaction.reply({
      embeds: [{
        color: client.config.colors.main,
        author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() },
        title: 'Voici comment bien poser son problème.',
        description: `${member.toString()}\n1) Expliquez le contexte de votre problème.\n2) Montrez le code ou la partie qui bloque.\n3) Expliquez ce qu'il devrait ce passer dans le cas normale.\n4) Montrez votre code.\n\nGoogle est un outil très puissant, n'hésitez pas a l'utiliser.`,
        footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
      }]
    });
  }
};