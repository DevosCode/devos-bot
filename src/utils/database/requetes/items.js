const { db } = require("../models/index");
const { logger } = require('../../logger');

module.exports = {
    /**
     * Reccuperer toutes les items d'une guild
     * @param string guildId id de la guild
     * @returns 
     */
    getItems: async (guildId) => {
        const res = await db.Items.findAll({
            where: { guildId: guildId }
        });
        return res.map(elem => {
            const item = elem.dataValues;
            return {
                id: item.id,
                label: item.label,
                value: item.value, 
                guildId: item.guildId,
                prix: item.prix,
                type : item.type,
                description : item.description
            };
        });
    },
    /**
     * Reccuperer un item en utilisant son pseudo
     * @param number id de l'item
     * @return l'item ou null
     */
    getItemById: async (itemId) => {
        const res = await db.Items.findOne({
            where: { id: itemId }
        });
        return res.dataValues ? res.dataValues : null;
    },
    /**
     * Méthode pour ajouter un nouvel élément
     * @param string guildId l'id de guild
     * @param string label le label de l'item
     * @param string prix de l'item
     * @param string value la valeur de l'item
     * @param description une description de l'item
     * @param string type le type de l'item, ROLE ou ITEM
     * @returns l'item crée ou null
     */
    addItem: async (guildId, label, prix, value,description,  type="ROLE"|"ITEM") => {
        try {
            const item = await db.Items.create({
                guildId: guildId,
                label: label, 
                prix: prix,
                value: value, 
                type : type,
                description : description
            });
            await item.save();
            return item;
        } catch (err) {
            logger.error(`Erreur lors de l'ajout de l'élément : ${err}`);
            return null;
        }
    },
 
    /**
     * Méthode pour supprimer un élément existant
     * @param number itemId l'id de l'item
     * @returns 
     */
    deleteItem: async (itemId) => {
        try {
            const item = await db.Items.findOne({ where: { id: itemId } });

            if (item) {
                await item.destroy();
                return true; 
            } 
            // Suppression réussie
        } catch (err) {
            logger.error(`Erreur lors de la suppression de l'élément ayant l'id ${itemId} : ${err}`);
            return false;
        }
    }

}