module.exports = async (client, member) => {
  member.roles.add(client.config.autorole_roles, 'Ajout des autoroles.');
  // await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${member.id}, 0, 0, 1)`);
};