-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 10:15 AM
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
-- Database: `rase`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodations`
--

CREATE TABLE `accommodations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` varchar(20) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `delegate` varchar(255) DEFAULT NULL,
  `delegateType` varchar(100) DEFAULT NULL,
  `event` varchar(255) NOT NULL,
  `accommodationType` varchar(100) DEFAULT NULL,
  `accommodationDate` date DEFAULT NULL,
  `feeReceiptUrl` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accommodations`
--

INSERT INTO `accommodations` (`id`, `name`, `email`, `contactNumber`, `designation`, `delegate`, `delegateType`, `event`, `accommodationType`, `accommodationDate`, `feeReceiptUrl`, `createdAt`) VALUES
(1, 'John Doe', 'john.doe@example.com', '1234567890', 'Manager', 'Jane Smith', 'Speaker', 'Tech Conference 2024', 'Hotel', '2024-12-15', NULL, '2024-11-30 07:56:31');

-- --------------------------------------------------------

--
-- Table structure for table `best_practices`
--

CREATE TABLE `best_practices` (
  `id` int(11) NOT NULL,
  `institution_name` varchar(255) NOT NULL,
  `about_practices` text NOT NULL,
  `key_person` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `best_practices`
--

INSERT INTO `best_practices` (`id`, `institution_name`, `about_practices`, `key_person`, `email`, `contact_number`, `address`, `attachment`, `created_at`) VALUES
(1, 'Tech University', 'Tech University focuses on sustainable and innovative tech solutions.', 'Dr. John Doe', 'john.doe@techuniversity.edu', '+1234567890', '123 Tech Road, Silicon Valley, CA', NULL, '2024-11-30 08:05:55');

-- --------------------------------------------------------

--
-- Table structure for table `full_length_papers`
--

CREATE TABLE `full_length_papers` (
  `id` int(11) NOT NULL,
  `PaperTitle` varchar(255) NOT NULL,
  `CorrespondingAuthorEmail` varchar(255) NOT NULL,
  `CorrespondingAuthorName` varchar(255) NOT NULL,
  `CoauthorNames` text DEFAULT NULL,
  `CoauthorEmail` varchar(255) DEFAULT NULL,
  `Keywords` text DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `AttachmentsWord` varchar(255) DEFAULT NULL,
  `AttachmentsPdf` varchar(255) DEFAULT NULL,
  `AttachmentsPpt` varchar(255) DEFAULT NULL,
  `FeeReceipt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hei_projects`
--

CREATE TABLE `hei_projects` (
  `id` int(11) NOT NULL,
  `projectName` varchar(255) NOT NULL,
  `projectDescription` text DEFAULT NULL,
  `instituteName` varchar(255) NOT NULL,
  `instituteAddress` varchar(255) DEFAULT NULL,
  `teamSize` int(11) DEFAULT NULL,
  `participants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`participants`)),
  `projectPptPath` varchar(255) DEFAULT NULL,
  `projectVideoPath` varchar(255) DEFAULT NULL,
  `feeUploadPath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `institutions`
--

CREATE TABLE `institutions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `cont` varchar(255) DEFAULT NULL,
  `feeAmount` decimal(10,2) DEFAULT NULL,
  `feeReceipt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institutions`
--

INSERT INTO `institutions` (`id`, `name`, `role`, `email`, `contactNumber`, `website`, `cont`, `feeAmount`, `feeReceipt`) VALUES
(1, 'ABC Institute', 'Researcher', 'contact@abc.com', '+1234567890', 'https://www.abc.com', 'Science', 500.00, NULL),
(2, 'ABC Institute', 'Researcher', 'contact@abc.com', '+1234567890', 'https://www.abc.com', 'Science', 500.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ngos`
--

CREATE TABLE `ngos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `RegistrationNo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `Website` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  `Contribution` text DEFAULT NULL,
  `Attachments` text DEFAULT NULL,
  `accommodation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ngos`
--

INSERT INTO `ngos` (`id`, `name`, `RegistrationNo`, `email`, `Website`, `PhoneNumber`, `Contribution`, `Attachments`, `accommodation`) VALUES
(1, 'Global Green NGO', 'GGNGO123456', 'contact@globalgreen.org', 'http://globalgreen.org', '123-456-7890', 'Community outreach programs, environment conservation', 'file_link_1, file_link_2', 'Temporary accommodation available in city');

-- --------------------------------------------------------

--
-- Table structure for table `organizers`
--

CREATE TABLE `organizers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `duty` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `accommodation` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `stateCode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizers`
--

INSERT INTO `organizers` (`id`, `name`, `phone`, `designation`, `institution`, `duty`, `email`, `accommodation`, `state`, `stateCode`) VALUES
(1, 'John Doe', '987-654-3210', 'Event Coordinator', 'XYZ University', 'Coordinate event logistics', 'johndoe@xyz.edu', 'Hotel ABC, Room 101', 'Himachal Pradesh', 'HP001');

-- --------------------------------------------------------

--
-- Table structure for table `school_projects`
--

CREATE TABLE `school_projects` (
  `id` int(11) NOT NULL,
  `projectName` varchar(255) NOT NULL,
  `projectDescription` text NOT NULL,
  `schoolName` varchar(255) NOT NULL,
  `schoolAddress` varchar(255) NOT NULL,
  `teamSize` int(11) NOT NULL,
  `participants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`participants`)),
  `projectPpt` varchar(255) NOT NULL,
  `projectVideo` varchar(255) NOT NULL,
  `feeUpload` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `talents`
--

CREATE TABLE `talents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `talentName` varchar(255) NOT NULL,
  `institutionName` varchar(255) NOT NULL,
  `talentType` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `affiliation` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `services` text DEFAULT NULL,
  `accommodation` varchar(255) DEFAULT NULL,
  `resumeUrl` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accommodations`
--
ALTER TABLE `accommodations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `best_practices`
--
ALTER TABLE `best_practices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `full_length_papers`
--
ALTER TABLE `full_length_papers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hei_projects`
--
ALTER TABLE `hei_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `institutions`
--
ALTER TABLE `institutions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ngos`
--
ALTER TABLE `ngos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_projects`
--
ALTER TABLE `school_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `talents`
--
ALTER TABLE `talents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accommodations`
--
ALTER TABLE `accommodations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `best_practices`
--
ALTER TABLE `best_practices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `full_length_papers`
--
ALTER TABLE `full_length_papers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hei_projects`
--
ALTER TABLE `hei_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `institutions`
--
ALTER TABLE `institutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ngos`
--
ALTER TABLE `ngos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `organizers`
--
ALTER TABLE `organizers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `school_projects`
--
ALTER TABLE `school_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `talents`
--
ALTER TABLE `talents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
