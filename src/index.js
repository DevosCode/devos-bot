// imports
console.log("[DEVOS-BOT] Lancement de Devos-Bot... ... ...")
const { Client } = require('discord.js');

const client = new Client();

const dotenv = require("dotenv");
dotenv.config();








client.login(process.env.TOKEN);