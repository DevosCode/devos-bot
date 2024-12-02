# Devos Bot

Le code source du bot discord du serveur discord [Devos Code](https://discord.gg/devos-code-759432409400999967).

## Devcontainer

Ce projet dispose d'une configuration pour l'ouvrir dans un [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers).

note : `remoteUser` est set en tant que root pour que cela fonctionne avec podman sur linux. C'est la solution la plus simple.

## docker
Ce projet dispose d'une configuration docker, avec node, mysql et phpmyadmin.
- `docker-compose build`
- `docker-compose up -d `
- `docker exec -it devos-bot /bin/sh `
- `npm install`
- `node index.js`

phpmyadmin est disponnible sur [http://localhost:8081/](http://localhost:8081/)
- serveur : db
- user : root
- password : root

## Todo List

  - [ ] Faire la base du code
  - [ ] Script deploiement commandes
  - [ ] Handler commandes
  - [ ] Handler events
  - [ ] Handler components (?)