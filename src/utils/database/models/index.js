'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const basename = path.basename(__filename);
const db = {};

// console.log(`${process.env.DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}`)
const sequelize = new Sequelize(`${process.env.DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}`
  ,{
  logging: false // si les tables ne sont pas generer vous pouvez reactiver les logs pour voir la trace 
})
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// N - N
// db.Items.belongsToMany(db.Members, { through: db.ItemsInventories });
// db.Members.belongsToMany(db.Items, { through: db.ItemsInventories });
// N - N
// db.ColorRoles.belongsToMany(db.Members, { through: db.ColorsInventories });
// db.Members.belongsToMany(db.ColorRoles, { through: db.ColorsInventories });

// Modèle Members
// db.Members.associate = function(models) {
//   db.Members.hasMany(models.ItemsInventories, { foreignKey: 'memberId' });
//   db.Members.hasMany(models.ColorsInventories, { foreignKey: 'memberId' });
// };

// // Modèle Items
// db.Items.associate = function(models) {
//   db.Items.hasMany(models.ItemsInventories, { foreignKey: 'itemId' });
// };

// // Modèle ItemsInventories
// db.ItemsInventories.associate = function(models) {
//   db.ItemsInventories.belongsTo(models.Members, { foreignKey: 'memberId' });
//   db.ItemsInventories.belongsTo(models.Items, { foreignKey: 'itemId' });
// };

// // Modèle ColorsInventories
// db.ColorsInventories.associate = function(models) {
//   db.ColorsInventories.belongsTo(models.Members, { foreignKey: 'memberId' });
//   db.ColorsInventories.belongsTo(models.ColorRole, { foreignKey: 'colorRoleId' });
// };

// // Modèle ColorRole
// db.ColorRole.associate = function(models) {
//   db.ColorRole.hasMany(models.ColorsInventories, { foreignKey: 'colorRoleId' });
// };


// db.Members.hasMany(db.ItemsInventories, { foreignKey: 'memberId' });
// db.ItemsInventories.belongsTo(db.Members, { foreignKey: 'memberId' });
// db.ItemsInventories.belongsTo(db.Items, { foreignKey: 'itemsId' });
// db.Items.hasMany(db.ItemsInventories, { foreignKey: 'itemsId' });
 
// db.Members.hasMany(db.ColorsInventories, { foreignKey: 'memberId' });
// db.ColorsInventories.belongsTo(db.Members, { foreignKey: 'memberId' });
// db.ColorsInventories.belongsTo(db.ColorRole, { foreignKey: 'colorRoleId' });
// db.ColorRole.hasMany(db.ColorsInventories, { foreignKey: 'colorRoleId' });

module.exports = { sequelize, db };