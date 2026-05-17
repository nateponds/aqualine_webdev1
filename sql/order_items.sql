-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2026 at 04:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aqualine_orders`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`item_id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`) VALUES
(31, 31, 3, 'Solo Mist', 4, 12.00),
(32, 31, 4, 'Family Pack', 5, 18.00),
(33, 32, 1, 'Standard Round', 3, 30.00),
(34, 32, 2, 'Slim Alkaline', 3, 45.00),
(35, 32, 3, 'Solo Mist', 3, 12.00),
(36, 32, 4, 'Family Pack', 3, 18.00),
(37, 32, 5, 'Office Tower', 3, 25.00),
(38, 32, 6, 'Compact Home', 3, 22.00),
(39, 33, 2, 'Slim Alkaline', 3, 45.00),
(40, 33, 3, 'Solo Mist', 4, 12.00),
(41, 33, 4, 'Family Pack', 4, 18.00),
(42, 33, 6, 'Compact Home', 4, 22.00),
(43, 34, 2, 'Slim Alkaline', 3, 45.00),
(44, 34, 3, 'Solo Mist', 3, 12.00),
(45, 34, 6, 'Compact Home', 2, 22.00),
(46, 35, 1, 'Standard Round', 3, 30.00),
(47, 35, 6, 'Compact Home', 4, 22.00),
(48, 36, 1, 'Standard Round', 4, 30.00),
(49, 36, 2, 'Slim Alkaline', 2, 45.00),
(50, 37, 1, 'Standard Round', 3, 30.00),
(51, 37, 4, 'Family Pack', 6, 18.00),
(52, 38, 4, 'Family Pack', 7, 18.00),
(53, 38, 5, 'Office Tower', 1, 25.00),
(54, 39, 1, 'Standard Round', 4, 30.00),
(55, 39, 2, 'Slim Alkaline', 3, 45.00),
(56, 40, 1, 'Standard Round', 3, 30.00),
(57, 40, 5, 'Office Tower', 3, 25.00),
(58, 41, 3, 'Solo Mist', 9, 12.00),
(59, 42, 2, 'Slim Alkaline', 5, 45.00),
(60, 42, 3, 'Solo Mist', 10, 12.00),
(61, 43, 1, 'Standard Round', 4, 30.00),
(62, 43, 2, 'Slim Alkaline', 4, 45.00),
(63, 44, 1, 'Standard Round', 4, 30.00),
(64, 45, 1, 'Standard Round', 5, 30.00),
(65, 45, 5, 'Office Tower', 3, 25.00),
(66, 46, 6, 'Compact Home', 5, 22.00),
(67, 47, 6, 'Compact Home', 5, 22.00),
(68, 48, 1, 'Standard Round', 5, 30.00),
(69, 49, 5, 'Office Tower', 4, 25.00),
(70, 50, 1, 'Standard Round', 30, 30.00),
(71, 50, 2, 'Slim Alkaline', 50, 45.00),
(72, 50, 3, 'Solo Mist', 23, 12.00),
(73, 50, 4, 'Family Pack', 30, 18.00),
(74, 50, 5, 'Office Tower', 30, 25.00),
(75, 51, 3, 'Solo Mist', 1, 12.00),
(76, 52, 2, 'Slim Alkaline', 1, 45.00),
(77, 53, 1, 'Standard Round', 3, 30.00),
(78, 54, 1, 'Standard Round', 20, 30.00),
(79, 55, 1, 'Standard Round', 60, 30.00),
(80, 56, 2, 'Slim Alkaline', 5, 45.00),
(81, 57, 1, 'Standard Round', 5, 30.00),
(82, 58, 1, 'Standard Round', 5, 30.00),
(83, 58, 2, 'Slim Alkaline', 5, 45.00),
(84, 58, 4, 'Family Pack', 32, 18.00),
(85, 59, 5, 'Office Tower', 1, 25.00),
(86, 60, 1, 'Standard Round', 5, 30.00),
(87, 61, 1, 'Standard Round', 25, 30.00),
(91, 64, 1, 'Standard Round', 1, 30.00),
(92, 64, 2, 'Slim Alkaline', 1, 45.00),
(93, 64, 3, 'Solo Mist', 1, 12.00),
(94, 64, 4, 'Family Pack', 1, 18.00),
(95, 64, 5, 'Office Tower', 1, 25.00),
(96, 64, 6, 'Compact Home', 1, 22.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `order_id` (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_list` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
