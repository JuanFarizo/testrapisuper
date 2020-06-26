-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2019 a las 11:41:02
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rapisuper`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `branches`
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
-- Estructura de tabla para la tabla `buyers`
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
-- Volcado de datos para la tabla `buyers`
--

INSERT INTO `buyers` (`id`, `emailID`, `personalInfoID`, `addressID`, `passwordID`, `isActive`, `dateCreated`) VALUES
(0, 0, 0, 0, 0, 0, '2019-08-11 16:56:18'),
(1, 1, 1, 1, 1, 1, '2019-08-11 16:56:18'),
(2, 2, 2, 2, 2, 1, '2019-08-11 16:56:18'),
(3, 3, 3, 3, 3, 1, '2019-08-11 16:56:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers_addresses`
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
-- Volcado de datos para la tabla `buyers_addresses`
--

INSERT INTO `buyers_addresses` (`id`, `buyerID`, `relevance`, `cityID`, `streetName`, `streetNumber`, `floorAndApartment`, `extraReferences`, `isActive`, `dateCreated`) VALUES
(0, 0, 1, 0, '', '', '', '', 1, '2019-08-10 15:34:04'),
(1, 1, 1, 1, 'Buenos Aires', '1454', '9 C', 'Entre Zeballos y 9 de Julio', 1, '2019-08-10 15:34:04'),
(2, 2, 1, 1, 'Rivadavia', '0158', '', '', 1, '2019-08-10 15:34:04'),
(3, 3, 1, 1, 'Rivadavia', '0158', '', '', 1, '2019-08-10 15:34:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers_emails`
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
-- Volcado de datos para la tabla `buyers_emails`
--

INSERT INTO `buyers_emails` (`id`, `email`, `isSuscriptionActive`, `isConfirmed`, `isActive`, `createdReasonID`, `dateCreated`) VALUES
(0, '', 0, 0, 0, 0, '2019-08-11 17:00:12'),
(1, 'lisandrodc06@gmail.com', 1, 1, 1, 1, '2019-08-10 15:19:14'),
(2, 'lauta_dc@hotmail.com', 1, 1, 1, 1, '2019-08-10 15:19:14'),
(3, 'mdallacosta@lheritier.com.ar', 1, 1, 1, 1, '2019-08-10 15:19:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers_emails_creation_reasons`
--

CREATE TABLE `buyers_emails_creation_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `buyers_emails_creation_reasons`
--

INSERT INTO `buyers_emails_creation_reasons` (`id`, `reason`, `dateCreated`) VALUES
(0, 'Otros', '2019-08-11 17:01:01'),
(1, 'Al crear usuario', '2019-07-02 02:26:56'),
(2, 'Para recibir newsletter', '2019-07-02 02:26:56'),
(3, 'Para recibir descuentos', '2019-07-02 02:26:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers_passwords`
--

CREATE TABLE `buyers_passwords` (
  `id` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `buyers_passwords`
--

INSERT INTO `buyers_passwords` (`id`, `buyerID`, `password`, `dateCreated`) VALUES
(0, 0, '', '2019-08-11 17:02:01'),
(1, 1, '41637203', '2019-08-11 00:36:34'),
(2, 2, '34770668', '2019-08-11 00:36:34'),
(3, 3, '13947183', '2019-08-11 00:36:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers_personal_info`
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
-- Volcado de datos para la tabla `buyers_personal_info`
--

INSERT INTO `buyers_personal_info` (`id`, `buyerID`, `relevance`, `name`, `surname`, `dob`, `isActive`, `dateCreated`) VALUES
(0, 0, 1, 'Don', 'Nadie', '1999-08-30', 0, '2019-08-11 05:40:22'),
(1, 1, 1, 'Lisandro', 'Dalla Costa', '1999-08-30', 1, '2019-08-11 05:40:22'),
(2, 2, 1, 'Lautaro', 'Dalla Costa', '1989-10-18', 1, '2019-08-11 05:40:22'),
(3, 3, 1, 'Marcelo', 'Dalla Costa', '1949-11-14', 1, '2019-08-11 05:40:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers_phones`
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
-- Volcado de datos para la tabla `buyers_phones`
--

INSERT INTO `buyers_phones` (`id`, `buyerID`, `relevance`, `phone`, `isActive`, `dateCreated`) VALUES
(0, 0, 1, '0000 000000', 0, '2019-08-11 17:04:07'),
(1, 1, 1, '3404 507421', 1, '2019-08-11 16:52:16'),
(2, 2, 1, '3404 434515', 1, '2019-08-11 16:52:16'),
(3, 3, 1, '3404 408938', 1, '2019-08-11 16:52:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers_views`
--

CREATE TABLE `buyers_views` (
  `id` int(11) NOT NULL,
  `buyerID` int(11) NOT NULL,
  `timeStart` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timeEnd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `city` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `city`) VALUES
(0, 'El Mundo'),
(1, 'San Carlos Centro'),
(2, 'San Carlos Sur');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
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
-- Estructura de tabla para la tabla `employees_roles`
--

CREATE TABLE `employees_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expenses`
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
-- Volcado de datos para la tabla `expenses`
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
(9, 'Dominio rapisuper.com.ar', 1, 270, 0, '2019-09-05 18:05:56', 'Pagado por Lisandro'),
(10, 'Bicicleta triciclo', 1, 2000, 0, '2019-09-17 22:10:45', 'Pagado por Lisandro'),
(11, 'Pago a Lisandro', 1, 1520, 0, '2019-10-04 14:20:41', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `milestones`
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
-- Estructura de tabla para la tabla `payments_reasons`
--

CREATE TABLE `payments_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `detailsID` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `variantName` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `stockAlert` int(11) NOT NULL,
  `iva` float NOT NULL,
  `bottleID` int(11) NOT NULL,
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
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `detailsID`, `fullName`, `variantName`, `stock`, `stockAlert`, `iva`, `bottleID`, `variantPrice`, `variantOffert`, `productParentID`, `parentMultiplier`, `extraDescription`, `imagesAmount`, `barsCode`, `isActive`, `onlySuppliers`, `dateCreated`) VALUES
(0, 0, '', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-09-05 23:30:35'),
(1, 1, 'Papas fritas', 'naranja', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 1, 0, '2019-09-17 23:33:37'),
(2, 2, 'Arroz', 'naranja', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 1, 0, '2019-09-17 23:33:37'),
(3, 16, 'test', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 1, 0, '2019-10-07 23:51:05'),
(4, 4, 'Arroz Rissoto 4 quesos Gallo 200g', '4 quesos', 0, 0, 21, 0, 0, 52, 0, 10, 'en variedad de 4 quesos', 1, '54646546446', 0, 0, '2019-09-24 19:31:55'),
(5, 0, '', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-09-05 23:30:35'),
(6, 1, 'Sobre de jugo Rapisuper naranja 100g', 'naranja', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-09-17 23:33:37'),
(7, 4, 'Arroz Rissoto 4 quesos Gallo 200g', '4 quesos', 0, 0, 21, 0, 0, 52, 0, 10, 'en variedad de 4 quesos', 1, '54646546446', 0, 0, '2019-09-24 19:31:55'),
(8, 8, 'esparrago', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-09-30 15:39:53'),
(9, 8, 'esparrago', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-09-30 15:39:53'),
(10, 1, 'Sobre de jugo Rapisuper naranja 100g', 'naranja', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-09-17 23:33:37'),
(11, 16, 'test', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-07 23:51:05'),
(12, 17, 'testtt', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-07 23:56:20'),
(13, 18, 'papa', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-07 23:58:13'),
(14, 19, 'rarata', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-08 00:01:07'),
(15, 20, 'va va', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-08 00:02:17'),
(16, 21, 'este si', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-08 00:03:06'),
(17, 22, 'Putosssssss', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-08 00:04:05'),
(18, 23, 'nana', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-08 00:08:54'),
(19, 24, 'sadasd', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-08 00:09:22'),
(20, 25, 'asdasdads', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 0, 0, '2019-10-08 00:10:06'),
(21, 26, 'nue vaso', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 1, 0, '2019-10-08 00:11:45'),
(22, 27, 'siiiiiiiiii', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 1, 0, '2019-10-08 00:30:18'),
(23, 28, 'asdas', '', 0, 0, 21, 0, 0, 0, 0, 0, '', 1, '', 1, 0, '2019-10-08 15:39:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_brands`
--

CREATE TABLE `products_brands` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products_brands`
--

INSERT INTO `products_brands` (`id`, `name`, `dateCreated`, `isActive`) VALUES
(0, '', '2019-09-05 02:23:58', 0),
(1, 'Rapisuper', '2019-08-08 15:56:46', 1),
(2, 'Gallo', '2019-09-24 19:25:28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_categories`
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
-- Volcado de datos para la tabla `products_categories`
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
-- Estructura de tabla para la tabla `products_details`
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
-- Volcado de datos para la tabla `products_details`
--

INSERT INTO `products_details` (`id`, `brandID`, `name`, `price`, `offert`, `description`, `dateCreated`) VALUES
(0, 0, '', 0, 0, '', '2019-09-05 02:23:23'),
(1, 1, 'Sobre de jugo { marca } { variante } 100g', 19, 0, '', '2019-09-17 23:33:37'),
(2, 0, '', 333, 0, '', '2019-09-19 14:31:17'),
(3, 0, 'tesr1', 0, 0, '', '2019-09-19 21:49:30'),
(4, 2, 'Arroz Rissoto { variante } { marca } 200g', 83.38, 70, 'Los arroces más rico del país', '2019-09-24 19:31:54'),
(5, 0, 'rotura', 0, 0, '', '2019-09-30 15:33:56'),
(6, 0, 'rotoRoto', 0, 0, '', '2019-09-30 15:35:38'),
(7, 0, 'rotin roton', 0, 0, '', '2019-09-30 15:37:24'),
(8, 0, 'esparrago', 0, 0, '', '2019-09-30 15:39:52'),
(9, 0, 'ful ful', 0, 0, '', '2019-09-30 15:40:52'),
(10, 0, 'testsstssad', 0, 0, '', '2019-10-01 00:03:52'),
(11, 0, 'afsdsfsad', 0, 0, '', '2019-10-01 11:05:15'),
(12, 0, '', 0, 0, '', '2019-10-01 20:01:35'),
(13, 0, 'nadaaaaa', 0, 0, '', '2019-10-07 23:48:39'),
(14, 0, 'nadis', 0, 0, '', '2019-10-07 23:48:51'),
(15, 0, 'holiwinki', 0, 0, '', '2019-10-07 23:49:15'),
(16, 0, 'test', 0, 0, '', '2019-10-07 23:51:05'),
(17, 0, 'testtt', 0, 0, '', '2019-10-07 23:56:20'),
(18, 0, 'papa', 0, 0, '', '2019-10-07 23:58:13'),
(19, 0, 'rarata', 0, 0, '', '2019-10-08 00:01:07'),
(20, 0, 'va va', 0, 0, '', '2019-10-08 00:02:16'),
(21, 0, 'este si', 0, 0, '', '2019-10-08 00:03:06'),
(22, 0, 'Putosssssss', 0, 0, '', '2019-10-08 00:04:05'),
(23, 0, 'nana', 0, 0, '', '2019-10-08 00:08:54'),
(24, 0, 'sadasd', 0, 0, '', '2019-10-08 00:09:22'),
(25, 0, 'asdasdads', 0, 0, '', '2019-10-08 00:10:06'),
(26, 0, 'nue vaso', 23.4, 0, '', '2019-10-08 00:11:45'),
(27, 0, 'siiiiiiiiii', 25, 0, '', '2019-10-08 00:30:18'),
(28, 0, 'asdas', 30, 0, '', '2019-10-08 15:39:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_details_u_products_categories`
--

CREATE TABLE `products_details_u_products_categories` (
  `id` int(11) NOT NULL,
  `productDetailsID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products_details_u_products_categories`
--

INSERT INTO `products_details_u_products_categories` (`id`, `productDetailsID`, `categoryID`, `isActive`, `dateCreated`) VALUES
(1, 3, 2, 1, '2019-09-19 21:49:31'),
(2, 3, 5, 1, '2019-09-19 21:49:31'),
(3, 4, 4, 1, '2019-09-24 19:31:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_details_u_products_tags`
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
-- Estructura de tabla para la tabla `products_expiration_date`
--

CREATE TABLE `products_expiration_date` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `expirationDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_expiration_date_history`
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
-- Estructura de tabla para la tabla `products_expiration_date_history_changes`
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
-- Estructura de tabla para la tabla `products_tags`
--

CREATE TABLE `products_tags` (
  `id` int(11) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_u_products_tags`
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
-- Estructura de tabla para la tabla `products_wastes`
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
-- Estructura de tabla para la tabla `products_wastes_reasons`
--

CREATE TABLE `products_wastes_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `dateArrived` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `stateID` int(11) NOT NULL DEFAULT '4',
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `isOrdered` tinyint(4) NOT NULL DEFAULT '0',
  `datePayed` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `paymentMethodID` int(11) NOT NULL,
  `totalProducts` float NOT NULL,
  `totalShipping` float NOT NULL,
  `totalTotal` float NOT NULL,
  `discount` float NOT NULL,
  `notes` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateCancelation` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `dateOrdered` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `cancelationReasonID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`id`, `supplierID`, `dateArrived`, `stateID`, `isActive`, `isOrdered`, `datePayed`, `paymentMethodID`, `totalProducts`, `totalShipping`, `totalTotal`, `discount`, `notes`, `dateCreated`, `dateCancelation`, `dateOrdered`, `cancelationReasonID`) VALUES
(1, 1, '0000-00-00 00:00:00', 1, 0, 0, '0000-00-00 00:00:00', 11, 1, 1, 1, 1, '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(2, 2, '0000-00-00 00:00:00', 2, 0, 0, '0000-00-00 00:00:00', 22, 2, 2, 2, 2, '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2),
(3, 4, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 02:47:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(4, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 02:49:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(5, 2, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 02:53:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(6, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 02:56:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(7, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:01:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(8, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:03:21', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(9, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:04:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(10, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:06:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(11, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:10:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(12, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:13:46', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(13, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:17:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(14, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:20:39', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(15, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:21:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(16, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:25:10', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(17, 3, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-25 03:28:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(18, 1, '0000-00-00 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-26 13:44:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(19, 3, '0000-00-00 00:00:00', 1, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-26 21:09:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(20, 2, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-26 21:48:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(21, 1, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-29 16:41:12', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(22, 3, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-29 17:37:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(23, 2, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-29 17:37:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(24, 2, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 14:07:01', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(25, 4, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 14:18:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(26, 2, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 15:04:39', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(27, 1, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 15:10:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(28, 3, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 15:11:17', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(29, 4, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 17:29:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(30, 4, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 18:17:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(31, 1, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 21:30:26', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(32, 2, '0000-00-00 00:00:00', 4, 1, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 21:30:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(33, 1, '0000-00-00 00:00:00', 4, 0, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 22:18:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(34, 3, '0000-00-00 00:00:00', 4, 1, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 0, '', '2019-10-30 23:42:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases_canceled_reasons`
--

CREATE TABLE `purchases_canceled_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases_states`
--

CREATE TABLE `purchases_states` (
  `id` int(11) NOT NULL,
  `state` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `purchases_states`
--

INSERT INTO `purchases_states` (`id`, `state`) VALUES
(0, 'Indefinido'),
(1, 'Encargada'),
(2, 'Recibida'),
(3, 'Cancelada'),
(4, 'Sin terminar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases_u_products`
--

CREATE TABLE `purchases_u_products` (
  `id` int(11) NOT NULL,
  `purchaseID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` float NOT NULL,
  `isReceived` tinyint(4) NOT NULL,
  `notes` text NOT NULL,
  `error` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `purchases_u_products`
--

INSERT INTO `purchases_u_products` (`id`, `purchaseID`, `productID`, `amount`, `price`, `isReceived`, `notes`, `error`, `isActive`, `dateTime`) VALUES
(1, 1, 2, 10, 15, 0, '1', 1, 0, '2019-10-30 17:29:33'),
(2, 2, 2, 10, 15, 0, '2', 2, 0, '2019-10-30 17:29:33'),
(3, 4, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(4, 5, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(5, 3, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(6, 6, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(7, 1, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(8, 7, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(9, 8, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(10, 9, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(11, 10, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(12, 11, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(13, 12, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(14, 13, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(15, 14, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(16, 15, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(17, 16, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(18, 17, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(19, 18, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(20, 19, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(21, 1, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(22, 20, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(23, 21, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(24, 22, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(25, 23, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(26, 24, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(27, 25, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(28, 26, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(29, 27, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(30, 26, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(31, 28, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(32, 28, 2, 10, 15, 0, '', 0, 0, '2019-10-30 17:29:33'),
(33, 29, 2, 20, 35, 0, '', 0, 0, '2019-10-30 17:47:04'),
(34, 30, 2, 0, 35, 0, '', 0, 0, '2019-10-30 21:59:37'),
(35, 31, 1, 0, 20, 0, '', 0, 0, '2019-10-30 22:16:55'),
(36, 32, 3, 9, 10, 0, '', 0, 1, '2019-10-30 21:30:41'),
(37, 31, 2, 0, 1.21, 0, '', 0, 0, '2019-10-30 22:17:23'),
(38, 33, 2, 0, 1.21, 0, '', 0, 0, '2019-10-30 22:19:29'),
(39, 34, 1, 15, 15, 0, '', 0, 1, '2019-10-30 23:42:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
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
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `tempNum`, `buyerID`, `addressID`, `date`, `totalProducts`, `totalShipping`, `totalTotal`, `stateID`, `paymentStateID`, `paymentTypeID`, `discount`, `discountID`, `notes`) VALUES
(1, 1, 1, 1, '2019-08-11 17:41:22', 47, 0, 47, 1, 1, 1, 0, 0, 'notis'),
(2, 2, 2, 1, '2019-08-11 18:41:22', 77, 0, 77, 1, 1, 2, 0, 0, 'notis'),
(3, 2, 2, 1, '2019-08-11 18:41:22', 99, 0, 99, 1, 1, 1, 0, 0, 'notis');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_discounts`
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
-- Volcado de datos para la tabla `sales_discounts`
--

INSERT INTO `sales_discounts` (`id`, `discountOverID`, `discountName`, `discountAmount`, `isActive`, `dateCreated`) VALUES
(0, 0, 'nothing', 0, 0, '2019-08-11 17:16:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_discounts_activity`
--

CREATE TABLE `sales_discounts_activity` (
  `id` int(11) NOT NULL,
  `discountID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_discounts_overs`
--

CREATE TABLE `sales_discounts_overs` (
  `id` int(11) NOT NULL,
  `over` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sales_discounts_overs`
--

INSERT INTO `sales_discounts_overs` (`id`, `over`) VALUES
(0, 'nothing'),
(1, 'totalProducts'),
(2, 'totalShipping'),
(3, 'totalTotal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_payment_states`
--

CREATE TABLE `sales_payment_states` (
  `id` int(11) NOT NULL,
  `payment_state` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sales_payment_states`
--

INSERT INTO `sales_payment_states` (`id`, `payment_state`, `dateCreated`) VALUES
(1, 'Pago en espera', '2019-08-11 17:37:27'),
(2, 'Pagado', '2019-08-11 17:37:27'),
(3, 'Pago canceado', '2019-08-11 17:37:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_payment_types`
--

CREATE TABLE `sales_payment_types` (
  `id` int(11) NOT NULL,
  `paymentType` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sales_payment_types`
--

INSERT INTO `sales_payment_types` (`id`, `paymentType`, `dateCreated`) VALUES
(1, 'Efectivo', '2019-08-11 17:36:26'),
(2, 'Tarjeta', '2019-08-11 17:36:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_states`
--

CREATE TABLE `sales_states` (
  `id` int(11) NOT NULL,
  `state` varchar(50) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sales_states`
--

INSERT INTO `sales_states` (`id`, `state`, `dateCreated`) VALUES
(1, 'Pedido', '2019-08-11 17:34:53'),
(2, 'Entregado', '2019-10-07 17:40:48'),
(3, 'Cancelado', '2019-10-07 17:40:48'),
(4, 'Reprogramando', '2019-10-07 17:40:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_u_products`
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
-- Volcado de datos para la tabla `sales_u_products`
--

INSERT INTO `sales_u_products` (`id`, `saleID`, `productID`, `price`, `amount`, `relevance`, `isReady`) VALUES
(1, 1, 4, 95.2, 2, 1, 1),
(2, 1, 1, 46, 2, 3, 0),
(3, 1, 3, 33.3, 4, 4, 1),
(4, 1, 2, 44.4, 3, 2, 1),
(5, 2, 7, 158, 2, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_visits`
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
-- Estructura de tabla para la tabla `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `percentageCharge` float NOT NULL,
  `fixedCharge` float NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `extraInfo` text NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `email`, `percentageCharge`, `fixedCharge`, `phone`, `address`, `extraInfo`, `isActive`) VALUES
(0, '', '', 0, 0, '', '', '', 0),
(1, 'Maxiconsumo', '', 5, 0, '', '', '', 1),
(2, 'Rosental', '', 8, 0, '', '', '', 1),
(3, 'Yaguar', '', 4, 0, '', '', '', 1),
(4, 'Puma', '', 10, 0, '', '', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suppliers_u_products`
--

CREATE TABLE `suppliers_u_products` (
  `id` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `price` float NOT NULL,
  `minAmount` int(11) NOT NULL,
  `priceMultiplier` float NOT NULL DEFAULT '1.3',
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `suppliers_u_products`
--

INSERT INTO `suppliers_u_products` (`id`, `supplierID`, `productID`, `price`, `minAmount`, `priceMultiplier`, `dateTime`, `isActive`) VALUES
(1, 1, 1, 20, 0, 1.3, '2019-10-30 17:22:11', 1),
(2, 2, 2, 12, 0, 1.3, '2019-10-29 17:29:01', 1),
(3, 2, 1, 1.2, 0, 1.3, '0000-00-00 00:00:00', 0),
(4, 1, 2, 2, 0, 1.3, '2019-10-16 09:24:36', 0),
(5, 0, 2, 0, 0, 1.3, '2019-10-22 15:00:16', 0),
(6, 0, 2, 0, 0, 1.3, '2019-10-22 15:00:19', 0),
(7, 0, 1, 0, 0, 1.3, '2019-10-22 16:53:15', 0),
(8, 0, 1, 0, 0, 1.3, '2019-10-22 16:53:46', 0),
(9, 0, 1, 0, 0, 1.3, '2019-10-22 17:02:13', 0),
(10, 0, 2, 0, 0, 1.3, '2019-10-22 17:02:28', 0),
(11, 0, 2, 0, 0, 1.3, '2019-10-22 17:03:44', 0),
(12, 0, 2, 0, 0, 1.3, '2019-10-22 17:08:01', 0),
(13, 0, 2, 0, 0, 1.3, '2019-10-22 17:09:15', 0),
(14, 0, 2, 0, 0, 1.3, '2019-10-22 17:09:59', 0),
(15, 0, 2, 0, 0, 1.3, '2019-10-22 17:10:25', 0),
(16, 0, 2, 0, 0, 1.3, '2019-10-22 17:10:43', 0),
(17, 0, 2, 0, 0, 1.3, '2019-10-22 17:12:02', 0),
(18, 0, 2, 0, 0, 1.3, '2019-10-22 17:12:36', 0),
(19, 0, 2, 0, 0, 1.3, '2019-10-22 17:13:27', 0),
(20, 0, 2, 0, 0, 1.3, '2019-10-22 17:14:29', 0),
(21, 0, 2, 0, 0, 1.3, '2019-10-22 17:15:34', 0),
(22, 0, 2, 0, 0, 1.3, '2019-10-22 17:16:08', 0),
(23, 0, 2, 0, 0, 1.3, '2019-10-22 17:16:44', 0),
(24, 0, 2, 0, 0, 1.3, '2019-10-22 17:17:21', 0),
(25, 0, 2, 0, 0, 1.3, '2019-10-22 17:17:36', 0),
(26, 0, 2, 0, 0, 1.3, '2019-10-22 17:17:45', 0),
(27, 2, 2, 15.5, 0, 1.3, '2019-10-22 17:30:57', 0),
(28, 3, 2, 35, 0, 1.3, '2019-10-23 04:33:57', 0),
(29, 3, 2, 0, 0, 1.3, '2019-10-23 04:34:53', 0),
(30, 3, 2, 315, 0, 1.3, '2019-10-23 04:35:52', 0),
(31, 2, 1, 0, 0, 1.3, '2019-10-23 12:04:08', 0),
(32, 2, 1, 0, 0, 1.3, '2019-10-23 12:27:51', 0),
(33, 1, 1, 0, 10, 1.3, '2019-10-23 13:44:19', 0),
(34, 4, 1, 0, 0, 1.3, '2019-10-23 15:08:50', 0),
(35, 3, 1, 0, 0, 1.3, '2019-10-23 15:09:03', 0),
(36, 4, 2, 0, 0, 1.3, '2019-10-23 15:21:54', 0),
(37, 4, 2, 0, 0, 1.3, '2019-10-23 15:26:01', 0),
(38, 1, 2, 0, 0, 1.3, '2019-10-23 15:39:22', 0),
(39, 4, 2, 0, 0, 1.3, '2019-10-23 15:39:48', 0),
(40, 3, 2, 0, 0, 1.3, '2019-10-23 15:39:53', 0),
(41, 1, 2, 1.21, 5, 1.3, '2019-10-30 22:19:27', 1),
(42, 3, 2, 20, 1, 1.3, '2019-10-30 21:59:20', 1),
(43, 4, 2, 35, 3, 1.3, '2019-10-30 21:59:31', 1),
(44, 3, 1, 15, 0, 1.3, '2019-10-30 15:11:20', 1),
(45, 2, 3, 10, 0, 1.3, '2019-10-30 15:10:56', 1),
(46, 2, 21, 18, 0, 1.3, '2019-10-30 22:43:11', 1),
(47, 3, 22, 0, 0, 1.3, '2019-10-30 22:29:22', 1),
(48, 4, 23, 0, 0, 1.3, '2019-10-30 22:31:08', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suppliers_u_products_history`
--

CREATE TABLE `suppliers_u_products_history` (
  `id` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `price` float NOT NULL,
  `minAmount` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `suppliers_u_products_history`
--

INSERT INTO `suppliers_u_products_history` (`id`, `supplierID`, `productID`, `price`, `minAmount`, `date`, `isActive`) VALUES
(1, 2, 1, 0, 0, '2019-10-23 12:04:08', 1),
(2, 2, 1, 0, 0, '2019-10-23 12:27:51', 1),
(3, 1, 1, 0, 0, '2019-10-23 13:44:19', 1),
(4, 1, 1, 0, 10, '2019-10-23 13:45:31', 1),
(5, 1, 1, 0, 10, '2019-10-23 13:45:45', 1),
(6, 1, 1, 0, 10, '2019-10-23 13:45:53', 1),
(7, 0, 2, 0, 0, '2019-10-23 13:46:46', 1),
(8, 0, 2, 0, 0, '2019-10-23 13:46:49', 1),
(9, 0, 2, 20, 0, '2019-10-23 13:46:53', 1),
(10, 0, 2, 20, 0, '2019-10-23 13:46:55', 1),
(11, 0, 2, 35, 0, '2019-10-23 13:46:58', 1),
(12, 0, 2, 315, 0, '2019-10-23 13:49:51', 1),
(13, 4, 1, 0, 0, '2019-10-23 15:08:50', 1),
(14, 3, 1, 0, 0, '2019-10-23 15:09:03', 1),
(15, 4, 2, 0, 0, '2019-10-23 15:21:54', 1),
(16, 4, 2, 0, 0, '2019-10-23 15:26:01', 1),
(17, 1, 2, 0, 0, '2019-10-23 15:39:22', 1),
(18, 4, 2, 0, 0, '2019-10-23 15:39:48', 1),
(19, 3, 2, 0, 0, '2019-10-23 15:39:53', 1),
(20, 2, 2, 12, 0, '2019-10-23 19:59:12', 1),
(21, 2, 2, 12, 0, '2019-10-23 20:29:31', 1),
(22, 1, 2, 0, 0, '2019-10-24 00:12:17', 1),
(23, 1, 2, 17, 0, '2019-10-24 17:09:31', 1),
(24, 2, 2, 5, 0, '2019-10-24 20:53:05', 1),
(25, 3, 2, 0, 0, '2019-10-24 20:59:34', 1),
(26, 3, 2, 14, 0, '2019-10-24 20:59:39', 1),
(27, 4, 2, 0, 0, '2019-10-24 21:06:55', 1),
(28, 1, 2, 2, 0, '2019-10-24 22:22:18', 1),
(29, 1, 2, 12, 0, '2019-10-26 13:06:25', 1),
(30, 1, 1, 66, 0, '2019-10-26 13:19:08', 1),
(31, 1, 1, 55, 0, '2019-10-26 13:20:57', 1),
(32, 1, 1, 12, 0, '2019-10-26 13:21:37', 1),
(33, 1, 1, 15, 0, '2019-10-26 13:26:00', 1),
(34, 1, 1, 21, 0, '2019-10-26 13:28:29', 1),
(35, 1, 1, 21, 0, '2019-10-26 13:30:14', 1),
(36, 1, 1, 21, 5, '2019-10-26 13:38:05', 1),
(37, 1, 1, 21, 7, '2019-10-26 13:39:17', 1),
(38, 1, 1, 21, 5, '2019-10-26 13:39:52', 0),
(39, 1, 1, 21, 7, '2019-10-26 13:44:13', 1),
(40, 1, 1, 21, 6, '2019-10-26 13:44:28', 1),
(41, 1, 1, 21, 8, '2019-10-26 13:45:21', 1),
(42, 3, 2, 20, 0, '2019-10-26 21:10:43', 1),
(43, 2, 2, 17, 0, '2019-10-27 22:28:15', 1),
(44, 2, 2, 21, 0, '2019-10-27 22:29:10', 1),
(45, 2, 2, 24, 0, '2019-10-27 22:31:06', 1),
(46, 1, 1, 25, 8, '2019-10-27 22:34:33', 1),
(47, 4, 2, 88, 0, '2019-10-27 22:34:47', 1),
(48, 3, 1, 0, 0, '2019-10-29 16:38:03', 1),
(49, 1, 1, 27, 8, '2019-10-29 16:39:13', 1),
(50, 4, 2, 788, 0, '2019-10-29 16:45:03', 1),
(51, 4, 2, 5, 0, '2019-10-29 16:45:07', 1),
(52, 3, 2, 11, 0, '2019-10-29 16:45:55', 1),
(53, 4, 2, 9, 0, '2019-10-29 16:46:59', 1),
(54, 4, 2, 47, 0, '2019-10-29 16:48:08', 1),
(55, 4, 2, 58, 0, '2019-10-29 17:26:54', 1),
(56, 2, 2, 12, 0, '2019-10-29 17:29:01', 1),
(57, 1, 1, 58, 8, '2019-10-29 17:29:08', 1),
(58, 3, 2, 7, 0, '2019-10-29 17:30:04', 1),
(59, 1, 2, 1, 0, '2019-10-29 17:30:38', 1),
(60, 3, 2, 7, 1, '2019-10-29 17:30:48', 1),
(61, 4, 2, 58, 0, '2019-10-29 17:31:01', 1),
(62, 2, 3, 0, 0, '2019-10-29 17:58:27', 1),
(63, 4, 2, 58, 0, '2019-10-29 18:02:09', 1),
(64, 2, 3, 10, 0, '2019-10-30 15:10:56', 1),
(65, 3, 1, 15, 0, '2019-10-30 15:11:21', 1),
(66, 1, 1, 20, 8, '2019-10-30 15:13:31', 1),
(67, 1, 1, 20, 0, '2019-10-30 17:22:11', 1),
(68, 4, 2, 15, 0, '2019-10-30 17:29:33', 1),
(69, 4, 2, 20, 0, '2019-10-30 17:32:55', 1),
(70, 4, 2, 25, 0, '2019-10-30 17:34:39', 1),
(71, 4, 2, 30, 0, '2019-10-30 17:35:14', 1),
(72, 4, 2, 35, 0, '2019-10-30 17:35:52', 1),
(73, 4, 2, 30, 0, '2019-10-30 17:44:24', 1),
(74, 4, 2, 35, 0, '2019-10-30 17:45:12', 1),
(75, 4, 2, 40, 0, '2019-10-30 17:45:58', 1),
(76, 4, 2, 35, 0, '2019-10-30 17:46:56', 1),
(77, 3, 2, 10, 1, '2019-10-30 21:55:10', 1),
(78, 3, 2, 10, 1, '2019-10-30 21:58:28', 1),
(79, 3, 2, 10, 1, '2019-10-30 21:59:08', 1),
(80, 3, 2, 20, 1, '2019-10-30 21:59:20', 1),
(81, 4, 2, 35, 3, '2019-10-30 21:59:38', 1),
(82, 1, 2, 1, 5, '2019-10-30 22:19:30', 1),
(83, 2, 21, 0, 0, '2019-10-30 22:26:56', 1),
(84, 3, 22, 0, 0, '2019-10-30 22:29:22', 1),
(85, 4, 23, 0, 0, '2019-10-30 22:31:08', 1),
(86, 2, 21, 18, 0, '2019-10-30 22:43:11', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `z_history_products_activiy`
--

CREATE TABLE `z_history_products_activiy` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `z_history_products_activiy`
--

INSERT INTO `z_history_products_activiy` (`id`, `productID`, `isActive`, `date`) VALUES
(3, 1, 1, '2019-09-17 23:33:37'),
(4, 2, 1, '2019-09-19 14:31:18'),
(5, 3, 1, '2019-09-19 21:49:31'),
(6, 10, 1, '2019-10-01 00:03:52'),
(7, 11, 1, '2019-10-01 11:05:15'),
(8, 12, 1, '2019-10-01 20:01:35'),
(10, 12, 1, '2019-10-07 23:56:20'),
(11, 14, 1, '2019-10-08 00:01:07'),
(12, 16, 1, '2019-10-08 00:03:06'),
(13, 17, 1, '2019-10-08 00:04:05'),
(14, 19, 1, '2019-10-08 00:09:22'),
(15, 20, 1, '2019-10-08 00:10:06'),
(16, 21, 1, '2019-10-08 00:11:45'),
(17, 22, 1, '2019-10-08 00:30:18'),
(18, 23, 1, '2019-10-08 15:39:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `z_history_products_details_u_products_categories`
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
-- Estructura de tabla para la tabla `z_history_products_prices`
--

CREATE TABLE `z_history_products_prices` (
  `id` int(11) NOT NULL,
  `detailsID` int(11) NOT NULL DEFAULT '0',
  `productID` int(11) NOT NULL DEFAULT '0',
  `price` float NOT NULL,
  `offert` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `z_history_products_prices`
--

INSERT INTO `z_history_products_prices` (`id`, `detailsID`, `productID`, `price`, `offert`, `date`) VALUES
(1, 4, 0, 83.38, 70, '2019-09-24 19:31:55'),
(2, 1, 0, 150, 0, '2019-10-29 16:27:06'),
(3, 1, 0, 120, 0, '2019-10-29 16:27:31'),
(4, 1, 0, 112, 0, '2019-10-29 16:27:53'),
(5, 1, 0, 35, 0, '2019-10-29 16:29:16'),
(6, 1, 0, 13, 0, '2019-10-29 16:30:14'),
(7, 2, 0, 18, 0, '2019-10-29 16:32:03'),
(8, 2, 0, 14, 0, '2019-10-29 16:35:42'),
(9, 2, 0, 16, 0, '2019-10-29 16:36:05'),
(10, 2, 0, 19, 0, '2019-10-29 16:36:59'),
(11, 2, 0, 12, 0, '2019-10-29 16:37:11'),
(12, 1, 0, 19, 0, '2019-10-29 16:38:08'),
(13, 2, 0, 47, 0, '2019-10-29 16:45:51'),
(14, 2, 0, 986, 0, '2019-10-29 17:31:01'),
(15, 2, 0, 100, 0, '2019-10-30 21:52:21'),
(16, 2, 0, 150, 0, '2019-10-30 21:53:42'),
(17, 2, 0, 150, 0, '2019-10-30 21:55:10'),
(18, 2, 0, 20, 0, '2019-10-30 21:58:28'),
(19, 2, 0, 15, 0, '2019-10-30 21:59:08'),
(20, 2, 0, 30, 0, '2019-10-30 21:59:20'),
(21, 27, 0, 25, 0, '2019-10-30 22:42:47'),
(22, 26, 0, 23.4, 0, '2019-10-30 22:43:11'),
(23, 28, 0, 30, 0, '2019-10-30 22:44:16'),
(24, 28, 0, 30, 0, '2019-10-30 22:44:16'),
(25, 2, 0, 150, 0, '2019-10-30 22:46:21'),
(26, 2, 0, 150, 0, '2019-10-30 22:46:21'),
(27, 2, 0, 220, 0, '2019-10-30 22:47:14'),
(28, 2, 0, 220, 0, '2019-10-30 22:47:15'),
(29, 2, 0, 333, 0, '2019-10-30 22:48:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `managerID` (`managerID`),
  ADD KEY `cityID` (`cityID`),
  ADD KEY `branchType` (`branchType`);

--
-- Indices de la tabla `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emailID` (`emailID`),
  ADD KEY `addressID` (`addressID`),
  ADD KEY `passwordID` (`passwordID`),
  ADD KEY `personalInfoID` (`personalInfoID`);

--
-- Indices de la tabla `buyers_addresses`
--
ALTER TABLE `buyers_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cityID` (`cityID`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indices de la tabla `buyers_emails`
--
ALTER TABLE `buyers_emails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdReasonID` (`createdReasonID`);

--
-- Indices de la tabla `buyers_emails_creation_reasons`
--
ALTER TABLE `buyers_emails_creation_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `buyers_passwords`
--
ALTER TABLE `buyers_passwords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indices de la tabla `buyers_personal_info`
--
ALTER TABLE `buyers_personal_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indices de la tabla `buyers_phones`
--
ALTER TABLE `buyers_phones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indices de la tabla `buyers_views`
--
ALTER TABLE `buyers_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyerID` (`buyerID`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleID` (`roleID`);

--
-- Indices de la tabla `employees_roles`
--
ALTER TABLE `employees_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typeID` (`typeID`);

--
-- Indices de la tabla `milestones`
--
ALTER TABLE `milestones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branchID` (`branchID`);

--
-- Indices de la tabla `payments_reasons`
--
ALTER TABLE `payments_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brandID` (`detailsID`),
  ADD KEY `productParentID` (`productParentID`),
  ADD KEY `bottleID` (`bottleID`);

--
-- Indices de la tabla `products_brands`
--
ALTER TABLE `products_brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentID` (`parentID`);

--
-- Indices de la tabla `products_details`
--
ALTER TABLE `products_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brandID` (`brandID`);

--
-- Indices de la tabla `products_details_u_products_categories`
--
ALTER TABLE `products_details_u_products_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productDetailsID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indices de la tabla `products_details_u_products_tags`
--
ALTER TABLE `products_details_u_products_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tagID` (`tagID`),
  ADD KEY `productDetailsID` (`productDetailsID`);

--
-- Indices de la tabla `products_expiration_date`
--
ALTER TABLE `products_expiration_date`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `products_expiration_date_history`
--
ALTER TABLE `products_expiration_date_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseID` (`purchaseID`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `products_expiration_date_history_changes`
--
ALTER TABLE `products_expiration_date_history_changes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wasteID` (`wasteID`),
  ADD KEY `saleID` (`saleID`),
  ADD KEY `productID` (`historyID`);

--
-- Indices de la tabla `products_tags`
--
ALTER TABLE `products_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products_u_products_tags`
--
ALTER TABLE `products_u_products_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tagID` (`tagID`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `products_wastes`
--
ALTER TABLE `products_wastes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reasonID` (`reasonID`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `products_wastes_reasons`
--
ALTER TABLE `products_wastes_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentMethodID` (`paymentMethodID`),
  ADD KEY `supplierID` (`supplierID`),
  ADD KEY `stateID` (`stateID`),
  ADD KEY `cancelationReasonID` (`cancelationReasonID`);

--
-- Indices de la tabla `purchases_canceled_reasons`
--
ALTER TABLE `purchases_canceled_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `purchases_states`
--
ALTER TABLE `purchases_states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `purchases_u_products`
--
ALTER TABLE `purchases_u_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseID` (`purchaseID`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `sales`
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
-- Indices de la tabla `sales_discounts`
--
ALTER TABLE `sales_discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discountOverID` (`discountOverID`);

--
-- Indices de la tabla `sales_discounts_activity`
--
ALTER TABLE `sales_discounts_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discountID` (`discountID`);

--
-- Indices de la tabla `sales_discounts_overs`
--
ALTER TABLE `sales_discounts_overs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales_payment_states`
--
ALTER TABLE `sales_payment_states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales_payment_types`
--
ALTER TABLE `sales_payment_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales_states`
--
ALTER TABLE `sales_states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales_u_products`
--
ALTER TABLE `sales_u_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saleID` (`saleID`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `sales_visits`
--
ALTER TABLE `sales_visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `driverID` (`driverID`),
  ADD KEY `saleID` (`saleID`);

--
-- Indices de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `suppliers_u_products`
--
ALTER TABLE `suppliers_u_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierID` (`supplierID`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `suppliers_u_products_history`
--
ALTER TABLE `suppliers_u_products_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierID` (`supplierID`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `z_history_products_activiy`
--
ALTER TABLE `z_history_products_activiy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `z_history_products_details_u_products_categories`
--
ALTER TABLE `z_history_products_details_u_products_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productDetailsID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indices de la tabla `z_history_products_prices`
--
ALTER TABLE `z_history_products_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`),
  ADD KEY `detailsID` (`detailsID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `buyers`
--
ALTER TABLE `buyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buyers_addresses`
--
ALTER TABLE `buyers_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buyers_emails`
--
ALTER TABLE `buyers_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buyers_emails_creation_reasons`
--
ALTER TABLE `buyers_emails_creation_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buyers_passwords`
--
ALTER TABLE `buyers_passwords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buyers_personal_info`
--
ALTER TABLE `buyers_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buyers_phones`
--
ALTER TABLE `buyers_phones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buyers_views`
--
ALTER TABLE `buyers_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `employees_roles`
--
ALTER TABLE `employees_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `milestones`
--
ALTER TABLE `milestones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `payments_reasons`
--
ALTER TABLE `payments_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `products_brands`
--
ALTER TABLE `products_brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products_details`
--
ALTER TABLE `products_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `products_details_u_products_categories`
--
ALTER TABLE `products_details_u_products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products_details_u_products_tags`
--
ALTER TABLE `products_details_u_products_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_expiration_date`
--
ALTER TABLE `products_expiration_date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_expiration_date_history`
--
ALTER TABLE `products_expiration_date_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_expiration_date_history_changes`
--
ALTER TABLE `products_expiration_date_history_changes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_tags`
--
ALTER TABLE `products_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_u_products_tags`
--
ALTER TABLE `products_u_products_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_wastes`
--
ALTER TABLE `products_wastes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_wastes_reasons`
--
ALTER TABLE `products_wastes_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `purchases_canceled_reasons`
--
ALTER TABLE `purchases_canceled_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `purchases_states`
--
ALTER TABLE `purchases_states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `purchases_u_products`
--
ALTER TABLE `purchases_u_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sales_discounts`
--
ALTER TABLE `sales_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sales_discounts_activity`
--
ALTER TABLE `sales_discounts_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sales_discounts_overs`
--
ALTER TABLE `sales_discounts_overs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sales_payment_states`
--
ALTER TABLE `sales_payment_states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sales_payment_types`
--
ALTER TABLE `sales_payment_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sales_states`
--
ALTER TABLE `sales_states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sales_u_products`
--
ALTER TABLE `sales_u_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sales_visits`
--
ALTER TABLE `sales_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `suppliers_u_products`
--
ALTER TABLE `suppliers_u_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `suppliers_u_products_history`
--
ALTER TABLE `suppliers_u_products_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `z_history_products_activiy`
--
ALTER TABLE `z_history_products_activiy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `z_history_products_details_u_products_categories`
--
ALTER TABLE `z_history_products_details_u_products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `z_history_products_prices`
--
ALTER TABLE `z_history_products_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `buyers`
--
ALTER TABLE `buyers`
  ADD CONSTRAINT `buyers_ibfk_1` FOREIGN KEY (`passwordID`) REFERENCES `buyers_passwords` (`id`),
  ADD CONSTRAINT `buyers_ibfk_2` FOREIGN KEY (`emailID`) REFERENCES `buyers_emails` (`id`),
  ADD CONSTRAINT `buyers_ibfk_3` FOREIGN KEY (`personalInfoID`) REFERENCES `buyers_personal_info` (`id`),
  ADD CONSTRAINT `buyers_ibfk_4` FOREIGN KEY (`addressID`) REFERENCES `buyers_addresses` (`id`);

--
-- Filtros para la tabla `buyers_addresses`
--
ALTER TABLE `buyers_addresses`
  ADD CONSTRAINT `buyers_addresses_ibfk_2` FOREIGN KEY (`cityID`) REFERENCES `cities` (`id`);

--
-- Filtros para la tabla `buyers_emails`
--
ALTER TABLE `buyers_emails`
  ADD CONSTRAINT `buyers_emails_ibfk_1` FOREIGN KEY (`createdReasonID`) REFERENCES `buyers_emails_creation_reasons` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`detailsID`) REFERENCES `products_details` (`id`);

--
-- Filtros para la tabla `products_details`
--
ALTER TABLE `products_details`
  ADD CONSTRAINT `products_details_ibfk_1` FOREIGN KEY (`brandID`) REFERENCES `products_brands` (`id`);

--
-- Filtros para la tabla `products_details_u_products_categories`
--
ALTER TABLE `products_details_u_products_categories`
  ADD CONSTRAINT `products_details_u_products_categories_ibfk_1` FOREIGN KEY (`productDetailsID`) REFERENCES `products_details` (`id`),
  ADD CONSTRAINT `products_details_u_products_categories_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `products_categories` (`id`);

--
-- Filtros para la tabla `products_details_u_products_tags`
--
ALTER TABLE `products_details_u_products_tags`
  ADD CONSTRAINT `products_details_u_products_tags_ibfk_1` FOREIGN KEY (`tagID`) REFERENCES `products_tags` (`id`),
  ADD CONSTRAINT `products_details_u_products_tags_ibfk_2` FOREIGN KEY (`productDetailsID`) REFERENCES `products_details` (`id`);

--
-- Filtros para la tabla `products_expiration_date`
--
ALTER TABLE `products_expiration_date`
  ADD CONSTRAINT `products_expiration_date_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products_expiration_date_history`
--
ALTER TABLE `products_expiration_date_history`
  ADD CONSTRAINT `products_expiration_date_history_ibfk_1` FOREIGN KEY (`purchaseID`) REFERENCES `purchases` (`id`),
  ADD CONSTRAINT `products_expiration_date_history_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products_expiration_date_history_changes`
--
ALTER TABLE `products_expiration_date_history_changes`
  ADD CONSTRAINT `products_expiration_date_history_changes_ibfk_1` FOREIGN KEY (`historyID`) REFERENCES `products_expiration_date_history` (`id`),
  ADD CONSTRAINT `products_expiration_date_history_changes_ibfk_2` FOREIGN KEY (`wasteID`) REFERENCES `products_wastes` (`id`),
  ADD CONSTRAINT `products_expiration_date_history_changes_ibfk_3` FOREIGN KEY (`saleID`) REFERENCES `sales` (`id`);

--
-- Filtros para la tabla `products_u_products_tags`
--
ALTER TABLE `products_u_products_tags`
  ADD CONSTRAINT `products_u_products_tags_ibfk_1` FOREIGN KEY (`tagID`) REFERENCES `products_tags` (`id`),
  ADD CONSTRAINT `products_u_products_tags_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products_wastes`
--
ALTER TABLE `products_wastes`
  ADD CONSTRAINT `products_wastes_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `products_wastes_ibfk_2` FOREIGN KEY (`reasonID`) REFERENCES `products_wastes_reasons` (`id`);

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`stateID`) REFERENCES `purchases_states` (`id`);

--
-- Filtros para la tabla `purchases_u_products`
--
ALTER TABLE `purchases_u_products`
  ADD CONSTRAINT `purchases_u_products_ibfk_1` FOREIGN KEY (`purchaseID`) REFERENCES `purchases` (`id`),
  ADD CONSTRAINT `purchases_u_products_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`buyerID`) REFERENCES `buyers` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`paymentTypeID`) REFERENCES `sales_payment_types` (`id`),
  ADD CONSTRAINT `sales_ibfk_3` FOREIGN KEY (`addressID`) REFERENCES `buyers_addresses` (`id`),
  ADD CONSTRAINT `sales_ibfk_4` FOREIGN KEY (`paymentStateID`) REFERENCES `sales_payment_states` (`id`),
  ADD CONSTRAINT `sales_ibfk_5` FOREIGN KEY (`stateID`) REFERENCES `sales_states` (`id`),
  ADD CONSTRAINT `sales_ibfk_6` FOREIGN KEY (`discountID`) REFERENCES `sales_discounts` (`id`);

--
-- Filtros para la tabla `sales_discounts`
--
ALTER TABLE `sales_discounts`
  ADD CONSTRAINT `sales_discounts_ibfk_1` FOREIGN KEY (`discountOverID`) REFERENCES `sales_discounts_overs` (`id`);

--
-- Filtros para la tabla `sales_discounts_activity`
--
ALTER TABLE `sales_discounts_activity`
  ADD CONSTRAINT `sales_discounts_activity_ibfk_1` FOREIGN KEY (`discountID`) REFERENCES `sales_discounts` (`id`);

--
-- Filtros para la tabla `sales_u_products`
--
ALTER TABLE `sales_u_products`
  ADD CONSTRAINT `sales_u_products_ibfk_1` FOREIGN KEY (`saleID`) REFERENCES `sales` (`id`),
  ADD CONSTRAINT `sales_u_products_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `sales_visits`
--
ALTER TABLE `sales_visits`
  ADD CONSTRAINT `sales_visits_ibfk_1` FOREIGN KEY (`saleID`) REFERENCES `sales` (`id`),
  ADD CONSTRAINT `sales_visits_ibfk_2` FOREIGN KEY (`driverID`) REFERENCES `employees` (`id`);

--
-- Filtros para la tabla `suppliers_u_products`
--
ALTER TABLE `suppliers_u_products`
  ADD CONSTRAINT `suppliers_u_products_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `suppliers_u_products_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `suppliers_u_products_history`
--
ALTER TABLE `suppliers_u_products_history`
  ADD CONSTRAINT `suppliers_u_products_history_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `suppliers_u_products_history_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`id`);

--
-- Filtros para la tabla `z_history_products_activiy`
--
ALTER TABLE `z_history_products_activiy`
  ADD CONSTRAINT `z_history_products_activiy_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `z_history_products_details_u_products_categories`
--
ALTER TABLE `z_history_products_details_u_products_categories`
  ADD CONSTRAINT `z_history_products_details_u_products_categories_ibfk_1` FOREIGN KEY (`productDetailsID`) REFERENCES `products_details` (`id`),
  ADD CONSTRAINT `z_history_products_details_u_products_categories_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `products_categories` (`id`);

--
-- Filtros para la tabla `z_history_products_prices`
--
ALTER TABLE `z_history_products_prices`
  ADD CONSTRAINT `z_history_products_prices_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
