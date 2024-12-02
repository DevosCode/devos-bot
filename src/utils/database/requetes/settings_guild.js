const { db } = require('../models');
const { logger } = require('../../logger');

/**
 * Supprime un parametre de guild en utilisant la valeur, la clé et l'id de guild
 * @param string key 
 * @param string role_id 
 * @param string guildId 
 * @returns 
 */
const deleteGuildSettingByKeyValueGuildId= async (key, role_id, guildId) => {
    try {
        const setting = await db.GuildSettings.findOne({
            where: { label: key, value : role_id, guildId: guildId }
        });
        if (setting) await setting.destroy();
        // meme si la cle nexister pas on considere l'operation reussi
        return true; // Suppression réussie
    } catch (err) {
        logger.error(`Erreur lors de la suppression du paramètre de configuration de label: ${key}, guild id: ${guildId}, erreur: ${err}`);
        return false; // Erreur lors de la suppression
    }
}


/**
 * Permet de reccuperer un groupe de parametre enregistrer sous la meme cle
 * @param string guildId l'id de serveur
 * @param string key la cle a rechercher, comme AUTO_ROLE, WELCOME_ROLE, TICKET_ROLE
 * @returns 
 */
const getSettingGroup = async (guildId, key) => {
    try {
        const settings = await db.GuildSettings.findAll({
            where: {
                guildId: guildId,
                label: key
            }
        });
        const formattedResponse = [];
        settings.forEach((setting) => {
            formattedResponse.push(setting.value);
        });
        return formattedResponse;
    } catch (err) {
        logger.error(`Erreur durant l'utilsiation de getSettingGroup id: ${guildId}, key: ${key}, erreur: ${err}`);
        return [];
    }
};

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
            setting = await db.GuildSettings.findOne({ where: {label: key , guildId: guildId } });
        }
    } catch (err) {
        logger.error(`Erreur lors de la la recherche de la key: ${key}, guild id: ${guildId}, erreur: ${err}`);
    }
    return setting;
}

/**
 * Ajoute une clé de guild en utilisant 
 * @param string key la clé
 * @param string value la valeur
 * @param string guildId  l'id de guild
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
    } catch (err) {
        logger.error(`Erreur lors de l\'ajout du paramètre de configuration de la key: ${key}, value: ${value}, guild id: ${guildId}, erreur: ${err}`);
    }
    return setting;
}

/**
 * Edite une valeur de parametre en utilisant la clé et l'id de guild, si elle n'existe pas elle est crée
 * @param string key la clé de parametre
 * @param string value la nouvelle valeur
 * @param string guildId l'id de guild
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
    } catch (err) {
        logger.error(`Erreur lors de l\'edition du paramètre de configuration de la key: ${key}, value: ${value}, guild id: ${guildId}, erreur: ${err}`);
    }
    return setting;
}
/**
 * Reccupere d'un coup tous les parametres d'un serveur grace à l'id de serveur
 * @param string guildId l'id de serveur
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
    } catch (err) {
        logger.error(`Erreur lors de la récupération des paramètres de configuration pour guild id: ${guildId}, erreur: ${err}`);
        return null;
    }
};

module.exports = {
    getSetting,
    addGuildSetting,
    editGuildSetting,
    getGuildSettingsByGuildId,
    getSettingGroup,
    deleteGuildSettingByKeyValueGuildId
}