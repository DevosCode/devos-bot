const Client = require('./src/structure/Client');
const config = require('./src/config.json');
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ config });

client.runDatabase();
client.login(process.env.TOKEN);
client.loadEvents();
client.loadCommands();
client.loadSelectMenus();
client.loadButtons();