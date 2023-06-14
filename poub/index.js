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
db.Items.belongsToMany(db.Members, { through: db.ItemsInventories });
db.Members.belongsToMany(db.Items, { through: db.ItemsInventories });
// N - N
db.Members.belongsToMany(db.ColorRoles, { through: db.ColorsInventories, foreignKey: 'MemberId' });
db.ColorRoles.belongsToMany(db.Members, { through: db.ColorsInventories, foreignKey: 'ColorRoleId' });

module.exports = { sequelize, db };