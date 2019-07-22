-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 22-Jul-2019 às 05:57
-- Versão do servidor: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

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
-- Estrutura da tabela `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `locate` varchar(255) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `task`
--

INSERT INTO `task` (`id`, `name`, `description`, `level`, `status`, `details`, `locate`, `date_start`, `date_end`, `image`) VALUES
(1, 'Entrega Strider', 'Desafio parte 1', 'red', 'Active', NULL, 'Rua Dom Oscar Romero, 30510-080. Minas Gerais, Brasil', '2019-07-04', '2019-07-22', 'http://localhost:8000/images/01a1212b-84a0-48b0-a523-888338c36e02.jpg'),
(2, 'Lavar as roupas', 'Usar omo e amaciante', 'yellow', 'Active', NULL, NULL, '2019-06-30', NULL, NULL),
(3, 'Lavar o carro', 'Tá uma vergonha! Lava esse carro logo.', 'green', 'Active', NULL, NULL, '2019-06-29', NULL, NULL),
(5, 'Timers para lista de tarefas da app Mobile', 'A lista de tarefas é atualizada a cada 10 segundos', 'yellow', 'Active', NULL, NULL, '2019-07-05', NULL, NULL),
(6, 'Integrar a camera na app Mobile', 'Configurar e capturar foto para enviar ao servidor de Upload de imagens', 'yellow', 'Active', NULL, NULL, '2019-07-02', NULL, NULL),
(7, 'Entrada de pesquisa dinâmica na WebApp', 'A entrada no campo input filtra ocorrências na lista de tarefas', 'green', 'Active', NULL, 'Rua Dom Oscar Romero, 30510-080. Minas Gerais, Brasil', '2019-07-08', '2019-07-22', 'http://localhost:8000/images/5cd35ba0-c8f2-4abe-bd39-d3c995e41545.jpg'),
(8, 'Entrega servidor upload de arquivos ', 'Recebe imagem da app Mobile e retorna endereço de armazenamento para API Spring', 'red', 'Done', NULL, 'Rua Dom Oscar Romero, 30510-080. Minas Gerais, Brasil', '2019-07-13', '2019-07-22', 'http://localhost:8000/images/9e946788-c393-426c-bb2f-407f9f6bddc2.jpg');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
