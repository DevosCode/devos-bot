#!/bin/bash

# Exécuter git pull
git pull

# Exécuter pm2 list
pm2 delete "devos-bot"

# Sauvegarder la configuration PM2
pm2 save --force

# Démarrer le processus "devos-bot" avec PM2
pm2 start index.js --name "devos-bot"

# Sauvegarder la configuration PM2
pm2 save --force
