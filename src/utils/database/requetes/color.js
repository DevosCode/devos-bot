const { db } = require("./../models/index");

module.exports = {
    colorOfMember: async (memberId) => {
        const res = await db.ColorsInventories.findAll({
            where: { MemberId: memberId },
            include: [db.Members, db.ColorRoles]
        });

        return res.map(elem => {
            const color = elem.ColorRole;
            return {
                id : color.id,
                label : color.label,
                value : color.value, 
                roleId : color.roleId,
                guildId: color.guildId, 
                prix : color.prix
            };
        });
    }
}