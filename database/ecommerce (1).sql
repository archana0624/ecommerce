-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 11:11 AM
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
(1, 'archana@gmail.com', 'Archana', '6380442246', 'agfbalhfbdf', 16, 'Iron + Folic Acid Tablets', 150.00, 1, 150.00, '1759473207_iron+folic.avif', '2025-10-03 06:36:48');

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
(1, 'Paracetamol 500mg', 35.00, 'Used for pain relief and fever reduction.', '1759472716_paracetamol-500mg-tablet.jpg'),
(2, 'Ibuprofen 400mg', 55.00, 'Non-steroidal anti-inflammatory drug (NSAID) for pain, swelling, and fever.', '1759472750_ibuprofen-tablet-400mg-500x500.webp'),
(3, 'Amoxicillin 500mg', 120.00, 'Antibiotic for bacterial infections.', '1759472780_Amoxicillin-500mg-caps-3-scaled.webp'),
(4, 'Azithromycin 250mg', 135.00, 'Antibiotic commonly prescribed for throat and lung infections.', '1759472815_azith.jpg'),
(5, 'Cetirizine 10mg', 25.00, 'Antihistamine for allergy relief.', '1759472838_cetirizine.png'),
(6, 'Vitamin C Tablets', 150.00, 'Boosts immunity and acts as antioxidant.', '1759472870_vitamin c tablets.webp'),
(7, 'Multivitamin Capsules', 220.00, 'General health supplement.', '1759472906_multi vitamin.jpg'),
(8, 'Calcium + Vitamin D3', 180.00, 'Strengthens bones and joints.', '1759472926_cal_vitamind3.jpg'),
(9, 'Metformin 500mg', 90.00, 'Used in diabetes management.', '1759472953_metformin.jpg'),
(10, 'Glimepiride 2mg', 110.00, 'Oral diabetes medication.', '1759473016_glimepiride.webp'),
(11, 'Amlodipine 5mg', 60.00, 'Calcium channel blocker for hypertension.', '1759473045_amlodipine.jpg'),
(12, 'Pantoprazole 40mg', 95.00, 'Reduces stomach acid, used for GERD.', '1759473069_pantoprazole.jpg'),
(13, 'Domperidone 10mg', 75.00, 'Used for nausea and vomiting.', '1759473131_domperidone.jpg'),
(14, 'ORS Solution Pack', 30.00, 'Rehydration therapy for diarrhea.', '1759473157_ors.webp'),
(15, 'Zinc Sulphate Tablets', 70.00, 'Supports immune system and recovery.', '1759473182_zinc.avif'),
(16, 'Iron + Folic Acid Tablets', 150.00, 'Treats anemia and supports pregnancy health.', '1759473207_iron+folic.avif'),
(17, 'Insulin Injection (10ml)', 350.00, 'Essential medicine for diabetes.', '1759473233_insulin.jpg'),
(18, 'Betadine Antiseptic 100ml', 90.00, 'Used for wound cleaning and infection prevention.', '1759473250_betadine antiseptic.jpg');

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
(16, 'John Doe', 'john.doe@example.com', '$2y$10$yYJKr5dDDIatzNd13pRHt.41XORk0zW8IVEoYEbX/hfmkUVRC6PN2'),
(17, 'Archana', 'archana@gmail.com', '$2y$10$RnTEQHyV7u0AwNvGCASBouEsIQQ.LeEAGSUJMMJWzJpHXfw8HI//.');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
