const { Client, GatewayIntentBits } = require('discord.js');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const { sequelize } = require('./../utils/database/models/index.js');
const { logger } = require("./../utils/logger");

class CustomClient extends Client {
  constructor(options) {
    super({
      allowedMentions: { parse: ['users'], repliedUser: true },
      partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'GUILD_VOICE_STATES'],
      // intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING]
      intents: 3276799 // all intents     
    });

    this.sequelize = sequelize;
    this.commands = {};
    this.buttons = {};
    this.selectmenus = {};
    this.slashs = [];
    this.config = options.config;
    this.log = logger;
  }

  login(token) {
    super.login(token);

    return this;
  }

  runDatabase() {
    this.log.info("Lancement de la base de donnée... ... ...");
    (async () => {
      try {
        await sequelize.authenticate();
        this.log.info('Connection réalisé avec succes.');
      } catch (error) {
        this.log.error('Impossible de se connecter à la base de donnée.', error);
      }
      try {
        await sequelize.sync();
        this.log.info("La base de donnée à été synchronisé.")
      } catch (error) {
        this.log.error('Impossible de synchronisé la base de donnée.', error);
      }
    })();
  }
  loadCommands() {
    const commandsDir = join(__dirname, '../commands');
    readdirSync(commandsDir, { withFileTypes: true }).forEach(category => {
      if (category.isDirectory()) {
        const categoryDir = join(commandsDir, category.name);
        readdirSync(categoryDir).forEach(file => {
          if (lstatSync(join(categoryDir, file)).isFile() && file.endsWith('.js')) {
            const command = require(join(categoryDir, file));
            const commandName = file.split('.')[0];
            this.slashs.push(command.data.toJSON());
            this.commands[commandName] = Object.assign(command, { category: category.name, name: commandName });
          }
        });
      }
    });

    this.log.info("Fin du chargement de toutes les commandes.");
    return this;
  }
  loadEvents() {
    const eventsDir = join(__dirname, '../events');
    readdirSync(eventsDir, { withFileTypes: true }).forEach(category => {
      if (category.isDirectory()) {
        const categoryDir = join(eventsDir, category.name);
        readdirSync(categoryDir).forEach(file => {
          const event = require(join(categoryDir, file));
          const eventName = file.split('.')[0];
          super.on(eventName, (...args) => event(this, ...args));
        });
      }
    });

    this.log.info("Fin du chargement de toutes les events.");
    return 1;
  }

  // loadButtons() {
  //   readdirSync('./buttons').forEach(file => {
  //     const button = new (require(`../buttons/${file}`))(this);
  //     this.buttons[button.name] = button;
  //   });

  //   return 1;
  // }

  // loadSelectMenus() {
  //   readdirSync('./selectmenus').forEach(file => {
  //     const selectmenu = require(`../selectmenus/${file}`);
  //     const selectmenuName = file.split('.')[0];
  //     this.selectmenus[selectmenuName] = Object.assign(selectmenu, { name: selectmenuName });
  //   });
  //   return 1;
  // }
}

module.exports = CustomClient;