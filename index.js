const { Client } = require('discord.js');
const { sequelize } = require('./src/utils/database/models/index.js');

console.log("[DEVOS-BOT] Lancement de la base de donnée... ... ...");
(async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection réalisé avec succes.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de donnée', error);
    }
    try {
        await sequelize.sync();
        console.log("La base de donnée à été synchronisé.")
    }catch (error) {
        console.error('Impossible de synchronisé la base de donnée', error);
    }
})();

// console.log("[DEVOS-BOT] Lancement de Devos-Bot... ... ...")
// const { Client } = require('discord.js');

// const client = new Client();

// const dotenv = require("dotenv");
// dotenv.config();

// client.login(process.env.TOKEN);