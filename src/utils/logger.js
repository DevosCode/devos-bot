
const winston = require('winston');
const clc = require('cli-color');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      let logColor;
      let botName = clc.magenta("[DEVOS-BOT]");

      // Définir la couleur en fonction du niveau de log
      switch (level) {
        case 'info':
          logColor = clc.green;
          break;
        case 'warn':
          logColor = clc.yellow;
          break;
        case 'error':
          logColor = clc.red;
          break;
        default:
          logColor = clc.white;
      }

      // Formater le message avec la couleur appropriée
      const formattedMessage = logColor(message);

      return `${botName} - ${timestamp} ${level}: ${formattedMessage}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = {logger};