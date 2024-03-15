const {db} = require('../models');
const {logger} = require('../../logger');
const { GuildMember } = require('discord.js');

module.exports = {
    /**
     * Reccupere ou crée le profil d'un membre s'il n'en a pas
     * @param {GuildMember} member  
     * @param {*} guildId  Si vous ne posseder pas de GuildMember, preciser la guildId
     * @returns 
     */
    async findOrCreateMember(member, guildId=null) { 
        let dbMember;
        if (guildId ==null) guildId = member.guild.id; 
        try { 
            dbMember = await db.Members.findOne({ where: { member_id: member.id, guildId: guildId} }); 

            if (dbMember) {
                // Le membre existe déjà
                return {"member" : dbMember, "create" : false};
            } else {
                // Le membre n'existe pas, on le crée
                const newMember = await db.Members.create({
                    member_id: member.id,
                    guildId: guildId,
                    credits: 0,
                    experience: 0,
                    level: 1
                });

                // Enregistrer le membre dans la base de données
                await newMember.save(); 
                return {"member" : newMember, "create" : true};
            }
        } catch (err) {
            logger.error('Erreur lors de la recherche/création du membre :'+ err);
            return null;
        }
    },

}