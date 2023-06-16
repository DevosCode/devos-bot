const { db } = require("./../models/index");
const { logger } = require('../../logger');

  /**
   * Ajouter une couleur en base de donnée
   * @param string label 
   * @param string value 
   * @param string roleId 
   * @param string guildId 
   * @param string prix 
   * @returns la couleur ou null
   */
  const addColorRole= async (label, value, roleId, guildId, prix) => {
    try {
      const colorRole = await db.ColorRoles.create({
        label: label,
        value: value,
        roleId: roleId,
        guildId: guildId,
        prix: prix
      });
      return colorRole;
    } catch (error) {
      console.error(`Erreur lors de l'ajout d'une couleur : ${error}`);
      return null;
    }
  };

  /**
   * Retirer une couleur de la base de donnée
   * @param string colorRoleId l'id de la couleur
   * @returns 
   */
  const removeColorRole= async (colorRoleId) => {
    try {
      const deletedColorRole = await db.ColorRoles.destroy({
        where: { id: colorRoleId }
      });
      return deletedColorRole;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la couleur : ${error}`);
      throw new Error('Erreur lors de la suppression de la couleur');
    }
  };

  /**
   * Reccuperer les couleurs d'un membre
   * @param string memberId l'id du membre
   * @returns une liste de couleur
   */
  const colorOfMember= async (memberId) => {
    const res = await db.ColorsInventories.findAll({
      where: { MemberId: memberId },
      include: [db.Members, db.ColorRoles]
    });

    return res.map(elem => {
      const color = elem.ColorRole;
      return {
        id: color.id,
        label: color.label,
        value: color.value,
        roleId: color.roleId,
        guildId: color.guildId,
        prix: color.prix
      };
    });
  };

  /**
   * Reccuperer les couleurs d'une guild
   * @param string guildId l'id de guild
   * @returns une liste de couleur
   */
  const colorOfGuild= async (guildId) => {
    const res = await db.ColorRoles.findAll({
      where: { guildId: guildId }
    });

    return res.map(elem => {
      const color = elem.dataValues;
      return {
        id: color.id,
        label: color.label,
        value: color.value,
        roleId: color.roleId,
        guildId: color.guildId,
        prix: color.prix
      };
    });
  };

  /**
   * Reccuperer une couleur en utilisant son id
   * @param string itemId l'id de l'item
   * @returns un item
   */
  const getItem= async (itemId) => {
    const res = await db.ColorRoles.findOne({
      where: { id: itemId }
    }); 
    return res.dataValues ? res.dataValues : null;
  };

  /**
   * Ajoute une couleur à l'inventaire de l'utilisateur
   * @param string memberId l'id du membre
   * @param string colorRoleId l'id de la couleur
   * @returns l'element ou null
   */
  const addColorToInventory= async (memberId, colorRoleId) => {
    try {
      const inventoryColor = await db.ColorsInventories.create({
        memberId: memberId,
        colorRoleId: colorRoleId
      });
      return inventoryColor;
    } catch (error) {
      logger.error(`Erreur lors de l'ajout de la couleur à l'inventaire : ${error}`);
      return null;
    }
  };

  /**
   * Indique si un membre possede une couleur ou non
   * @param string memberId l'id du membre en base de donnée 
   * @param string label le label de la couleur
   * @param string guildId l'id de guild
   * @return true s'il la possede
   */
  const memberHaveColor = async(memberId, label, guildId) => {
    const colors = await colorOfMember(memberId);
    for (const color of colors) {
      if (color.label === label && color.guildId === guildId) {
        return true;
      }
    }
    return false;
  }

module.exports = {
  memberHaveColor,
  addColorToInventory,
  getItem,
  colorOfGuild,
  colorOfMember,
  removeColorRole,
  addColorRole

}