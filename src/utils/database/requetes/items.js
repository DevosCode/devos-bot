const { db } = require("../models/index");

module.exports = {
    getItems: async (guildId) => {
        const res = await db.Items.findAll({
            where: { guildId: guildId }
        });
        console.log(res);
        return res.map(elem => {
            console.log("--elem", elem);
            const item = elem.dataValues;
            return {
                id : item.id,
                label : item.label,
                description : item.description, 
                guildId: item.guildId, 
                prix : item.prix
            };
        });
    }
}