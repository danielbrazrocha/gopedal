
CREATE DATABASE `go_pedal` /*!40100 DEFAULT CHARACTER SET latin1 */;

-- go_pedal.Category definition

CREATE TABLE `Category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;


-- go_pedal.Discount definition

CREATE TABLE `Discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount_percent` float DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- go_pedal.Inventory definition

CREATE TABLE `Inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- go_pedal.SequelizeMeta definition

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- go_pedal.`User` definition

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kind` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


-- go_pedal.Order_Details definition

CREATE TABLE `Order_Details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `idPayment` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Order_Details_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- go_pedal.Payment_Details definition

CREATE TABLE `Payment_Details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `Payment_Details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Order_Details` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- go_pedal.Product definition

CREATE TABLE `Product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `discount_id` int(11) DEFAULT NULL,
  `inventory_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `SKU` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `discount_id` (`discount_id`),
  KEY `inventory_id` (`inventory_id`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Product_ibfk_2` FOREIGN KEY (`discount_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Product_ibfk_3` FOREIGN KEY (`inventory_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;


-- go_pedal.Shopping_Session definition

CREATE TABLE `Shopping_Session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Shopping_Session_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- go_pedal.User_Address definition

CREATE TABLE `User_Address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `CEP` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `User_Address_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


-- go_pedal.User_Payment definition

CREATE TABLE `User_Payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `account_number` int(11) DEFAULT NULL,
  `expiry` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `User_Payment_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- go_pedal.Cart_Items definition

CREATE TABLE `Cart_Items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  KEY `ProductId` (`ProductId`),
  CONSTRAINT `Cart_Items_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Cart_Items_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `Product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- go_pedal.Order_Itens definition

CREATE TABLE `Order_Itens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `ProductId` (`ProductId`),
  CONSTRAINT `Order_Itens_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Order_Details` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Order_Itens_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `Product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;