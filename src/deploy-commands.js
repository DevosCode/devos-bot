const { REST, Routes } = require('discord.js');
const fs = require('fs');

const dotenv = require('dotenv').config();

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

const commands = [];
const commandsPath = '/commands';
const commandFiles = [];

fs.readdirSync('./src' + commandsPath).forEach(dir => {
        fs.readdirSync(`${'./src' + commandsPath}/${dir}`).forEach(file => {
            commandFiles.push(`.${commandsPath}/${dir}/${file}`);
        });
    }
);

console.table(commandFiles);

for (const file of commandFiles) {
	const command = require(file);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
	try {
		console.log(`[DEVOS-BOT] Demarrage du relancement de ${commands.length} commandes`);
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);
		console.log(`[DEVOS-BOT] Vous avez relancer ${data.length} commandes`);
	} catch (error) {
		console.error(error);
	}
})();