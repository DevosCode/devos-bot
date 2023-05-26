const { Client, Intents } = require('discord.js');
const { lstatSync, readdirSync } = require('fs');
const pool = require('../database/connection');

class CustomClient extends Client {
  constructor(options) {
    super({
      allowedMentions: { parse: ['users'], repliedUser: true },
      partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'GUILD_VOICE_STATES'],
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING]
    });

    this.pool = pool;
    console.log('[PostgreSQL]: I\'m connected.')
    this.commands = {};
    this.buttons = {};
    this.selectmenus = {};
    this.slashs = [];
    this.config = options.config;
  }

  login(token) {
    super.login(token);

    return this;
  }

  loadCommands() {
    readdirSync('./commands').forEach(category => readdirSync(`./commands/${category}`).filter(file => lstatSync('./commands/' + category + '/' + file).isFile() && file.endsWith('.js')).forEach(file => {
      const command = require(`../commands/${category}/${file}`);
      const commandName = file.split('.')[0];

      if (command.type == 'CHAT_INPUT') {
        this.slashs.push({
          name: commandName,
          description: command.description,
          options: command.options,
          permissions: command.permissions || [],
          defaultPermssion: command.permissions ? false : true,
          type: command.type
        });
      } else {
        this.slashs.push({ name: commandName, type: command.type });
      }
      this.commands[commandName] = Object.assign(command, { category: category, name: commandName });
    }));

    return this;
  }

  loadEvents() {
    readdirSync('./events').forEach(category => {
      readdirSync(`./events/${category}`).forEach(file => {
        const event = require(`../events/${category}/${file}`)

        super.on(file.split('.')[0], (...args) => event(this, ...args));
      });
    });

    return 1;
  }

  // loadButtons() {
  //   readdirSync('./buttons').forEach(file => {
  //     const button = new (require(`../buttons/${file}`))(this);
  //     this.buttons[button.name] = button;
  //   });

  //   return 1;
  // }

  loadSelectMenus() {
    readdirSync('./selectmenus').forEach(file => {
      const selectmenu = require(`../selectmenus/${file}`);
      const selectmenuName = file.split('.')[0];
      this.selectmenus[selectmenuName] = Object.assign(selectmenu, { name: selectmenuName });
    });

    return 1;
  }
}

module.exports = CustomClient;