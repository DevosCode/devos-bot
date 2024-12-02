'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class ItemsInventories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemsInventories.belongsTo(models.Members, { foreignKey: 'memberId' });
      ItemsInventories.belongsTo(models.Items, { foreignKey: 'itemId' });
    }
  }
  /*
    L'inventaire des items d'un utilisateur
   */
  ItemsInventories.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'ItemsInventories',
  });

  // ItemsInventories.sync();
  return ItemsInventories;
};