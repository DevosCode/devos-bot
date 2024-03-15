const Client = require('./src/structure/Client');
const config = require('./src/config.json');
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ config });

client.runDatabase();
client.login(process.env.RUN == "PROD" ? process.env.TOKEN : process.env.TOKEN_DEV);
client.loadEvents();
client.loadCommands();
client.loadSelectMenus();
client.loadButtons();