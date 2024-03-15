#!/bin/bash

# Exécuter git pull
git pull

# Relancer le processus 
pm2 reload "devos-bot" --force