-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2022 at 07:28 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(15) NOT NULL,
  `role` enum('User','Admin') NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(1, 'Uri', 'Nagar', 'admin', '123456', 'Admin'),
(2, 'Daniel', 'Naus', 'user1', '123456', 'User'),
(3, ' Shuky ', ' Balabua ', 'user2', '123456', 'User'),
(12, ' Shlomo ', ' Ben Shimon ', 'user3', '123456 ', 'User'),
(22, 'Arik', 'Abu-Nafha', 'user4', '123456', 'User'),
(23, 'Moshe', 'Ben-Moshe', 'user5', '123456', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `userspervacations`
--

CREATE TABLE `userspervacations` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userspervacations`
--

INSERT INTO `userspervacations` (`vacationId`, `userId`) VALUES
(1, 2),
(1, 23),
(1, 32),
(7, 1),
(7, 2),
(8, 1),
(8, 23),
(9, 1),
(9, 2),
(13, 2),
(20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `startingDate` datetime NOT NULL,
  `endingDate` datetime NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `followersCount` int(11) NOT NULL DEFAULT 0,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `startingDate`, `endingDate`, `price`, `followersCount`, `imageName`) VALUES
(1, 'Beautiful trip from Napoli to Milano across the amazing country side roads of italy', 'Napoli,  Italy', '2022-03-08 05:29:00', '2022-03-16 05:29:00', '1220.00', 3, '6ef88ee9-67d2-4fec-81fa-2be5f0b2b177.jpg'),
(2, 'Beautiful trip from Bat-Yam to Hulon through the amazing country side roads of Israel', 'Bat-Yam, Israel', '2022-03-20 19:10:00', '2022-03-25 16:10:00', '2200.00', 1, '21b0c504-d6b7-4f7a-bd7e-07f92947dfeb.jpg'),
(3, 'Beautiful trip from Addis Ababa to Aksum across the amazing desert roads of Ethiopia', 'Addis-Ababa, Ethiopia', '2022-03-11 09:31:00', '2022-03-14 09:31:00', '3020.00', 2, 'ea382162-b636-4a81-8278-8750a809a249.jpg'),
(4, 'Beautiful trip to France, Paris in a real urban experience.', 'Italy, France', '2022-03-09 21:30:00', '2022-03-27 11:30:00', '1730.00', 4, '7dc9c770-4bab-4b0d-a0a6-95652a6e9059.jpg'),
(5, 'A beautiful trip with your partner across the amazing antiques and history of Italy', 'Rome, Italy', '2022-03-05 15:15:00', '2022-03-26 12:15:00', '2131.00', 1, 'b8868407-fe86-4b79-99f1-0cad0ef588f5.jpg'),
(6, 'Beautiful trip from London to Southempton across the amazing country roads of England', 'London, England', '2022-03-17 16:05:00', '2022-03-24 16:05:00', '2090.00', 0, '1667c2d8-86ad-409e-a4b4-58b786956f40.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userspervacations`
--
ALTER TABLE `userspervacations`
  ADD PRIMARY KEY (`vacationId`,`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
