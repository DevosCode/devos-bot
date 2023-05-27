const {findOrCreateMember} = require("./../../utils/database/requetes/members");
const { GuildMember } = require('discord.js');
/**
 * 
 * @param {*} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
  await member.roles.add(client.config.autorole_roles, 'Ajout des autoroles.');
  await findOrCreateMember(member);
};