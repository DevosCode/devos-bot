-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : mar. 20 juin 2023 à 15:47
-- Version du serveur : 8.0.33
-- Version de PHP : 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `devos_bot`
--

-- --------------------------------------------------------

--
-- Structure de la table `ColorRoles`
--

CREATE TABLE `ColorRoles` (
  `id` int NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `roleId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `guildId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prix` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ColorRoles`
--

INSERT INTO `ColorRoles` (`id`, `label`, `value`, `roleId`, `guildId`, `prix`, `createdAt`, `updatedAt`) VALUES
(3, 'Noir', '⚫', '1013400169431171092', '759432409400999967', 10, '2023-06-16 23:43:04', '2023-06-16 23:43:04'),
(4, 'Blanc', '⚪', '1013400161151615058', '759432409400999967', 10, '2023-06-16 23:43:04', '2023-06-16 23:43:04'),
(5, 'Marron', '🟤', '1013399017067130990', '759432409400999967', 10, '2023-06-16 23:55:39', '2023-06-16 23:55:39'),
(6, 'Rose', '🦩', '1062819693955657799', '759432409400999967', 10, '2023-06-16 23:55:39', '2023-06-16 23:55:39'),
(7, 'Rouge', '🔴', '980847943399637014', '759432409400999967', 10, '2023-06-16 23:59:01', '2023-06-16 23:59:01'),
(8, 'Orange', '🟠', '980847900286386218', '759432409400999967', 10, '2023-06-16 23:59:01', '2023-06-16 23:59:01'),
(9, 'Jaune', '🟡', '980847843692666948', '759432409400999967', 10, '2023-06-17 00:00:10', '2023-06-17 00:00:10'),
(10, 'Vert', '🟢', '980847789871366184', '759432409400999967', 10, '2023-06-17 00:00:10', '2023-06-17 00:00:10'),
(11, 'Bleu', '🔵', '980847678919442472', '759432409400999967', 10, '2023-06-17 00:01:03', '2023-06-17 00:01:03'),
(12, 'Violet', '🟣', '980847527471484979', '759432409400999967', 10, '2023-06-17 00:01:03', '2023-06-17 00:01:03');

-- --------------------------------------------------------

--
-- Structure de la table `ColorsInventories`
--

CREATE TABLE `ColorsInventories` (
  `id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `memberId` int DEFAULT NULL,
  `colorRoleId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ColorsInventories`
--

INSERT INTO `ColorsInventories` (`id`, `createdAt`, `updatedAt`, `memberId`, `colorRoleId`) VALUES
(1, '2023-06-16 23:54:19', '2023-06-16 23:54:19', 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `GuildSettings`
--

CREATE TABLE `GuildSettings` (
  `id` int NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `guildId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `GuildSettings`
--

INSERT INTO `GuildSettings` (`id`, `label`, `guildId`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'WELCOME_ROLES', '759432409400999967', '759433065457123328', '2023-06-16 23:25:44', '2023-06-16 23:25:44'),
(2, 'WELCOME_ROLES', '759432409400999967', '759701287255932938', '2023-06-16 23:26:04', '2023-06-16 23:26:04'),
(3, 'WELCOME_ROLES', '759432409400999967', '1082558409112551464', '2023-06-16 23:26:16', '2023-06-16 23:26:16'),
(4, 'WELCOME_ROLES', '759432409400999967', '930136305306832957', '2023-06-16 23:26:24', '2023-06-16 23:26:24'),
(5, 'WELCOME_ROLES', '759432409400999967', '1009589010668195900', '2023-06-16 23:26:37', '2023-06-16 23:26:37'),
(6, 'WELCOME_ROLES', '759432409400999967', '1009552404875858062', '2023-06-16 23:26:52', '2023-06-16 23:26:52'),
(7, 'TICKET_BTN_CHANNEL', '759432409400999967', '1009575652271341679', '2023-06-16 23:28:09', '2023-06-16 23:28:09'),
(8, 'TICKET_CATEGORY', '759432409400999967', '1009575458662260787', '2023-06-16 23:28:31', '2023-06-16 23:28:31'),
(9, 'TICKET_ROLES', '759432409400999967', '1009559533825294576', '2023-06-16 23:29:57', '2023-06-16 23:29:57'),
(10, 'STATS_ALL_CHANNEL', '759432409400999967', '1009574786306945065', '2023-06-16 23:32:15', '2023-06-16 23:32:15'),
(11, 'STATS_MEMBERS_CHANNEL', '759432409400999967', '1009574928548384799', '2023-06-16 23:32:25', '2023-06-16 23:32:25'),
(12, 'STATS_BOTS_CHANNEL', '759432409400999967', '1009575126783762542', '2023-06-16 23:32:54', '2023-06-16 23:32:54'),
(13, 'GENERAL_CHANNEL', '759432409400999967', '1009536884361416795', '2023-06-16 23:33:14', '2023-06-16 23:33:14');

-- --------------------------------------------------------

--
-- Structure de la table `Items`
--

CREATE TABLE `Items` (
  `id` int NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `guildId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prix` int NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Items`
--

INSERT INTO `Items` (`id`, `label`, `guildId`, `prix`, `value`, `description`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Rôle de pub', '759432409400999967', 30, '-1', 'Permet de faire la pub que vous voulez dans le salon <#947985768142503987> toutes les 6 heures.', 'ROLE', '2023-06-17 00:03:16', '2023-06-17 00:03:16'),
(2, 'Changement de pseudo', '759432409400999967', 20, '1010702719834664980', 'Permet d\'avoir la permission de changer votre pseudo sur le serveur.', 'ROLE', '2023-06-17 00:03:16', '2023-06-17 00:03:16');

-- --------------------------------------------------------

--
-- Structure de la table `ItemsInventories`
--

CREATE TABLE `ItemsInventories` (
  `id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemId` int DEFAULT NULL,
  `memberId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Members`
--

CREATE TABLE `Members` (
  `id` int NOT NULL,
  `member_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `guildId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `credits` int NOT NULL,
  `experience` int NOT NULL,
  `level` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Members`
--

INSERT INTO `Members` (`id`, `member_id`, `guildId`, `credits`, `experience`, `level`, `createdAt`, `updatedAt`) VALUES
(1, '756769945819545672', '1095005516050223278', 0, 0, 1, '2023-06-19 22:24:55', '2023-06-19 22:24:55'),
(2, '370664468478427136', '1095005516050223278', 0, 0, 1, '2023-06-19 22:25:04', '2023-06-19 22:25:04'),
(3, '492053539292708865', '1095005516050223278', 15, 0, 1, '2023-06-19 22:33:55', '2023-06-19 22:33:55');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ColorRoles`
--
ALTER TABLE `ColorRoles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ColorsInventories`
--
ALTER TABLE `ColorsInventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `colorRoleId` (`colorRoleId`);

--
-- Index pour la table `GuildSettings`
--
ALTER TABLE `GuildSettings`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ItemsInventories`
--
ALTER TABLE `ItemsInventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemId` (`itemId`),
  ADD KEY `memberId` (`memberId`);

--
-- Index pour la table `Members`
--
ALTER TABLE `Members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ColorRoles`
--
ALTER TABLE `ColorRoles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `ColorsInventories`
--
ALTER TABLE `ColorsInventories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `GuildSettings`
--
ALTER TABLE `GuildSettings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `Items`
--
ALTER TABLE `Items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `ItemsInventories`
--
ALTER TABLE `ItemsInventories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Members`
--
ALTER TABLE `Members`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ColorsInventories`
--
ALTER TABLE `ColorsInventories`
  ADD CONSTRAINT `ColorsInventories_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `Members` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ColorsInventories_ibfk_2` FOREIGN KEY (`colorRoleId`) REFERENCES `ColorRoles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `ItemsInventories`
--
ALTER TABLE `ItemsInventories`
  ADD CONSTRAINT `ItemsInventories_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ItemsInventories_ibfk_2` FOREIGN KEY (`memberId`) REFERENCES `Members` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
