-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mer. 27 nov. 2019 à 09:47
-- Version du serveur :  8.0.13-4
-- Version de PHP :  7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `wjJ627V9qY`
--

-- --------------------------------------------------------

--
-- Structure de la table `assigned_task`
--

CREATE TABLE `assigned_task` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `assigned_task`
--

INSERT INTO `assigned_task` (`id`, `task_id`, `username`) VALUES
(7, 1, 'user1'),
(16, 15, 'user1'),
(17, 16, 'user1'),
(18, 16, 'User5'),
(19, 17, 'user1'),
(20, 17, 'User6'),
(21, 18, 'user1'),
(22, 18, 'User6'),
(28, 22, 'UserRayan'),
(41, 28, 'user1'),
(42, 28, 'jimmy'),
(50, 40, 'user1'),
(80, 52, 'coucou'),
(83, 24, 'user1'),
(84, 51, 'coucou'),
(110, 60, 'coucou'),
(111, 62, 'coucou'),
(112, 59, 'User6'),
(113, 57, 'User6'),
(114, 57, 'User5'),
(115, 57, 'User5');

-- --------------------------------------------------------

--
-- Structure de la table `documentation_of_release`
--

CREATE TABLE `documentation_of_release` (
  `id` int(11) NOT NULL,
  `url` text COLLATE utf8_unicode_ci NOT NULL,
  `release_id` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `documentation_of_release`
--

INSERT INTO `documentation_of_release` (`id`, `url`, `release_id`) VALUES
(1, 'https://www.pokebip.com/index.php?phppage=membres/index', '21706864'),
(2, 'https://www.pokebip.com/', '21773215');

-- --------------------------------------------------------

--
-- Structure de la table `issue`
--

CREATE TABLE `issue` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `priority` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `difficulty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `issue`
--

INSERT INTO `issue` (`id`, `project_id`, `name`, `description`, `priority`, `difficulty`) VALUES
(3, 2, 'New Issue 1', 'Descfgsdfh', 'MEDIUM', 1),
(4, 2, 'Issue numéro 2', 'Cette description concerne lissue 2', 'Medium', 7),
(11, 8, 'Issue NOW', 'DESCRIPTION', 'HIGH', 16),
(113, 121, 'jimissue1', 'sltmdr', 'haute', 5),
(114, 121, 'jimissue2', 'mdrslt', 'basse', 7),
(121, 3, 'Issue', 'frfr', 'LOW', 10),
(122, 3, 'Une autre issue', 'LALALALALALLAA', 'LOW', 5),
(125, 3, 'Issue Encore meilleure', 'LALALALALALLAA', 'MEDIUM', 10),
(126, 3, 'frf', 'Une bonne description', 'LOW', 2),
(127, 110, 'jkbhjv2', 'nghfb', 'fdsfsd', 1),
(135, 110, 'gbdvfc', 'vfsd', 'HIGH', 1),
(138, 123, '', 'Test3', 'LOW', 6),
(141, 123, 'No description', '', '', 1),
(144, 123, '', '', '', 1),
(145, 123, 'I2', 'Bonjour', 'HIGH', -567868),
(147, 123, 'Strange description', 'nfioezhfez#mofjoierjf56853258fnlekzjfgzuhfnfe4r6z4f5e64f8zr4fsz4fznjzehuifeè_-{}[]()%BGFHMOOYbffhbikuyjhrteftu4j56tyhfbg489y6t5', 'LOW', 5),
(148, 123, '.', 'Strang name3', 'LOW', -4),
(149, 123, 'BONih1687/*/*-*6+5+86+202+nlvf;?p^poizfdsk', 'Strang name3', 'LOW', -4),
(150, 123, '123456779952599562', 'Many numbers', 'medium', -10),
(151, 123, 'abcdefghijklmnopqrstuvwxyzABCDJPÖHUJH', 'hyjutrz', 'medium', -24),
(152, 123, '{(]-_|}[)', '{(]-_|}[)', '{(]-_|}[)', 9),
(153, 3, 'rdfrdf', 'Hola', 'HIGH', 10),
(157, 8, 'I1', 'Test', 'LOW', 1),
(158, 8, 'I2', 'Test2', 'HIGH', 0),
(159, 8, 'I3', 'Test3', 'MEDIUM', 6),
(162, 110, 'Test', 'As... I want to... In order to...', 'LOW', 1);

-- --------------------------------------------------------

--
-- Structure de la table `issue_of_sprint`
--

CREATE TABLE `issue_of_sprint` (
  `id` int(11) NOT NULL,
  `sprint_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `issue_of_sprint`
--

INSERT INTO `issue_of_sprint` (`id`, `sprint_id`, `issue_id`) VALUES
(9, 5, 121),
(10, 5, 125),
(21, 4, 121),
(22, 4, 122),
(42, 7, 125),
(44, 9, 127),
(45, 9, 135),
(46, 10, 127),
(47, 10, 135),
(48, 11, 127),
(49, 11, 135),
(50, 8, 121),
(51, 8, 122),
(52, 8, 125),
(53, 8, 126);

-- --------------------------------------------------------

--
-- Structure de la table `issue_of_task`
--

CREATE TABLE `issue_of_task` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `issue_of_task`
--

INSERT INTO `issue_of_task` (`id`, `task_id`, `issue_id`) VALUES
(16, 28, 3),
(17, 28, 4),
(27, 38, 4),
(28, 40, 4),
(56, 24, 3),
(57, 51, 127),
(58, 51, 135),
(121, 62, 127),
(122, 62, 135),
(123, 59, 125),
(124, 59, 126),
(125, 59, 153),
(126, 57, 122),
(127, 57, 125);

-- --------------------------------------------------------

--
-- Structure de la table `issue_of_test`
--

CREATE TABLE `issue_of_test` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `issue_of_test`
--

INSERT INTO `issue_of_test` (`id`, `test_id`, `issue_id`) VALUES
(1, 4, 127),
(2, 4, 135),
(16, 11, 125),
(21, 9, 127),
(22, 9, 135),
(35, 16, 121),
(39, 17, 121),
(40, 17, 122),
(41, 17, 125),
(52, 20, 121),
(53, 20, 125),
(54, 20, 126),
(55, 20, 153);

-- --------------------------------------------------------

--
-- Structure de la table `member`
--

CREATE TABLE `member` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `member`
--

INSERT INTO `member` (`username`, `password`) VALUES
('coucou', '$2b$10$120fjer9PfOwGpHmudmQcO3Ft4YX2wESW8TgngqYAkoPGVffGVKC.'),
('jimmy', '$2b$10$p8OsfzHkHGf4kVPmRkK0gu8uZy6/Vq6Sh3kl0am34.kKb7/td2C3K'),
('rrkheloufi', '$2b$10$QhSzgNabyZPlxioiycBl5.43l.uK5wZhUve4/rASVM/M4JzV7QCmi'),
('test', '$2b$10$OFMe/yCtZHvb4PcA6yWUNOAe7Hwa2ZNFY6k9P4IjqIFl4x1/JK1IS'),
('user1', '$2b$10$YSA8Z/4yvUI58MM80wbU3uGmMejb8EEuuPt2gEud93amm8aExgEaa'),
('User10', '$2b$10$hCQqw.wxP33N2StFY9UgwOrBf.OEwG20UYwWo2FY0pUL8sulvkCVG'),
('user2', '$2b$10$SaRf1q7m9zN2I3lZtVdtLeEiddxSlMdQDisOOf58kXgm2hn3enyzG'),
('User5', '$2b$10$BardKSXjstuk/TuFGRvVBeEiMk17aJNtkHCPwZEFdKLy9nLeEuqSq'),
('User6', '$2b$10$urCL1YLmmDdhaTyNcwGDhuYaCHqMqYTdMQopBJnZOaoaVyd8.O1Wq'),
('UserProf', '$2b$10$7g3GESm7KcDeIPGH0YSsTeXoQbObZADp8STAabwl2zD1g9EQax9du'),
('UserRayan', '$2b$10$rgFiR6z1Sedn2f90xIxrWOuZ1gk1oMFo85eEi8c3QITFkI6sLvvLm');

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `userGitHub` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `repositoryGitHub` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `userGitHub`, `repositoryGitHub`) VALUES
(2, 'Projet 1', 'Le projet est vraiment super', '', NULL),
(3, 'Projet 1', 'Le projet est vraiment super', 'elafosse', 'CDP_Tests'),
(8, 'Projet Fou', 'Une longue description', '', NULL),
(9, 'Projet Fou 2', 'Une longue description', '', NULL),
(110, 'Bonjour', 'bonjour', 'elafosse', 'CDP_Tests'),
(121, 'jimtest', 'Description test', '', NULL),
(123, 'ProjectTest', 'Project to test the appli', '', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `project_team`
--

CREATE TABLE `project_team` (
  `project_id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `project_team`
--

INSERT INTO `project_team` (`project_id`, `username`, `is_admin`) VALUES
(2, 'user1', 1),
(2, 'jimmy', 0),
(3, 'User5', 0),
(3, 'User6', 0),
(8, 'User5', 0),
(8, 'User5', 0),
(3, 'User5', 1),
(3, 'User5', 1),
(8, 'User5', 1),
(110, 'coucou', 1),
(121, 'jimmy', 0),
(121, 'jimmy', 1),
(8, 'jimmy', 0),
(123, 'User5', 0),
(123, 'coucou', 1);

-- --------------------------------------------------------

--
-- Structure de la table `sprint`
--

CREATE TABLE `sprint` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `objective` text COLLATE utf8_unicode_ci NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sprint`
--

INSERT INTO `sprint` (`id`, `project_id`, `objective`, `date_begin`, `date_end`) VALUES
(4, 3, 'Un objectif fort en couleur 2 ! Modifié art 2', '2019-11-01', '2019-03-20'),
(5, 3, 'azertyuiop', '2019-11-10', '2019-11-21'),
(7, 3, 'azertyuiopqsdfghjklm oula', '2019-09-05', '2020-01-10'),
(8, 3, 'Premier!!!', '2019-01-01', '2020-01-01'),
(9, 110, 'bonjour', '2019-11-26', '2019-11-29'),
(10, 110, 'gtdr', '2019-11-27', '2019-11-26'),
(11, 110, 'vfre', '2019-11-27', '2019-11-26');

-- --------------------------------------------------------

--
-- Structure de la table `sprint_of_release`
--

CREATE TABLE `sprint_of_release` (
  `id` int(11) NOT NULL,
  `sprint_id` int(11) NOT NULL,
  `release_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `realisation_time` int(11) NOT NULL,
  `description_of_done` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `task`
--

INSERT INTO `task` (`id`, `project_id`, `name`, `description`, `state`, `start_date`, `realisation_time`, `description_of_done`) VALUES
(1, 2, 'rayan', 'blabla', 'To Do', '2019-11-06', 5, 'To finish :\r\n- First\r\n- Second'),
(2, 2, 'Task1 New', 'Bliblibli', 'Done', '1997-02-02', 5, 'DoD new'),
(10, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(11, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(12, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(13, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(14, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(15, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(16, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(17, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(18, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(19, 8, 'Task Projet 8', 'Description', 'To Do', '2019-05-10', 5, 'Definition of done blabla'),
(22, 110, 'Update DataBase', 'add a new table for issues linked to task', 'Done', '2019-11-08', 1, 'An issue can be linked to a task'),
(24, 2, 'Test add tache finale', 'Description op', 'To Do', '2019-11-22', 15, 'Dod random'),
(28, 2, 'fgtdfhggggg', 'fdghdfgjhdg', 'Done', '2019-10-18', 15, 'dodododo'),
(29, 2, 'dfghdf', 'ghdfghdfgh', 'Done', '2019-11-03', 2, 'bk,l;'),
(30, 2, 'gdf', 'hjg', 'Doing', '2019-11-06', 10, 'ghjk'),
(31, 123, 'Task 1', 'Test task 1', 'To Do', '2019-11-17', 1, 'Test work'),
(38, 2, 'ghjkghkl', 'ljmk', 'undefined', '2019-11-19', 15, '1bnj;k,'),
(40, 2, 'hjklmlù', 'kmù*lmù*', 'Doing', '2019-11-28', 12, 'klmùjklmù'),
(51, 110, 'Test', 'Je teste un truc', 'To Do', '2019-11-22', 1, 'Je teste quelque chose'),
(52, 110, 'Testfsdh', 'Je teste quelque choseop;rdynf', 'To Do', '2019-10-15', 2, 'pojviojz,gvjg'),
(57, 3, 'Task 1', 'Helloooo', 'To Do', '2019-10-22', 3, 'Dod'),
(59, 3, 'Nouvelle tâche', 'une bonne description', 'Doing', '2019-10-22', 6, 'grosse dod'),
(60, 110, 'Test', 'Je teste un truc', 'To Do', '2019-11-21', 1, 'Je teste quelque chose'),
(61, 110, 'Test', 'Je teste quelque chose', 'Doing', '2019-11-08', 2, 'pojviojzfczfczq'),
(62, 110, 'Test3', 'J^jfipezjf', 'Done', '2019-11-08', 1, 'nyj,ukiulkuyhtgrsdvgnft');

-- --------------------------------------------------------

--
-- Structure de la table `task_checklist`
--

CREATE TABLE `task_checklist` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `is_done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `task_checklist`
--

INSERT INTO `task_checklist` (`id`, `task_id`, `description`, `is_done`) VALUES
(4, 19, 'OUOUOUO', 12);

-- --------------------------------------------------------

--
-- Structure de la table `task_dependencies`
--

CREATE TABLE `task_dependencies` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `depend_on_task_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `task_dependencies`
--

INSERT INTO `task_dependencies` (`id`, `task_id`, `depend_on_task_id`) VALUES
(10, 1, 1),
(19, 10, 2),
(20, 11, 2),
(21, 12, 2),
(22, 13, 2),
(23, 14, 2),
(24, 15, 2),
(25, 16, 2),
(26, 17, 2),
(27, 18, 2),
(28, 19, 2),
(37, 28, 1),
(38, 28, 2),
(47, 38, 2),
(50, 40, 2),
(88, 52, 22),
(89, 52, 51),
(90, 52, 52),
(96, 24, 1),
(97, 51, 2),
(98, 51, 2),
(111, 60, 2),
(112, 60, 2),
(113, 62, 22),
(114, 62, 51),
(115, 59, 57),
(116, 59, 59);

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `expected_result` text COLLATE utf8_unicode_ci NOT NULL,
  `last_version_validated` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `state` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`id`, `project_id`, `name`, `description`, `expected_result`, `last_version_validated`, `state`) VALUES
(4, 110, 't2', 'test 2', 're 2', 'v 0.0.1', 'passed'),
(9, 110, 'bonjour', 'fre', 'undefined', 'undefined', 'failed'),
(11, 3, 'gtgt', 'ggtgt', 'undefined', 'undefined', 'passed'),
(12, 110, 'Hello', 'ceci est un test', 'undefined', 'undefined', 'todo'),
(16, 3, 'gtgt', 'On teste la partie', 'le résultat expected est blablabla', 'v0.0.1', 'todo'),
(17, 3, 'Test 2', 'Uen deuxième description', 'Hola hola', 'v0.0.54', 'passed'),
(18, 3, 'Un test avec \" et \' dedans', 'On teste la partie \" \'', 'le résulta;;t expect;;;;;;;;;;;;ed est blablabla', 'v0.0.1de\"\'', 'failed'),
(20, 3, 'Le titre est différent maintenant', 'hjbhbjeedhbjedq ;;;;\"\"\":::', ';;;;;;;;;;;; \"\"\"\"', '\"\"\"\'!!!', 'todo'),
(23, 110, 'test', 'gtrdgdr', 'btrf', 'bhftd', 'todo');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `assigned_task`
--
ALTER TABLE `assigned_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_task_ibfk_1` (`task_id`),
  ADD KEY `assigned_task_ibfk_2` (`username`);

--
-- Index pour la table `documentation_of_release`
--
ALTER TABLE `documentation_of_release`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `issue`
--
ALTER TABLE `issue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_ibfk_1` (`project_id`);

--
-- Index pour la table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `sprint_id` (`sprint_id`);

--
-- Index pour la table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Index pour la table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `test_id` (`test_id`);

--
-- Index pour la table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `project_team`
--
ALTER TABLE `project_team`
  ADD KEY `project_team_ibfk_1` (`project_id`),
  ADD KEY `username` (`username`);

--
-- Index pour la table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sprint_ibfk_1` (`project_id`);

--
-- Index pour la table `sprint_of_release`
--
ALTER TABLE `sprint_of_release`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Index pour la table `task_checklist`
--
ALTER TABLE `task_checklist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_checklist_ibfk_1` (`task_id`);

--
-- Index pour la table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_dependencies_ibfk_1` (`task_id`),
  ADD KEY `task_dependencies_ibfk_2` (`depend_on_task_id`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `assigned_task`
--
ALTER TABLE `assigned_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT pour la table `documentation_of_release`
--
ALTER TABLE `documentation_of_release`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `issue`
--
ALTER TABLE `issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT pour la table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT pour la table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT pour la table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT pour la table `sprint`
--
ALTER TABLE `sprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `sprint_of_release`
--
ALTER TABLE `sprint_of_release`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `task_checklist`
--
ALTER TABLE `task_checklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `assigned_task`
--
ALTER TABLE `assigned_task`
  ADD CONSTRAINT `assigned_task_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assigned_task_ibfk_2` FOREIGN KEY (`username`) REFERENCES `member` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue`
--
ALTER TABLE `issue`
  ADD CONSTRAINT `issue_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue_of_sprint`
--
ALTER TABLE `issue_of_sprint`
  ADD CONSTRAINT `issue_of_sprint_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_sprint_ibfk_2` FOREIGN KEY (`sprint_id`) REFERENCES `sprint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue_of_task`
--
ALTER TABLE `issue_of_task`
  ADD CONSTRAINT `issue_of_task_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_task_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `issue_of_test`
--
ALTER TABLE `issue_of_test`
  ADD CONSTRAINT `issue_of_test_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_of_test_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `project_team`
--
ALTER TABLE `project_team`
  ADD CONSTRAINT `project_team_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_team_ibfk_2` FOREIGN KEY (`username`) REFERENCES `member` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `task_checklist`
--
ALTER TABLE `task_checklist`
  ADD CONSTRAINT `task_checklist_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `task_dependencies`
--
ALTER TABLE `task_dependencies`
  ADD CONSTRAINT `task_dependencies_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_dependencies_ibfk_2` FOREIGN KEY (`depend_on_task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
