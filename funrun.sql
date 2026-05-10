-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2026 at 07:38 AM
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
-- Database: `funrun`
--

-- --------------------------------------------------------

--
-- Table structure for table `event_users`
--

CREATE TABLE `event_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `upass` varchar(255) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_users`
--

INSERT INTO `event_users` (`user_id`, `username`, `upass`, `fullname`) VALUES
(2, 'admin', 'admin123', 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `funrun_registration`
--

CREATE TABLE `funrun_registration` (
  `reg_ID` int(11) NOT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `shirt_size` varchar(10) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Registered'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `funrun_registration`
--

INSERT INTO `funrun_registration` (`reg_ID`, `fname`, `lname`, `email`, `category`, `shirt_size`, `status`) VALUES
(1, 'Karen Kim', 'Tan', 'hello@test.com', '5K Challenge', 'Medium', 'Kit Claimed'),
(2, 'Karen', 'Tan', 'hello@test.com', '3K Fun Run', 'Small', 'Paid'),
(123, '123', 'testreg', '123@smp.com', '10K Marathon', 'XL', 'Registered');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event_users`
--
ALTER TABLE `event_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `funrun_registration`
--
ALTER TABLE `funrun_registration`
  ADD PRIMARY KEY (`reg_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event_users`
--
ALTER TABLE `event_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `funrun_registration`
--
ALTER TABLE `funrun_registration`
  MODIFY `reg_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
