-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2019 at 11:38 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hoferstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `cityID` int(11) NOT NULL,
  `managerID` int(11) NOT NULL,
  `branchType` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `buyers`
--

CREATE TABLE `buyers` (
  `id` int(11) NOT NULL,
  `emailID` int(11) NOT NULL,
  `personalInfoID` int(11) NOT NULL,
  `addressID` int(11) NOT NULL,
  `passwordID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyers`
--

INSERT INTO `buyers` (`id`, `emailID`, `personalInfoID`, `addressID`, `passwordID`, `isActive`, `dateCreated`) VALUES
(0, 0, 0, 0, 0, 0, '2019-08-11 16:56:18'),
(1, 1, 1, 1, 1, 1, '2019-08-11 16:56:18'),
(2, 2, 2, 2, 2, 1, '2019-08-11 16:56:18'),
(3, 3, 3, 3, 3, 1, '2019-08-11 16:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `buyers_addresses`
--

CREATE TABLE `buyers_addresses` (
  `id` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `relevance` int(11) NOT NULL,
  `cityID` int(11) NOT NULL,
  `streetName` varchar(150) NOT NULL,
  `streetNumber` varchar(30) NOT NULL,
  `floorAndApartment` varchar(30) NOT NULL,
  `extraReferences` varchar(100) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyers_addresses`
--

INSERT INTO `buyers_addresses` (`id`, `buyerID`, `relevance`, `cityID`, `streetName`, `streetNumber`, `floorAndApartment`, `extraReferences`, `isActive`, `dateCreated`) VALUES
(0, 0, 1, 0, '', '', '', '', 1, '2019-08-10 15:34:04'),
(1, 1, 1, 1, 'Rivadavia', '0158', '', '', 1, '2019-08-10 15:34:04'),
(2, 2, 1, 1, 'Rivadavia', '0158', '', '', 1, '2019-08-10 15:34:04'),
(3, 3, 1, 1, 'Rivadavia', '0158', '', '', 1, '2019-08-10 15:34:04');

-- --------------------------------------------------------

--
-- Table structure for table `buyers_emails`
--

CREATE TABLE `buyers_emails` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `isSuscriptionActive` tinyint(4) NOT NULL DEFAULT '1',
  `isConfirmed` tinyint(4) NOT NULL DEFAULT '0',
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `createdReasonID` int(11) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyers_emails`
--

INSERT INTO `buyers_emails` (`id`, `email`, `isSuscriptionActive`, `isConfirmed`, `isActive`, `createdReasonID`, `dateCreated`) VALUES
(0, '', 0, 0, 0, 0, '2019-08-11 17:00:12'),
(1, 'lisandrodc06@gmail.com', 1, 1, 1, 1, '2019-08-10 15:19:14'),
(2, 'lauta_dc@hotmail.com', 1, 1, 1, 1, '2019-08-10 15:19:14'),
(3, 'mdallacosta@lheritier.com.ar', 1, 1, 1, 1, '2019-08-10 15:19:14');

-- --------------------------------------------------------

--
-- Table structure for table `buyers_emails_creation_reasons`
--

CREATE TABLE `buyers_emails_creation_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyers_emails_creation_reasons`
--

INSERT INTO `buyers_emails_creation_reasons` (`id`, `reason`, `dateCreated`) VALUES
(0, 'Otros', '2019-08-11 17:01:01'),
(1, 'Al crear usuario', '2019-07-02 02:26:56'),
(2, 'Para recibir newsletter', '2019-07-02 02:26:56'),
(3, 'Para recibir descuentos', '2019-07-02 02:26:56');

-- --------------------------------------------------------

--
-- Table structure for table `buyers_passwords`
--

CREATE TABLE `buyers_passwords` (
  `id` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyers_passwords`
--

INSERT INTO `buyers_passwords` (`id`, `buyerID`, `password`, `dateCreated`) VALUES
(0, 0, '', '2019-08-11 17:02:01'),
(1, 1, '41637203', '2019-08-11 00:36:34'),
(2, 2, '34770668', '2019-08-11 00:36:34'),
(3, 3, '13947183', '2019-08-11 00:36:34');

-- --------------------------------------------------------

--
-- Table structure for table `buyers_personal_info`
--

CREATE TABLE `buyers_personal_info` (
  `id` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `relevance` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `surname` varchar(80) NOT NULL,
  `dob` date NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyers_personal_info`
--

INSERT INTO `buyers_personal_info` (`id`, `buyerID`, `relevance`, `name`, `surname`, `dob`, `isActive`, `dateCreated`) VALUES
(0, 0, 1, 'Don', 'Nadie', '1999-08-30', 0, '2019-08-11 05:40:22'),
(1, 1, 1, 'Lisandro', 'Dalla Costa', '1999-08-30', 1, '2019-08-11 05:40:22'),
(2, 2, 1, 'Lautaro', 'Dalla Costa', '1989-10-18', 1, '2019-08-11 05:40:22'),
(3, 3, 1, 'Marcelo', 'Dalla Costa', '1949-11-14', 1, '2019-08-11 05:40:22');

-- --------------------------------------------------------

--
-- Table structure for table `buyers_phones`
--

CREATE TABLE `buyers_phones` (
  `id` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `relevance` int(11) NOT NULL,
  `phone` varchar(80) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyers_phones`
--

INSERT INTO `buyers_phones` (`id`, `buyerID`, `relevance`, `phone`, `isActive`, `dateCreated`) VALUES
(0, 0, 1, '0000 000000', 0, '2019-08-11 17:04:07'),
(1, 1, 1, '3404 507421', 1, '2019-08-11 16:52:16'),
(2, 2, 1, '3404 434515', 1, '2019-08-11 16:52:16'),
(3, 3, 1, '3404 408938', 1, '2019-08-11 16:52:16');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `city` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `city`) VALUES
(0, 'El Mundo'),
(1, 'San Carlos Centro'),
(2, 'San Carlos Sur');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `roleID` int(11) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `name` int(11) NOT NULL,
  `surname` int(11) NOT NULL,
  `cuit` varchar(20) NOT NULL,
  `dateJoined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `employees_roles`
--

CREATE TABLE `employees_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `typeID` int(11) NOT NULL,
  `price` float NOT NULL,
  `dollarPrice` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `title`, `typeID`, `price`, `dollarPrice`, `date`, `notes`) VALUES
(1, 'Moto Tricargo Max 125 en Rosario', 1, 20000, 0, '2019-06-13 18:24:00', 'Pagada por Marcelo'),
(2, 'Envío Tricargo con Expresso Pepe', 1, 2500, 0, '2019-06-14 14:28:00', 'Pagado por Lautaro'),
(3, 'Template sitio web', 1, 0, 61, '2019-07-01 21:00:00', 'Pagado por Lisandro'),
(4, 'Template administrador de sitio web', 1, 0, 31, '2019-07-01 22:00:00', 'Pagado por Lisandro'),
(5, 'Verificación moto', 1, 250, 0, '2019-07-22 21:37:42', 'Pagado por Lisandro'),
(6, 'Pago albañil', 1, 2800, 0, '2019-08-06 20:42:27', 'Pagado por Lisandro'),
(7, 'Pintura para grietas de techo', 1, 300, 0, '2019-08-06 21:17:42', 'Pagado por Lisandro'),
(8, 'Transferencia moto triciclo', 1, 2650, 0, '2019-09-03 16:34:01', 'Pagado por Ambos'),
(9, 'Dominio rapisuper.com.ar', 1, 270, 0, '2019-09-05 18:05:56', 'Pagado por Lisandro');

-- --------------------------------------------------------

--
-- Table structure for table `milestones`
--

CREATE TABLE `milestones` (
  `id` int(11) NOT NULL,
  `branchID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payments_reasons`
--

CREATE TABLE `payments_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `detailsID` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `variantName` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `stockAlert` int(11) NOT NULL,
  `variantPrice` float NOT NULL,
  `variantOffert` float NOT NULL,
  `productParentID` int(11) NOT NULL,
  `parentMultiplier` float NOT NULL,
  `extraDescription` tinytext NOT NULL,
  `imagesAmount` int(11) NOT NULL DEFAULT '1',
  `barsCode` varchar(50) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `onlySuppliers` tinyint(4) NOT NULL DEFAULT '0',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `detailsID`, `fullName`, `variantName`, `stock`, `stockAlert`, `variantPrice`, `variantOffert`, `productParentID`, `parentMultiplier`, `extraDescription`, `imagesAmount`, `barsCode`, `isActive`, `onlySuppliers`, `dateCreated`) VALUES
(0, 0, '', '', 0, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-09-05 23:30:35');

-- --------------------------------------------------------

--
-- Table structure for table `products_activiy`
--

CREATE TABLE `products_activiy` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_brands`
--

CREATE TABLE `products_brands` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products_brands`
--

INSERT INTO `products_brands` (`id`, `name`, `dateCreated`, `isActive`) VALUES
(0, '', '2019-09-05 02:23:58', 0),
(1, 'Rapisuper', '2019-08-08 15:56:46', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products_categories`
--

CREATE TABLE `products_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parentID` int(11) NOT NULL,
  `isShowed` tinyint(4) NOT NULL DEFAULT '1',
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products_categories`
--

INSERT INTO `products_categories` (`id`, `name`, `parentID`, `isShowed`, `isActive`, `dateCreated`) VALUES
(0, '', 0, 0, 0, '2019-09-04 21:41:52'),
(1, 'Limpieza', 0, 1, 1, '2019-09-04 21:40:23'),
(2, 'Bebidas ', 0, 0, 1, '2019-09-04 21:40:23'),
(3, 'Frescos', 0, 1, 1, '2019-09-04 21:40:23'),
(4, 'Almacén', 0, 1, 1, '2019-09-04 21:40:23'),
(5, 'Frutas y verduras', 0, 1, 1, '2019-09-04 21:40:23');

-- --------------------------------------------------------

--
-- Table structure for table `products_details`
--

CREATE TABLE `products_details` (
  `id` int(11) NOT NULL,
  `brandID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `offert` float NOT NULL,
  `description` tinytext NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products_details`
--

INSERT INTO `products_details` (`id`, `brandID`, `name`, `price`, `offert`, `description`, `dateCreated`) VALUES
(0, 0, '', 0, 0, '', '2019-09-05 02:23:23');

-- --------------------------------------------------------

--
-- Table structure for table `products_details_u_products_categories`
--

CREATE TABLE `products_details_u_products_categories` (
  `id` int(11) NOT NULL,
  `productDetailsID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_details_u_products_tags`
--

CREATE TABLE `products_details_u_products_tags` (
  `id` int(11) NOT NULL,
  `productDetailsID` int(11) NOT NULL,
  `tagID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_expiration_date`
--

CREATE TABLE `products_expiration_date` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `expirationDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_expiration_date_history`
--

CREATE TABLE `products_expiration_date_history` (
  `id` int(11) NOT NULL,
  `purchaseID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `expirationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_expiration_date_history_changes`
--

CREATE TABLE `products_expiration_date_history_changes` (
  `id` int(11) NOT NULL,
  `historyID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `saleID` int(11) NOT NULL,
  `wasteID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_tags`
--

CREATE TABLE `products_tags` (
  `id` int(11) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_u_products_tags`
--

CREATE TABLE `products_u_products_tags` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `tagID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_wastes`
--

CREATE TABLE `products_wastes` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `amount` float NOT NULL,
  `reasonID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_wastes_reasons`
--

CREATE TABLE `products_wastes_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `stateID` int(11) NOT NULL,
  `dateOrdered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateArrived` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datePayed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paymentMethodID` int(11) NOT NULL,
  `totalProducts` float NOT NULL,
  `totalShipping` float NOT NULL,
  `totalTotal` float NOT NULL,
  `discount` float NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `purchases_states`
--

CREATE TABLE `purchases_states` (
  `id` int(11) NOT NULL,
  `state` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `purchases_u_products`
--

CREATE TABLE `purchases_u_products` (
  `id` int(11) NOT NULL,
  `purchaseID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `tempNum` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `addressID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totalProducts` float NOT NULL,
  `totalShipping` float NOT NULL,
  `totalTotal` float NOT NULL,
  `stateID` int(11) NOT NULL,
  `paymentStateID` int(11) NOT NULL,
  `paymentTypeID` int(11) NOT NULL,
  `discount` float NOT NULL,
  `discountID` int(11) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `tempNum`, `buyerID`, `addressID`, `date`, `totalProducts`, `totalShipping`, `totalTotal`, `stateID`, `paymentStateID`, `paymentTypeID`, `discount`, `discountID`, `notes`) VALUES
(1, 1, 1, 1, '2019-08-11 17:41:22', 47, 0, 47, 1, 1, 1, 0, 0, 'notis'),
(2, 2, 2, 1, '2019-08-11 18:41:22', 77, 0, 77, 1, 1, 1, 0, 0, 'notis');

-- --------------------------------------------------------

--
-- Table structure for table `sales_discounts`
--

CREATE TABLE `sales_discounts` (
  `id` int(11) NOT NULL,
  `discountOverID` int(11) NOT NULL,
  `discountName` varchar(50) NOT NULL,
  `discountAmount` float NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sales_discounts`
--

INSERT INTO `sales_discounts` (`id`, `discountOverID`, `discountName`, `discountAmount`, `isActive`, `dateCreated`) VALUES
(0, 0, 'nothing', 0, 0, '2019-08-11 17:16:29');

-- --------------------------------------------------------

--
-- Table structure for table `sales_discounts_activity`
--

CREATE TABLE `sales_discounts_activity` (
  `id` int(11) NOT NULL,
  `discountID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sales_discounts_overs`
--

CREATE TABLE `sales_discounts_overs` (
  `id` int(11) NOT NULL,
  `over` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sales_discounts_overs`
--

INSERT INTO `sales_discounts_overs` (`id`, `over`) VALUES
(0, 'nothing'),
(1, 'totalProducts'),
(2, 'totalShipping'),
(3, 'totalTotal');

-- --------------------------------------------------------

--
-- Table structure for table `sales_payment_states`
--

CREATE TABLE `sales_payment_states` (
  `id` int(11) NOT NULL,
  `payment_state` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sales_payment_states`
--

INSERT INTO `sales_payment_states` (`id`, `payment_state`, `dateCreated`) VALUES
(1, 'Pago en espera', '2019-08-11 17:37:27'),
(2, 'Pagado', '2019-08-11 17:37:27'),
(3, 'Pago canceado', '2019-08-11 17:37:27');

-- --------------------------------------------------------

--
-- Table structure for table `sales_payment_type`
--

CREATE TABLE `sales_payment_type` (
  `id` int(11) NOT NULL,
  `paymentType` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sales_payment_type`
--

INSERT INTO `sales_payment_type` (`id`, `paymentType`, `dateCreated`) VALUES
(1, 'Efectivo', '2019-08-11 17:36:26'),
(2, 'Tarjeta', '2019-08-11 17:36:26');

-- --------------------------------------------------------

--
-- Table structure for table `sales_states`
--

CREATE TABLE `sales_states` (
  `id` int(11) NOT NULL,
  `saleState` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sales_states`
--

INSERT INTO `sales_states` (`id`, `saleState`, `dateCreated`) VALUES
(1, 'pedido', '2019-08-11 17:34:53');

-- --------------------------------------------------------

--
-- Table structure for table `sales_u_products`
--

CREATE TABLE `sales_u_products` (
  `id` int(11) NOT NULL,
  `saleID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `price` float NOT NULL,
  `amount` int(11) NOT NULL,
  `relevance` int(11) NOT NULL,
  `isReady` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sales_u_products`
--

INSERT INTO `sales_u_products` (`id`, `saleID`, `productID`, `price`, `amount`, `relevance`, `isReady`) VALUES
(1, 1, 4, 95.2, 1, 1, 0),
(2, 1, 1, 46, 3, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sales_visits`
--

CREATE TABLE `sales_visits` (
  `id` int(11) NOT NULL,
  `saleID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isReceived` tinyint(4) NOT NULL,
  `notes` text NOT NULL,
  `driverID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `extraInfo` text NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `email`, `phone`, `address`, `extraInfo`, `isActive`) VALUES
(0, '', '', '', '', '', 0),
(1, 'Maxiconsumo', '', '', '', '', 1),
(2, 'Rosental', '', '', '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers_u_products`
--

CREATE TABLE `suppliers_u_products` (
  `id` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `price` float NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers_u_products_brands`
--

CREATE TABLE `suppliers_u_products_brands` (
  `id` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `brandID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers_u_products_history`
--

CREATE TABLE `suppliers_u_products_history` (
  `id` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `price` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `timeStart` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timeEnd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `z_history_products_details_u_products_categories`
--

CREATE TABLE `z_history_products_details_u_products_categories` (
  `id` int(11) NOT NULL,
  `productDetailsID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `z_history_products_prices`
--

CREATE TABLE `z_history_products_prices` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `price` float NOT NULL,
  `offert` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `managerID` (`managerID`),
  ADD KEY `cityID` (`cityID`),
  ADD KEY `branchType` (`branchType`);

--
-- Indexes for table `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emailID` (`emailID`),
  ADD KEY `addressID` (`addressID`),
  ADD KEY `passwordID` (`passwordID`),
  ADD KEY `personalInfoID` (`personalInfoID`);

--
-- Indexes for table `buyers_addresses`
--
ALTER TABLE `buyers_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cityID` (`cityID`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indexes for table `buyers_emails`
--
ALTER TABLE `buyers_emails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdReasonID` (`createdReasonID`);

--
-- Indexes for table `buyers_emails_creation_reasons`
--
ALTER TABLE `buyers_emails_creation_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buyers_passwords`
--
ALTER TABLE `buyers_passwords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indexes for table `buyers_personal_info`
--
ALTER TABLE `buyers_personal_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indexes for table `buyers_phones`
--
ALTER TABLE `buyers_phones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleID` (`roleID`);

--
-- Indexes for table `employees_roles`
--
ALTER TABLE `employees_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typeID` (`typeID`);

--
-- Indexes for table `milestones`
--
ALTER TABLE `milestones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branchID` (`branchID`);

--
-- Indexes for table `payments_reasons`
--
ALTER TABLE `payments_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brandID` (`detailsID`),
  ADD KEY `productParentID` (`productParentID`);

--
-- Indexes for table `products_activiy`
--
ALTER TABLE `products_activiy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `products_brands`
--
ALTER TABLE `products_brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentID` (`parentID`);

--
-- Indexes for table `products_details`
--
ALTER TABLE `products_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brandID` (`brandID`);

--
-- Indexes for table `products_details_u_products_categories`
--
ALTER TABLE `products_details_u_products_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productDetailsID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `products_details_u_products_tags`
--
ALTER TABLE `products_details_u_products_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tagID` (`tagID`),
  ADD KEY `productDetailsID` (`productDetailsID`);

--
-- Indexes for table `products_expiration_date`
--
ALTER TABLE `products_expiration_date`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `products_expiration_date_history`
--
ALTER TABLE `products_expiration_date_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseID` (`purchaseID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `products_expiration_date_history_changes`
--
ALTER TABLE `products_expiration_date_history_changes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wasteID` (`wasteID`),
  ADD KEY `saleID` (`saleID`),
  ADD KEY `productID` (`historyID`);

--
-- Indexes for table `products_tags`
--
ALTER TABLE `products_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_u_products_tags`
--
ALTER TABLE `products_u_products_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tagID` (`tagID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `products_wastes`
--
ALTER TABLE `products_wastes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reasonID` (`reasonID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `products_wastes_reasons`
--
ALTER TABLE `products_wastes_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentMethodID` (`paymentMethodID`),
  ADD KEY `supplierID` (`supplierID`),
  ADD KEY `stateID` (`stateID`);

--
-- Indexes for table `purchases_states`
--
ALTER TABLE `purchases_states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases_u_products`
--
ALTER TABLE `purchases_u_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseID` (`purchaseID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`),
  ADD KEY `discountID` (`discountID`),
  ADD KEY `stateID` (`stateID`),
  ADD KEY `paymentTypeID` (`paymentTypeID`),
  ADD KEY `addressID` (`addressID`),
  ADD KEY `paymentStateID` (`paymentStateID`);

--
-- Indexes for table `sales_discounts`
--
ALTER TABLE `sales_discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discountOverID` (`discountOverID`);

--
-- Indexes for table `sales_discounts_activity`
--
ALTER TABLE `sales_discounts_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discountID` (`discountID`);

--
-- Indexes for table `sales_discounts_overs`
--
ALTER TABLE `sales_discounts_overs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_payment_states`
--
ALTER TABLE `sales_payment_states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_payment_type`
--
ALTER TABLE `sales_payment_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_states`
--
ALTER TABLE `sales_states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_u_products`
--
ALTER TABLE `sales_u_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saleID` (`saleID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `sales_visits`
--
ALTER TABLE `sales_visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `driverID` (`driverID`),
  ADD KEY `saleID` (`saleID`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers_u_products`
--
ALTER TABLE `suppliers_u_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierID` (`supplierID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `suppliers_u_products_brands`
--
ALTER TABLE `suppliers_u_products_brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierID` (`supplierID`),
  ADD KEY `brandID` (`brandID`);

--
-- Indexes for table `suppliers_u_products_history`
--
ALTER TABLE `suppliers_u_products_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierID` (`supplierID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indexes for table `z_history_products_details_u_products_categories`
--
ALTER TABLE `z_history_products_details_u_products_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productDetailsID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `z_history_products_prices`
--
ALTER TABLE `z_history_products_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buyers`
--
ALTER TABLE `buyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buyers_addresses`
--
ALTER TABLE `buyers_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buyers_emails`
--
ALTER TABLE `buyers_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buyers_emails_creation_reasons`
--
ALTER TABLE `buyers_emails_creation_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buyers_passwords`
--
ALTER TABLE `buyers_passwords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buyers_personal_info`
--
ALTER TABLE `buyers_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buyers_phones`
--
ALTER TABLE `buyers_phones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees_roles`
--
ALTER TABLE `employees_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `milestones`
--
ALTER TABLE `milestones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments_reasons`
--
ALTER TABLE `payments_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_activiy`
--
ALTER TABLE `products_activiy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_brands`
--
ALTER TABLE `products_brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products_details`
--
ALTER TABLE `products_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `products_details_u_products_categories`
--
ALTER TABLE `products_details_u_products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_details_u_products_tags`
--
ALTER TABLE `products_details_u_products_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_expiration_date`
--
ALTER TABLE `products_expiration_date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_expiration_date_history`
--
ALTER TABLE `products_expiration_date_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_expiration_date_history_changes`
--
ALTER TABLE `products_expiration_date_history_changes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_tags`
--
ALTER TABLE `products_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_u_products_tags`
--
ALTER TABLE `products_u_products_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_wastes`
--
ALTER TABLE `products_wastes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_wastes_reasons`
--
ALTER TABLE `products_wastes_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases_states`
--
ALTER TABLE `purchases_states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases_u_products`
--
ALTER TABLE `purchases_u_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales_discounts`
--
ALTER TABLE `sales_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales_discounts_activity`
--
ALTER TABLE `sales_discounts_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales_discounts_overs`
--
ALTER TABLE `sales_discounts_overs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sales_payment_states`
--
ALTER TABLE `sales_payment_states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sales_payment_type`
--
ALTER TABLE `sales_payment_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales_states`
--
ALTER TABLE `sales_states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales_u_products`
--
ALTER TABLE `sales_u_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales_visits`
--
ALTER TABLE `sales_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `suppliers_u_products`
--
ALTER TABLE `suppliers_u_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers_u_products_brands`
--
ALTER TABLE `suppliers_u_products_brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers_u_products_history`
--
ALTER TABLE `suppliers_u_products_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `z_history_products_details_u_products_categories`
--
ALTER TABLE `z_history_products_details_u_products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `z_history_products_prices`
--
ALTER TABLE `z_history_products_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buyers`
--
ALTER TABLE `buyers`
  ADD CONSTRAINT `buyers_ibfk_1` FOREIGN KEY (`passwordID`) REFERENCES `buyers_passwords` (`id`),
  ADD CONSTRAINT `buyers_ibfk_2` FOREIGN KEY (`emailID`) REFERENCES `buyers_emails` (`id`),
  ADD CONSTRAINT `buyers_ibfk_3` FOREIGN KEY (`personalInfoID`) REFERENCES `buyers_personal_info` (`id`),
  ADD CONSTRAINT `buyers_ibfk_4` FOREIGN KEY (`addressID`) REFERENCES `buyers_addresses` (`id`);

--
-- Constraints for table `buyers_addresses`
--
ALTER TABLE `buyers_addresses`
  ADD CONSTRAINT `buyers_addresses_ibfk_2` FOREIGN KEY (`cityID`) REFERENCES `cities` (`id`);

--
-- Constraints for table `buyers_emails`
--
ALTER TABLE `buyers_emails`
  ADD CONSTRAINT `buyers_emails_ibfk_1` FOREIGN KEY (`createdReasonID`) REFERENCES `buyers_emails_creation_reasons` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`detailsID`) REFERENCES `products_details` (`id`);

--
-- Constraints for table `products_activiy`
--
ALTER TABLE `products_activiy`
  ADD CONSTRAINT `products_activiy_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `products_details`
--
ALTER TABLE `products_details`
  ADD CONSTRAINT `products_details_ibfk_1` FOREIGN KEY (`brandID`) REFERENCES `products_brands` (`id`);

--
-- Constraints for table `products_details_u_products_categories`
--
ALTER TABLE `products_details_u_products_categories`
  ADD CONSTRAINT `products_details_u_products_categories_ibfk_1` FOREIGN KEY (`productDetailsID`) REFERENCES `products_details` (`id`),
  ADD CONSTRAINT `products_details_u_products_categories_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `products_categories` (`id`);

--
-- Constraints for table `products_details_u_products_tags`
--
ALTER TABLE `products_details_u_products_tags`
  ADD CONSTRAINT `products_details_u_products_tags_ibfk_1` FOREIGN KEY (`tagID`) REFERENCES `products_tags` (`id`),
  ADD CONSTRAINT `products_details_u_products_tags_ibfk_2` FOREIGN KEY (`productDetailsID`) REFERENCES `products_details` (`id`);

--
-- Constraints for table `products_expiration_date`
--
ALTER TABLE `products_expiration_date`
  ADD CONSTRAINT `products_expiration_date_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `products_expiration_date_history`
--
ALTER TABLE `products_expiration_date_history`
  ADD CONSTRAINT `products_expiration_date_history_ibfk_1` FOREIGN KEY (`purchaseID`) REFERENCES `purchases` (`id`),
  ADD CONSTRAINT `products_expiration_date_history_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `products_expiration_date_history_changes`
--
ALTER TABLE `products_expiration_date_history_changes`
  ADD CONSTRAINT `products_expiration_date_history_changes_ibfk_1` FOREIGN KEY (`historyID`) REFERENCES `products_expiration_date_history` (`id`),
  ADD CONSTRAINT `products_expiration_date_history_changes_ibfk_2` FOREIGN KEY (`wasteID`) REFERENCES `products_wastes` (`id`),
  ADD CONSTRAINT `products_expiration_date_history_changes_ibfk_3` FOREIGN KEY (`saleID`) REFERENCES `sales` (`id`);

--
-- Constraints for table `products_u_products_tags`
--
ALTER TABLE `products_u_products_tags`
  ADD CONSTRAINT `products_u_products_tags_ibfk_1` FOREIGN KEY (`tagID`) REFERENCES `products_tags` (`id`),
  ADD CONSTRAINT `products_u_products_tags_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `products_wastes`
--
ALTER TABLE `products_wastes`
  ADD CONSTRAINT `products_wastes_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `products_wastes_ibfk_2` FOREIGN KEY (`reasonID`) REFERENCES `products_wastes_reasons` (`id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`stateID`) REFERENCES `purchases_states` (`id`);

--
-- Constraints for table `purchases_u_products`
--
ALTER TABLE `purchases_u_products`
  ADD CONSTRAINT `purchases_u_products_ibfk_1` FOREIGN KEY (`purchaseID`) REFERENCES `purchases` (`id`),
  ADD CONSTRAINT `purchases_u_products_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`buyerID`) REFERENCES `buyers` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`paymentTypeID`) REFERENCES `sales_payment_type` (`id`),
  ADD CONSTRAINT `sales_ibfk_3` FOREIGN KEY (`addressID`) REFERENCES `buyers_addresses` (`id`),
  ADD CONSTRAINT `sales_ibfk_4` FOREIGN KEY (`paymentStateID`) REFERENCES `sales_payment_states` (`id`),
  ADD CONSTRAINT `sales_ibfk_5` FOREIGN KEY (`stateID`) REFERENCES `sales_states` (`id`),
  ADD CONSTRAINT `sales_ibfk_6` FOREIGN KEY (`discountID`) REFERENCES `sales_discounts` (`id`);

--
-- Constraints for table `sales_discounts`
--
ALTER TABLE `sales_discounts`
  ADD CONSTRAINT `sales_discounts_ibfk_1` FOREIGN KEY (`discountOverID`) REFERENCES `sales_discounts_overs` (`id`);

--
-- Constraints for table `sales_discounts_activity`
--
ALTER TABLE `sales_discounts_activity`
  ADD CONSTRAINT `sales_discounts_activity_ibfk_1` FOREIGN KEY (`discountID`) REFERENCES `sales_discounts` (`id`);

--
-- Constraints for table `sales_u_products`
--
ALTER TABLE `sales_u_products`
  ADD CONSTRAINT `sales_u_products_ibfk_1` FOREIGN KEY (`saleID`) REFERENCES `sales` (`id`),
  ADD CONSTRAINT `sales_u_products_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `sales_visits`
--
ALTER TABLE `sales_visits`
  ADD CONSTRAINT `sales_visits_ibfk_1` FOREIGN KEY (`saleID`) REFERENCES `sales` (`id`),
  ADD CONSTRAINT `sales_visits_ibfk_2` FOREIGN KEY (`driverID`) REFERENCES `employees` (`id`);

--
-- Constraints for table `suppliers_u_products`
--
ALTER TABLE `suppliers_u_products`
  ADD CONSTRAINT `suppliers_u_products_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `suppliers_u_products_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `suppliers_u_products_brands`
--
ALTER TABLE `suppliers_u_products_brands`
  ADD CONSTRAINT `suppliers_u_products_brands_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `suppliers_u_products_brands_ibfk_2` FOREIGN KEY (`brandID`) REFERENCES `products_brands` (`id`);

--
-- Constraints for table `suppliers_u_products_history`
--
ALTER TABLE `suppliers_u_products_history`
  ADD CONSTRAINT `suppliers_u_products_history_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `suppliers_u_products_history_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`);

--
-- Constraints for table `z_history_products_details_u_products_categories`
--
ALTER TABLE `z_history_products_details_u_products_categories`
  ADD CONSTRAINT `z_history_products_details_u_products_categories_ibfk_1` FOREIGN KEY (`productDetailsID`) REFERENCES `products_details` (`id`),
  ADD CONSTRAINT `z_history_products_details_u_products_categories_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `products_categories` (`id`);

--
-- Constraints for table `z_history_products_prices`
--
ALTER TABLE `z_history_products_prices`
  ADD CONSTRAINT `z_history_products_prices_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
