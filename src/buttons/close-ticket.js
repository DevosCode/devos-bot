module.exports = {
  async run({ interaction }) {
    interaction.reply(`Ticket fermé par ${interaction.user.toString()}. Le ticket va se supprimer dans quelques secondes.`);
    setTimeout(() => {
      interaction.channel.delete();
    }, 5000);
  }
};