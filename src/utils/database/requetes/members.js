const {db} = require('../models');
const {logger} = require('../../logger');
const { GuildMember } = require('discord.js');

module.exports = {
    /**
     * Reccupere ou crée le profild 'un membre s'il n'en a pas
     * @param {GuildMember} member 
     * @returns 
     */
    async findOrCreateMember(member, guildId=null) { 
        let dbMember;
        try {
            if (guildId){
                dbMember = await db.Members.findOne({ where: { id: member.id, guildId: guildId } });
            }else{
                dbMember = await db.Members.findOne({ where: { id: member.id, guildId: member.guild.id } });
            }

            if (dbMember) {
                // Le membre existe déjà
                return {"member" : dbMember, "create" : false};
            } else {
                // Le membre n'existe pas, on le crée
                const newMember = await db.Members.create({
                    id: member.id,
                    guildId: member.guild.id,
                    credits: 0,
                    experience: 0,
                    level: 1,
                    color: null
                });

                // Enregistrer le membre dans la base de données
                await newMember.save();
                return {"member" : newMember, "create" : true};
            }
        } catch (error) {
            logger.error('Erreur lors de la recherche/création du membre :'+ error);
            throw error;
        }
    },

}