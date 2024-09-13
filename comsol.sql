-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2024 at 10:53 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comsol`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `whatsapp_number` varchar(20) DEFAULT NULL,
  `complaint` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `customer_name`, `customer_email`, `mobile_number`, `whatsapp_number`, `complaint`, `location`, `created_at`) VALUES
(2, 'Demo', 'Demo@gmail.com', '456789', '5678', 'fgsdj', 'https://www.google.com/maps/place/9.1887492,76.7668806/', '2024-09-12 20:31:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `user_type` enum('Admin','Manager','Staff') NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `office` varchar(100) NOT NULL,
  `office_address` text NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_type`, `email`, `mobile`, `office`, `office_address`, `gender`, `password`, `created_at`) VALUES
(1, 'Naayif', 'sf', 'Manager', 'nikhilkodumon@gmail.com', '08921652221', 'Adoor', 'PRAKASH BHAVANAM', 'Male', '$2a$10$YnnF6kJQw129m7IFpM5MYOmiWHrQpecoVPdgTh4ijlyiBTqGZdkIK', '2024-09-12 18:20:37'),
(3, 'Nikhil', 'PRAKASH', '', 'akhil@gmail.com', '08921534017', 'Adoor', 'Billing Address', 'Male', '$2a$10$mw8f1JMxwa9AIhNE5d.rhuLWPeltlTuUL.714u9ebLE1TdwhFCvcK', '2024-09-12 19:35:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
