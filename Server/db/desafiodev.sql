-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 11, 2019 at 10:18 PM
-- Server version: 5.7.26-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `desafiodev`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `locate` varchar(255) DEFAULT NULL,
  `date_start` varchar(255) DEFAULT NULL,
  `date_end` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `name`, `description`, `level`, `status`, `details`, `locate`, `date_start`, `date_end`, `image`) VALUES
(19, 'a', 'a', 'a', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(21, '20', 's', 'red', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(23, 'ddddd', 'ddddd', 'd', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(27, 'Teste', 'Teste', 'red', 'Active', NULL, NULL, '28-02-2018', NULL, NULL),
(28, 'teste', 'teste', 'green', 'Done', NULL, 'ddddddddddddd', '28-02-2019', 'Thu Jul 11 2019', 'ddddddddddddddddddddd'),
(29, 'a', 'a', 'green', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(31, 'aa', 'aaaaaaaaaaaa', 'green', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(32, '', '', 'green', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(33, 'aaaaaaaaa', 'aaaa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(34, 'aaaaaaaaaa', 'aaaaaaaaaaaa', 'green', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(35, 'aaaaaaaaaaaaa', 'aaaaaaa', 'green', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(37, 'gdgdgd', 'gdgdgdgd', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(38, 'aaa', 'aa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(41, 'aaa', 'aaaa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(42, 'a', 'aa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(43, 'aaa', 'aaa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(45, 'aaa', 'aaaaaaaaaaa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(46, 'aaaaaaaa', 'aaaaaaaaaaaaaaa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(47, 'aa', 'aaaaa', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(48, '', '', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(49, '', '', '', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL),
(50, 'aaaa', 'aaa', 'green', 'Active', NULL, NULL, 'Thu Jul 11 2019', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
