// imports
const { error, success } = require("../../utils/interaction-utils");
const { readdirSync } = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');
// documentations infos (maybe put this in another file in the future ?)
// docId: { url, getEmbed }
// in the url, %s will be replaced later by the user query
const documentations = { };
// register docs
const docsPath = path.join(__dirname, './../../utils/docs');
readdirSync(docsPath).forEach(file => {
    const name = file.split('.').slice(0, -1);
    const documentation = require(path.join(docsPath, file));
    documentations[name] = documentation;
});

// choices for command option 'doc'.
// WARNING : BECAUSE OF DISCORD LIMITATIONS, DOCUMENTATIONS ARE LIMITED TO 25.
// IF MORE ARE NEEDED IN THE FUTURE, USE INTERACTIONS AUTOCOMPLETE INSTEAD.
const documentationChoices = Object.keys(documentations).map(d => { return { name: d, value: d } });

// command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('doc')
        .setDescription('Cherche dans la documentation spécifiée')
        .addStringOption(o => o
            .setName('doc')
            .setDescription('Choisissez une documentation')
            .setRequired(true)
            .setChoices(...documentationChoices)
        )
        .addStringOption(o => o
            .setName('recherche')
            .setDescription('Effectuez votre recherche')
            .setRequired(true)
        ),   
  /**
   * @param {Object} options
   * @param {CustomClient} options.client - Le client 
   * @param {CommandInteraction} options.interaction - L'interaction de commande
   */
    async run({client, interaction}) {
        // get parameters
        const docName = interaction.options.getString('doc');
        const query = interaction.options.getString('recherche');

        // close guards
        if(!docName) return error(interaction, 'Aucune documentation n\'a été spécifiée.');
        if(!query) return error(interaction, 'Aucune recherche n\'a été spécifiée.');

        // get the doumentation url, and the getEmbed function.
        // If documentation not found, provide an empty object to prevent the 'Cannot destructure undefined' error.  
        const { url, getEmbed } = documentations[docName] ?? { };

        // if doc not found, error. It's logically always found, so it will likely nerver be executed. But just in case.
        // ps : in the future, we may use autocomplete, wich allows users to type anything. Never remove this line.
        if(!url || !getEmbed) return error(interaction, `La documentation ${docName} n'a pas été trouvée.`);

        // generate query
        const queryUrl = url.replace('%s', encodeURI(query));

        // the following block could take a few time to execute. I defer the interaction just in case.
        await interaction.deferReply();

        // do the request
        try {
            // will throw if network error
            const res = await fetch(queryUrl);

            // if code not OK, throw, will be catched later.
            if(res.statusText != 'OK') throw 'Une erreur est survenue en tentant d\'accéder à la documentation.';

            // get the JSON
            const requestJson = await res.json();

            // format the results
            const embed =  await getEmbed(requestJson, interaction) ;

            await interaction.editReply({ embeds: [embed] });
        } catch(err) {
            if(typeof err === 'string') error(interaction, err, { replied: false });
            else {
                console.log(err);
                error(interaction, 'Une erreur est survenue.', { replied: false });
            }
        }
    }
}