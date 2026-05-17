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
-- Table structure for table `order_list`
--

CREATE TABLE `order_list` (
  `order_id` int(11) NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `order_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `delivery_status` enum('pending','out for delivery','delivered') NOT NULL,
  `client_address` varchar(80) NOT NULL,
  `client_contact` varchar(12) NOT NULL,
  `shipment_type` enum('delivery','pickup') NOT NULL DEFAULT 'delivery'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_list`
--

INSERT INTO `order_list` (`order_id`, `client_name`, `order_date`, `total_amount`, `delivery_status`, `client_address`, `client_contact`, `shipment_type`) VALUES
(31, 'Cate Zamora', '2026-05-11', 188.00, 'pending', 'Cebu City, Cebu', '09192839421', 'delivery'),
(32, 'Francine Menchavez', '2026-05-12', 456.00, 'pending', 'Little Rock, Arkansas, United States', '09222453562', 'pickup'),
(33, 'Bruce Wayne', '2026-05-12', 343.00, 'pending', 'Gotham City, United States', '09222453562', 'pickup'),
(34, 'Katherine Rebecca', '2026-05-12', 215.00, 'pending', 'Gotham City, United States', '09222453562', 'delivery'),
(35, 'The Joker', '2026-05-12', 178.00, 'pending', 'Gotham City, United States', '09123456789', 'delivery'),
(36, 'Herobrine', '2026-05-12', 210.00, 'pending', 'Nether Fortress, Nether, Minecraft', '09170001001', 'delivery'),
(37, 'Mario', '2026-05-12', 198.00, 'pending', 'Mushroom Kingdom, Peach\'s Castle', '09172228819', 'delivery'),
(38, 'Lara Croft', '2026-05-12', 151.00, 'pending', 'Croft Manor, Surrey, England', '09123458819', 'delivery'),
(39, 'Leon S. Kennedy', '2026-05-12', 255.00, 'pending', 'Raccoon City Police Department', '09123459182', 'delivery'),
(40, 'Ellie Williams', '2026-05-12', 165.00, 'pending', 'Jackson Settlement, Wyoming', '09432159182', 'delivery'),
(41, 'Nathan Drake', '2026-05-12', 108.00, 'pending', 'New Devon Coastline', '09432155666', 'delivery'),
(42, 'Samuel Dumapias', '2026-05-12', 345.00, 'pending', 'Minglanilla, Cebu', '09067676767', 'pickup'),
(43, 'Nathaniel Ponce', '2026-05-12', 300.00, 'pending', 'Minglanilla, Cebu', '09563585873', 'pickup'),
(44, 'Joannah Bael', '2026-05-12', 120.00, 'pending', 'Bacayan, Cebu', '09563598273', 'delivery'),
(45, 'Joshua Faber', '2026-05-12', 225.00, 'pending', 'Lapu-Lapu, Cebu', '09564829182', 'delivery'),
(46, 'Jill Valentine', '2026-05-12', 110.00, 'pending', 'Raccon City, Cebu', '09564829281', 'delivery'),
(47, 'Chloe Frazer', '2026-05-12', 110.00, 'pending', 'Chennai Safehouse', '09575719281', 'delivery'),
(48, 'Geralt of Rivia', '2026-05-12', 150.00, 'pending', 'Kaer Morhen, Witcher Keep', '09575747261', 'delivery'),
(49, 'Kratos', '2026-05-12', 100.00, 'pending', 'Midgard Cabin, Wildwoods', '09563585873', 'delivery'),
(50, 'Tony Stark', '2026-05-12', 4716.00, 'pending', 'Stark Tower, New York, NY, United States', '09192837561', 'delivery'),
(51, 'Peter Parker', '2026-05-12', 12.00, 'pending', 'Queens, New York, NY, United States', '09192282817', 'pickup'),
(52, 'Clark Kent', '2026-05-12', 45.00, 'pending', 'Smallville, Kansas, United States', '09192281901', 'pickup'),
(53, 'Wanda Maximoff', '2026-05-12', 90.00, 'pending', 'Mount Wundagore', '09192000123', 'pickup'),
(54, 'Loki', '2026-05-12', 600.00, 'pending', 'Royal Palace, Asgard', '09676767670', 'pickup'),
(55, 'Anakin Skywaler', '2026-05-12', 1800.00, 'pending', 'Jedi Temple', '09125938920', 'pickup'),
(56, 'Rey', '2026-05-12', 225.00, 'pending', 'Jakku Desert Outpost, Tattooine', '09125278277', 'delivery'),
(57, 'John Wick', '2026-05-12', 150.00, 'pending', 'Continental Hotel, New York, NY, United States', '09192883721', 'delivery'),
(58, 'Dominic Toretto', '2026-05-12', 951.00, 'pending', 'Echo Park, Los Angeles', '09192678731', 'delivery'),
(59, 'Katniss Everdeen', '2026-05-12', 25.00, 'pending', 'District 12, Panem', '09198787122', 'pickup'),
(60, 'Cloud Strife', '2026-05-12', 150.00, 'delivered', 'Sector 7 Slums, Midgar', '09197777777', 'pickup'),
(61, 'Sephiroth', '2026-05-12', 750.00, 'delivered', 'Shinra Headquarters, Midgar', '09196666666', 'delivery'),
(64, 'Juan Dela Cruz', '2026-05-13', 152.00, 'out for delivery', 'Minglanilla, Cebu', '09584717182', 'pickup');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_list`
--
ALTER TABLE `order_list`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
