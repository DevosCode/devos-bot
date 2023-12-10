const { SlashCommandBuilder } = require('discord.js');
const { findOrCreateMember } = require("../../utils/database/requetes/members");
const { error, success } = require("../../utils/interaction-utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sent-credits')
        .setDescription("Envoyer à un membre un peu de vos crédits.")
        .addUserOption(option =>
            option
                .setName('membre')
                .setDescription('Le membre qui va recevoir vos crédits.')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('credits')
                .setDescription('Le nombre de crédits que tu souhaites lui donner.')
                .setRequired(true)
        ),
    /**
     * @param {Object} options
     * @param {CustomClient} options.client - Le client
     * @param {CommandInteraction} options.interaction - L'interaction de commande
     */
    async run({interaction}) {
        const member = interaction.options.getMember('membre');
        const credits = interaction.options.getInteger('credits');

        if (!member) return error(interaction, "Je ne trouve pas ce membre sur le serveur.");
        if (member.bot) return error(interaction, "Vous ne pouvez pas envoyer des crédits à un bot.");
        if (credits < 0) return error(interaction, "Vous ne pouvez pas envoyer des crédits négatifs à un membre.");

        let sender = (await findOrCreateMember(interaction.member)).member;
        if (sender.credits<credits) return error(interaction, "Vous n'avez pas assez de crédits.");
        let receiver = (await findOrCreateMember(member, interaction.guild.id)).member;
        

        sender.credits = sender.credits-credits;
        receiver.credits = receiver.credits+credits;

        await sender.save();
        await receiver.save();

        success(interaction, `${interaction.user.toString()} a envoyé \`${credits}\` crédits à ${member.toString()}.`);
    },
};
