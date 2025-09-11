-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2025 at 03:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_email`, `customer_name`, `mobile`, `address`, `product_id`, `product_name`, `price`, `quantity`, `total_amount`, `image`, `order_date`) VALUES
(1, '22i303@psgtech.ac.in', 'Archana', '6380442246', 'tvm', 6, 'iphone', 50000.00, 2, 100000.00, '1752208175_iphone1.webp', '2025-07-24 15:47:46'),
(2, 'archanasivakumar200411@gmail.com', 'Archana', '6380442246', 'hacd', 5, 'I-phone', 120000.00, 1, 120000.00, '1752080969_iphone1.webp', '2025-07-29 16:34:40'),
(3, '22i303@psgtech.ac.in', 'xyz', '6380442246', 'afyglfgv', 8, 'slippers', 10.00, 1, 10.00, '1753869076_slipper.jpg', '2025-07-30 09:51:59'),
(4, '22i303@psgtech.ac.in', 'Archana', '6380442246', '422,school street, Nallavan palayam', 8, 'slippers', 10.00, 1, 10.00, '1753869076_slipper.jpg', '2025-08-16 09:22:35'),
(5, 'john@gmail.com', 'john', '06380442246', '422, School Street, Nallavan Palayam', 7, 'layasa Women Slipper', 699.00, 1, 699.00, '1753865516_slipper.jpg', '2025-09-11 13:12:20');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`) VALUES
(1, 'Sneakers', 3000.00, 'Comfortable and stylish daily wear', '1752071278_sneakers.webp'),
(2, 'T-shirt', 399.00, 'Fierce Name Customized Printed Mens Half Sleeves Cotton T-Shirt', '1752080224_tshirt1.jpg'),
(3, 'Tees', 599.00, 'Minimal Flowers Oversized Hip Hop Customized Printed Women Half Sleeves Cotton T-Shirt', '1752080513_w_tshirt1.jpg'),
(4, 'Laptop', 49999.00, 'a portable personal computer with a screen, keyboard, and touchpad, designed for on-the-go use', '1752080559_laptop1.jpg'),
(5, 'I-phone', 120000.00, 'iPhone 15 brings you Dynamic Island, a 48MP Main camera, and USB-C—all in a durable color-infused glass and aluminum design.', '1752080969_iphone1.webp'),
(7, 'layasa Women Slipper', 699.00, 'Comfortable and elegant', '1753865516_slipper.jpg'),
(8, 'slippers', 10.00, 'soft mayo', '1753869076_slipper.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(4, 'Archana', '22i303@psgtech.ac.in', '$2y$10$gcNBtGYAhMmz0uQQqGkKgufhABY3d/Q2PKZFYS453BtSrPpQWy.1C'),
(5, 'xyz', 'archanasivakumar200411@gmail.com', '$2y$10$KTX13Cc5/v11maNtNFGOj.kHWFmQNc9zcUfQIv3PIfXrK0mfKmap.'),
(6, 'abc', 'abc@gmail.com', '$2y$10$B8qSMuy5z84F6rFmXAMS1O7RWQ08g2GyNmUf2LtyBM/Hezsrq.OCS'),
(7, 'Archana', 'archanabtechian@gmail.com', '$2y$10$8IW3qHZZ4kvhOg79kYoc1edNjVryrHkXKs.Lrbmqe.P06VBJ5eD0q'),
(8, 'testuser', 'testuser@example.com', '$2y$10$WalFP1naPy7Hlg8sCcJ3F.J3VtFuUYSQvntbv/45diptPPcFrmpQi'),
(9, 'Test User', 'testuser1@example.com', '$2y$10$u.BHcBK1.UET5TTYb2BlyuQzxVmxHMrx4wPL5N8NOoPXPOoAsJMV2'),
(10, 'Test User', 'testuser2@example.com', '$2y$10$nFGdkvJ1wdPGc6ujEiLzF.VVbO6d9nEZW3FnRpVdrPiRnFqSRAgpy'),
(11, 'Test User', 'testuser3@example.com', '$2y$10$c7vJr1xko.yaRI9SowwAielFb8R/eYVxYbkkgBT.dBNxsZhZ8srWm'),
(12, 'Test User', 'testuser4@example.com', '$2y$10$sS2Pdwbbm0LzpF3r.sIRm.mHL8v75dnhJMx9vljH4EL3LX2yUU9KG'),
(13, 'Test User', 'testuser5@example.com', '$2y$10$W/YaRXvpAOf95O6UFR/mSe1pYSKpntHuwlrXlDAfHJhUbFsaZxTVG'),
(14, 'Test User', 'testuser6@example.com', '$2y$10$rarwxB7hPfvdfZkVjtbDzOMFFZC0IiGwfduBjQZ2xVYGnrllvFcme'),
(15, 'john', 'john@gmail.com', '$2y$10$8kIjwlVmNF4BvD03yNjiOuctW/uOtHBBE84wnVIVQ67ZEct3NnV06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
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
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
