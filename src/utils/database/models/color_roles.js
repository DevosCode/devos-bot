'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class ColorRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  // Une couleur/item pour ColorsInventories
  ColorRoles.init({
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
    role_id : {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true
    }
  }, {
    sequelize,
    modelName: 'ColorRoles',
  });

  // ColorRoles.sync();
  return ColorRoles;
};