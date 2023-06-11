const { db } = require('../models');
const { logger } = require('../../logger');

const formatGuildSettingsResponse = (settings) => {
    const formattedResponse = {};

    settings.forEach((setting) => {
        formattedResponse[setting.label] = setting.value;
    });

    return formattedResponse;
};

/**
     * Reccupere la valeur de la clé grace à l'id de guild 
     * @param string key 
     * @param string guildId 
     * @returns 
     */
const getSetting = async (key, guildId) => {
    let setting;
    try {
        if (guildId) {
            setting = await db.GuildSettings.findOne({ where: { id: member.id, guildId: guildId } });
        }
    } catch (error) {
        logger.error(`Erreur lors de la la recherche de la key:: ${key}, guild id: ${guildId}, erreur: ${error}`);
    }
    return setting;
}

/**
 * Ajoute une clé de guild en utilisant 
 * @param {*} key la clé
 * @param {*} value la valeur
 * @param {*} guildId  l'id de guild
 * @returns 
 */
const addGuildSetting = async (key, value, guildId) => {
    let setting;
    try {
        setting = await db.GuildSettings.create({
            label: key,
            guildId: guildId,
            value: value
        });
        await setting.save();
    } catch (error) {
        logger.error(`Erreur lors de l\'ajout du paramètre de configuration de la key: ${key}, value: ${value}, guild id: ${guildId}, erreur: ${error}`);
    }
    return setting;
}

/**
 * Edite une valeur de parametre en utilisant la clé et l'id de guild, si elle n'existe pas elle est crée
 * @param {*} key la clé de parametre
 * @param {*} value la nouvelle valeur
 * @param {*} guildId l'id de guild
 * @returns 
 */
const editGuildSetting = async (key, value, guildId) => {
    let setting;
    try {
        setting = await db.GuildSettings.findOne({ where: { label: key, guildId: guildId } });
        if (setting) {
            setting.value = value;
            await setting.save();
        } else {
            setting = await addGuildSetting(key, value, guildId)
        }
    } catch (error) {
        logger.error(`Erreur lors de l\'edition du paramètre de configuration de la key: ${key}, value: ${value}, guild id: ${guildId}, erreur: ${error}`);
    }
    return setting;
}
/**
 * Reccupere d'un coup tous les parametres d'un serveur grace à l'id de serveur
 * @param {*} guildId l'id de serveur
 * @returns 
 */
const getGuildSettingsByGuildId = async (guildId) => {
    try {
        const settings = await db.GuildSettings.findAll({
            where: {
                guildId: guildId
            }
        }); 
        return formatGuildSettingsResponse(settings);
    } catch (error) {
        logger.error(`Erreur lors de la récupération des paramètres de configuration pour guild id: ${guildId}, erreur: ${error}`);
        return null;
    }
};

module.exports = {
    getSetting,
    addGuildSetting,
    editGuildSetting,
    getGuildSettingsByGuildId
}