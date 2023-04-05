'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Members.init({
    id : {
        type: DataTypes.STRING, 
        allowNull: false, 
        primaryKey: true,
    },
    guild_id: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: false
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: false
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: false
    }
  }, {
    sequelize,
    modelName: 'Members',
  });

  // Members.sync();
  return Members;
};