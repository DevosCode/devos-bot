const { Collection, Interaction } = require('discord.js');

/**
 * @param { string } arg
 * @param { object } param1
 * @param { ?boolean } [param1.replied]
 */
Interaction.prototype.success = async function(args, { replied = true, ephemeral = false } = {}) {
  const message = {
    embeds: [{
      color: this.client.config.colors.green,
      title: 'Succès',
      description: `${this.client.config.emojis.success} \`-\` ${args}`,
      footer: { icon_url: this.client.user.displayAvatarURL(), text: this.client.config.footer }
    }],
    ephemeral
  };

  if (replied === true) {
    return this.reply(message);
  } else {
    return this.channel.send(message);
  }
};

/**
 * @param { string } arg
 * @param { object } param1
 * @param { ?boolean } [param1.replied]
 */
Interaction.prototype.error = async function(args, { replied = true, ephemeral = false } = {}) {
  const message = {
    embeds: [{
      color: this.client.config.colors.red,
      title: 'Erreur',
      description: `${this.client.config.emojis.error} \`-\` ${args}`,
      footer: { icon_url: this.client.user.displayAvatarURL(), text: this.client.config.footer }
    }],
    ephemeral
  };

  if (replied === true) {
    return this.reply(message);
  } else {
    return this.channel.send(message);
  }
};

Interaction.prototype.findMember = async function(arg, { allowAuthor = false, random = false } = {}) {
  if (!this.guild) return null;

  if (random === true && arg && arg.toLowerCase() == 'random') return this.guild.members.cache.random();

  const mention = this.mentions.members.first();
  if (mention && (allowAuthor === false ? mention.id !== this.author.id : true)) return mention;
  if (!arg && allowAuthor == true) return this.member;
  if (!arg) return null;

  let member = this.guild.members.cache.get(arg.replace(/\D+/g, '')) || this.guild.members.cache.find(m => m.user.username.toLowerCase().includes(arg) || m.user.tag.toLowerCase().includes(arg.toLowerCase()) || m.displayName.toLowerCase().includes(arg.toLowerCase())) || await this.guild.members.fetch(arg.replace(/\D+/g, '')).catch(() => null);
  if (member instanceof Collection) {
    member = member.get(arg.replace(/\D+/g, '')) || member.find(m => m.user.username.toLowerCase().includes(arg.toLowerCase()) || m.user.tag.toLowerCase().includes(arg.toLowerCase()) || m.displayName.toLowerCase().includes(arg.toLowerCase()));
    if (member && (allowAuthor === false ? member.id !== this.author.id : true)) return member;
    return null;
  } else {
    if (member && (allowAuthor === false ? member.id !== this.author.id : true)) return member;
  }

  return null;
};

/**
 * @param { string } arg
 * @param { object } param1
 * @param { boolean } [param1.allowEveryone]
 */
Interaction.prototype.findRole = async function(arg, { allowEveryone = false } = {}) {
  if (!this.guild) return null;

  const mention = this.mentions.roles.first();
  if (this.guild.roles.cache.get(mention?.id)) return mention;
  if (!arg && allowEveryone === false) return null;
  if (allowEveryone === true && ['@everyone', '@@everyone', this.guild.id].includes(arg)) return this.guild.roles.everyone;
  if (allowEveryone === false && ['@everyone', '@@everyone', this.guild.id].includes(arg)) return null;
  if (!arg) return null;

  let role = this.guild.roles.cache.get(arg.replace(/\D+/g, '')) || this.guild.roles.cache.find(r => r.name.toLowerCase().includes(arg.toLowerCase())) || await this.guild.roles.fetch(arg.replace(/\D+/g, '')).catch(() => null);
  if (role instanceof Collection) {
    role = role.get(arg.replace(/\D+/g, '')) || role.find(r => r.name.toLowerCase().includes(arg.toLowerCase()));
    if (role) return role;
  } else {
    if (role) return role;
  }

  return null;
};

/**
 * @param { string } arg
 */
Interaction.prototype.findChannel = async function(arg) {
  if (!this.guild) return null;

  const mention = this.mentions.channels.first();
  if (this.guild.channels.cache.get(mention?.id)) return mention;
  if (!arg) return null;
  let channel = this.guild.channels.cache.get(arg.replace(/\D+/g, '')) || this.guild.channels.cache.find(c => c.name.toLowerCase().includes(arg.toLowerCase())) || await this.guild.channels.fetch(arg.replace(/\D+/g, '')).catch(() => null);
  if (channel instanceof Collection) {
    channel = channel.get(arg.replace(/\D+/g, '')) || channel.find(c => c.name.toLowerCase().includes(arg.toLowerCase()));
    if (channel) return channel;
  } else {
    if (channel) return channel;
  }

  return null;
};