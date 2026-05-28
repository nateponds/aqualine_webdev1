CREATE TABLE `order_list`(
    `order_id` int(11) NOT NULL AUTO_INCREMENT,
    `client_name` varchar(50) NOT NULL,
    `order_date` date NOT NULL,
    `total_amount` decimal(10, 2) NOT NULL,
    `delivery_status` varchar(50) NOT NULL DEFAULT 'Pending',
    `client_address` varchar(80) NOT NULL,
    `client_contact` varchar(12) NOT NULL,
    `shipment_type` ENUM('delivery', 'pickup') NOT NULL DEFAULT 'delivery',
    PRIMARY KEY (`order_id`)
);

CREATE TABLE `order_items` (
    `item_id` int(11) NOT NULL AUTO_INCREMENT,
    `order_id` int(11) NOT NULL, 
    `product_id` int(11) NOT NULL,
    `product_name` varchar(50) NOT NULL,
    `quantity` int(11) NOT NULL,
    `price` decimal(10, 2) NOT NULL,
    PRIMARY KEY (`item_id`),
    FOREIGN KEY (`order_id`) REFERENCES `order_list`(`order_id`) ON DELETE CASCADE
);

INSERT INTO `order_list` (`order_id`, `client_name`, `order_date`, `total_amount`, `delivery_status`, `client_address`, `client_contact`, `shipment_type`) VALUES 
(1, 'Janie Sabado', '2026-05-12', 250.00, 'Pending', 'BGC Tower 1, Taguig', '09151112222', 'delivery'),
(2, 'Karen Tan', '2026-05-12', 90.00, 'Delivered', '77 Sunset Strip, Mandaue', '09162223333', 'pickup'),
(3, 'Cate Zamora', '2026-05-13', 120.00, 'Out for Delivery', 'Paddy\'s Pub, Cebu', '09173334444', 'delivery'),
(4, 'Francine Menchavez', '2026-05-13', 300.00, 'Pending', 'Themyscira Lane, Lapu-Lapu', '09184445555', 'delivery'),
(5, 'Mary Rose Loquinario', '2026-05-13', 45.00, 'Delivered', 'Resembool St, Consolacion', '09195556666', 'pickup');

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `quantity`, `price`) VALUES 
(1, 1, 'Standard Round', 5, 50.00),
(2, 3, 'Solo Mist', 7, 12.85),
(3, 2, 'Slim Alkaline', 2, 60.00),
(4, 5, 'Office Tower', 6, 50.00),
(5, 4, 'Family Pack', 2, 22.50);