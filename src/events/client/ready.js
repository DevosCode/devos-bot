const { ActivityType } = require('discord.js');

/**
 * @param {import('discord.js').Client} client
 */
module.exports = async (client) => {
    const guildId = process.env.GUILD_ID;
    const getMembersCount = () => client.guilds.resolve(guildId).members.cache.size;
    
    setInterval(async () => {
        const activityList = [
            `${getMembersCount()} membres`,
            `Devos-Code`
        ];
        const activity = activityList[Math.floor(Math.random() * activityList.length)];
        client.user.setActivity(activity, { type: ActivityType.Watching})
    }, 20_000)
    
    console.log(`[DEVOS-BOT] Le bot est maintenant opérationnel !`);
};