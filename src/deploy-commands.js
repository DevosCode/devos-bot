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
	const commandName = file.split('/').pop().split('.').shift();
	command.data.setName(commandName);

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
	try {
		console.log(`[DEVOS-BOT] Demarrage du déploiement de ${commands.length} commandes`);
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);
		console.log(`[DEVOS-BOT] Vous avez déployé ${data.length} commandes`);
	} catch (error) {
		console.error('[DEVOS-BOT] Une erreur est survenue en déployant les commandes :');
		console.error(error);
	}
})();