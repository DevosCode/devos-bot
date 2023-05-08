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
      // define association here
    }
  }
  /*
    L'inventaire des couleurs
   */
  ColorsInventories.init({
    id : {
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