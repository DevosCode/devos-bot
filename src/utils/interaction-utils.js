const { Collection, EmbedBuilder } = require('discord.js');
module.exports = {
    success : async function (interaction, args, { replied = true, ephemeral = false , editReply = false} = {}) {
        const message = {
            embeds: [new EmbedBuilder()
            .setColor(interaction.client.config.colors.green)
            .setTitle('Succès')
            .setDescription(`${interaction.client.config.emojis.success} \`-\` ${args}`)
            .setFooter({ iconURL: interaction.client.user.displayAvatarURL(), text: interaction.client.config.footer })],
            ephemeral
        };

        if (replied === true) {
            return interaction.reply(message);
        }
        else if (editReply === true) {
            return interaction.editReply(message);
        } else {
            return interaction.channel.send(message);
        }
    },
    error : async function (interaction, args, { replied = true, ephemeral = false } = {}) {
        const message = {
            embeds:  [new EmbedBuilder()
            .setColor(interaction.client.config.colors.red)
            .setTitle('Erreur')
            .setDescription(`${interaction.client.config.emojis.error} \`-\` ${args}`)
            .setFooter({ iconURL: interaction.client.user.displayAvatarURL(), text: interaction.client.config.footer })],
            ephemeral
        };

        if (replied === true) {
            return interaction.reply(message);
        } else {
            return interaction.channel.send(message);
        }
    },

    findMember : async function (interaction, arg, { allowAuthor = false, random = false } = {}) {
        if (!interaction.guild) return null;

        if (random === true && arg && arg.toLowerCase() == 'random') return interaction.guild.members.cache.random();

        const mention = interaction.mentions.members.first();
        if (mention && (allowAuthor === false ? mention.id !== interaction.author.id : true)) return mention;
        if (!arg && allowAuthor == true) return interaction.member;
        if (!arg) return null;

        let member = interaction.guild.members.cache.get(arg.replace(/\D+/g, '')) || interaction.guild.members.cache.find(m => m.user.username.toLowerCase().includes(arg) || m.user.tag.toLowerCase().includes(arg.toLowerCase()) || m.displayName.toLowerCase().includes(arg.toLowerCase())) || await interaction.guild.members.fetch(arg.replace(/\D+/g, '')).catch(() => null);
        if (member instanceof Collection) {
            member = member.get(arg.replace(/\D+/g, '')) || member.find(m => m.user.username.toLowerCase().includes(arg.toLowerCase()) || m.user.tag.toLowerCase().includes(arg.toLowerCase()) || m.displayName.toLowerCase().includes(arg.toLowerCase()));
            if (member && (allowAuthor === false ? member.id !== interaction.author.id : true)) return member;
            return null;
        } else {
            if (member && (allowAuthor === false ? member.id !== interaction.author.id : true)) return member;
        }

        return null;
    },
    findRole : async function (interaction, arg, { allowEveryone = false } = {}) {
        if (!interaction.guild) return null;

        const mention = interaction.mentions.roles.first();
        if (interaction.guild.roles.cache.get(mention?.id)) return mention;
        if (!arg && allowEveryone === false) return null;
        if (allowEveryone === true && ['@everyone', '@@everyone', interaction.guild.id].includes(arg)) return interaction.guild.roles.everyone;
        if (allowEveryone === false && ['@everyone', '@@everyone', interaction.guild.id].includes(arg)) return null;
        if (!arg) return null;

        let role = interaction.guild.roles.cache.get(arg.replace(/\D+/g, '')) || interaction.guild.roles.cache.find(r => r.name.toLowerCase().includes(arg.toLowerCase())) || await interaction.guild.roles.fetch(arg.replace(/\D+/g, '')).catch(() => null);
        if (role instanceof Collection) {
            role = role.get(arg.replace(/\D+/g, '')) || role.find(r => r.name.toLowerCase().includes(arg.toLowerCase()));
            if (role) return role;
        } else {
            if (role) return role;
        }

        return null;
    },
    findChannel : async function (arg) {
        if (!interaction.guild) return null;

        const mention = interaction.mentions.channels.first();
        if (interaction.guild.channels.cache.get(mention?.id)) return mention;
        if (!arg) return null;
        let channel = interaction.guild.channels.cache.get(arg.replace(/\D+/g, '')) || interaction.guild.channels.cache.find(c => c.name.toLowerCase().includes(arg.toLowerCase())) || await interaction.guild.channels.fetch(arg.replace(/\D+/g, '')).catch(() => null);
        if (channel instanceof Collection) {
            channel = channel.get(arg.replace(/\D+/g, '')) || channel.find(c => c.name.toLowerCase().includes(arg.toLowerCase()));
            if (channel) return channel;
        } else {
            if (channel) return channel;
        }

        return null;
    }
}