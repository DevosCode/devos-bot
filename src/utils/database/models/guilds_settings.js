'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class GuildSettings extends Model {
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
    Les parametres de guild
  */
  GuildSettings.init({
    id : {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
    },
    // le libele decrivant la valeur, ex : STAFF_ROLES_ID ou CHANGE_NICKNAME_ROLE_ID
    label: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: false
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: false
    }, 
    // la valeur du libele, par exemple 0123456789
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'GuildSettings',
  });

  // GuildSettings.sync();
  return GuildSettings;
};