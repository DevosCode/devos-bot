const { JSDOM } = require('jsdom');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    url: 'https://developer.mozilla.org/api/v1/search?q=%s&locale=fr',
    async getEmbed(results, interaction) {
        // get found page results
        const { documents: pages } = results;

        // if no page found, throw (will be catched and displayed to the user)
        if(pages.length === 0) throw 'Aucun résultat n\'a été trouvé';

        // get first page result
        const [ page ] = pages;
        
        // get page infos
        const { title, summary, mdn_url } = page;
        const embed = new EmbedBuilder()
            .setAuthor({name : title, iconURL:'https://developer.mozilla.org/apple-touch-icon.6803c6f0.png', url: 'https://developer.mozilla.org/apple-touch-icon.6803c6f0.png'})
            .setURL(`https://developer.mozilla.org${mdn_url}`)
            .setDescription(`${summary}\n\n[lire plus](https://developer.mozilla.org${mdn_url})\n`)
            .setColor(interaction.client.config.colors.main)
            .setFooter({text : 'from MDN Web Docs'});
            
        
        // scrapping
        // generate document
        const { window: { document } } = await JSDOM.fromURL(`https://developer.mozilla.org${mdn_url}`, { resources: 'usable' });
        
        // get example (can be from a code tag, or a live editor iframe)
        // get the code editor url, if present
        const editorUrl = document.querySelector('iframe.interactive')?.src;
        // get all pre > code tags
        const examplePreElement = document.querySelector('pre');

        // used to resolve example language
        const availableLanguages = ['html', 'css', 'js'];

        // element that contains the code
        let codeElement;
        // language
        let language;

        // if live editor
        if(editorUrl) {
            // get editor iframe content 
            const { window: { document: editorDocument } } = await JSDOM.fromURL(editorUrl);
            // search for a code element
            const exampleCodeElement = editorDocument.querySelector('code');

            // resolve code's language
            // will be undefined if the editor has tabs
            language = availableLanguages.find(language => exampleCodeElement.id.includes(language) || exampleCodeElement.className.includes(language));
            // if undefined, it's a tabbed editor, so get the first tab id. The id will be the language name
            language ??= editorDocument.querySelector('button[role="tab"]').id;
            codeElement = exampleCodeElement;
        } else if(examplePreElement) { // if static example pre element
            // resolve code's language
            language = availableLanguages.find(language => examplePreElement.className.includes(language));
            // get the html element that contains the code
            codeElement = examplePreElement;
        }

        // get the code only if a codeElement is present
        const exampleCode = codeElement?.textContent;
        // add a field to the embed, containing the code, only if there is one
        if(exampleCode) embed.addFields({ name: 'Exemple', value: '```' + language + '\n' + exampleCode + '\n```' });
        
        // finally return the embed
        return embed;
    }
}
