const { findOrCreateMember } = require("./../../utils/database/requetes/members");
const MaxMessage = 3;
const MaxTemps = 10000;
let spamCache = {};

module.exports = async (client, message) => {  
  if (!message.author.bot) { 
    let userDB = (await findOrCreateMember(message.member, message.member.guild.id)).member;

    const xpObjectif = userDB.level ** 2 * 100;

    userDB.experience += Math.floor(Math.random() * 10) + 5;

    const credits_number = message.member.roles.cache.has(client.config.booster_role) ? 3 : 2;

    if (userDB.experience > xpObjectif) {
      userDB.credits = userDB.credits + credits_number;
      userDB.level = userDB.level + 1;
      // await client.pool.query(`UPDATE users SET credits = ${userDB.credits + credits_number}, level = ${userDB.level + 1} WHERE id = ${message.member.id}`);
      message.channel.send(`Bravo ${message.member.toString()} ! Vous venez de passer au niveau **${userDB.level}**. Vous gagnez \`${credits_number}\` credits en récompense.`);
    }

    await userDB.save();
    // PERMET DE SUPPRIMER LES MESSAGES EN CAS DE SPAM DE LIEN DUN HACKEUR MAL INTENTIONNER QUI POURRAIT NUIRE AU SERVEUR ET DONC NOUS EMBETER
    const hasLink = message.content.match(/(http|https):\/\/[^\s]+/g);
    if (!hasLink) return;
    const userId = message.author.id;
    const channelId = message.channel.id;
    if (!spamCache[userId]) {
      spamCache[userId] = {
        count: 0,
        lastMessageTime: 0,
        messagse: [],
        messageId: [],
      };
    }
    spamCache[userId].count++;
    spamCache[userId].lastMessageTime = Date.now();
    spamCache[userId].messagse.push(message);
    spamCache[userId].messageId.push(message.id);
    if (spamCache[userId].count >= MaxMessage) {
      const isSpamWithinTimeframe = Date.now() - spamCache[userId].lastMessageTime <= MaxTemps;
      if (isSpamWithinTimeframe) {
        message.member.ban({ reason: 'Spam hack link' , deleteMessageSeconds: 60 * 60});
        client.channels.cache.get('1014796618534494219').send(`ALERTE SPAM : <@${userId}> dans <#${channelId}> MESSAGE: \`${message.content}\``);  
        delete spamCache[userId];
      }}
  }

  if (message.author.id == client.config.disboard_id) {
    if (message.embeds[0].color == 2406327) {
      const member = message.guild.members.cache.get(message.embeds[0].description.split(' ')[0].replace('<@', '').replace('>', ''));

      if (!member) return;

      let userDB = (await findOrCreateMember(member)).member; 
      const credits_number = member.roles.cache.has(client.config.booster_role) ? 1 : 0.5;

      userDB.credits = userDB.credits + credits_number;
      await userDB.save(); 
      message.channel.send(`Merci ${member.toString()} d'avoir bump le serveur. Voici \`${credits_number}\` credit en récompense.`);
    }
  }
};