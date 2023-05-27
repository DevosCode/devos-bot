// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setDescription("ceci est une description"),
//     /**
//      * @param {import('discord.js').CommandInteraction} interaction
//      */
//     execute(interaction) {
//         const { client } = interaction;
        
//         const ping = client.ws.ping;

//         interaction.reply(`Pong ! Le bot a un ping de ${ping}ms`);
//     }
// }


module.exports = {
    description: 'Affiche le ping du bot.',
    type: 'CHAT_INPUT',
    async run({ client, interaction }) {
      interaction.reply(`Pong ! Gateway: \`${client.ws.ping}ms\`.`);
    }
  };