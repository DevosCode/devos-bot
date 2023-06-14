const { Sequelize, DataTypes } = require('sequelize');
// const env = require("./../utils/environement");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(`${process.env.DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}`
  ,{
  logging: false // si les tables ne sont pas generer vous pouvez reactiver les logs pour voir la trace 
})

const Member = sequelize.define('Member', {
    id : {
        type: DataTypes.STRING, 
        allowNull: false, 
        primaryKey: true,
    },
    guildId: {
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
    // la couleur effectif sur l'utilisateur
    color: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      unique: false
    }
  });   

const ColorRole = sequelize.define('ColorRole', {
    id : {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    roleId : {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    guildId : {
      type: DataTypes.STRING,
      allowNull: false
    },
    prix : {
      type : DataTypes.INTEGER,
      allowNull: false,
    }
}); 
 
const InventaireColor = sequelize.define('InventaireColor', {
    id : {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
    },
});



Member.hasMany(InventaireColor, { foreignKey: 'memberId' });
InventaireColor.belongsTo(Member, { foreignKey: 'memberId' });
InventaireColor.belongsTo(ColorRole, { foreignKey: 'colorRoleId' });
ColorRole.hasMany(InventaireColor, { foreignKey: 'colorRoleId' });

sequelize.sync(); // synchronise la bdd

sequelize.authenticate().then(() =>{
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error('Unable to connect to the databse:', error);
})

module.exports ={sequelize, Member, ColorRole, InventaireColor};