'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Items.init({
    id : {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    guild_id: {
      type: DataTypes.STRING,
      allowNull: false, 
    }
  }, {
    sequelize,
    modelName: 'Items',
  });

  // Items.sync();
  return Items;
};