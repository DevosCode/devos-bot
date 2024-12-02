'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class ColorsInventories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ColorsInventories.belongsTo(models.Members, { foreignKey: 'memberId' });
      ColorsInventories.belongsTo(models.ColorRoles, { foreignKey: 'colorRoleId' });
    }
  }
  /*
    L'inventaire des couleurs d'un utilisateur
   */
  ColorsInventories.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'ColorsInventories',
  });

  // ColorsInventories.sync();
  return ColorsInventories;
};