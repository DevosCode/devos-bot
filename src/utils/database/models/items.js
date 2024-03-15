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
      Items.hasMany(models.ItemsInventories, { foreignKey: 'itemId' });
    }
  }
  /**
   * Un item pour ItemsInventories
   */
  Items.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING, // ROLE, ITEM
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Items',
  });

  // Items.sync();
  return Items;
};