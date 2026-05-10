CREATE TABLE `order_list`(
    `order_id` int(11) NOT NULL AUTO_INCREMENT,
    `client_name` varchar(50) NOT NULL,
    `order_date` date NOT NULL,
    `total_amount` decimal(10, 2) NOT NULL,
    `delivery_status` varchar(20) NOT NULL,
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

INSERT INTO `order_list` (`client_name`, `order_date`, `total_amount`, `delivery_status`, `client_address`, `client_contact`, `shipment_type`) 
VALUES 
('Samuel Dumapias', '2026-05-10', 140.00, 'Pending', '123 Main St, Cebu', '09171234567', 'delivery'),
('Nathaniel Ponce', '2026-05-11', 158.00, 'Delivered', 'USC Dormitory, Talamban', '09181234567', 'delivery'),
('Joshua Faber', '2026-05-11', 110.00, 'Out for Delivery', '456 Mango Ave, Cebu', '09191234567', 'delivery'),
('Joannah Bael', '2026-05-12', 122.00, 'Pending', '789 Escario St, Cebu', '09201234567', 'delivery');


INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `quantity`, `price`) 
VALUES 
(1, 1, 'Standard Round', 3, 30.00),
(2, 2, 'Slim Alkaline', 2, 45.00),
(2, 4, 'Family Pack', 1, 18.00),
(3, 3, 'Solo Mist', 5, 12.00),
(4, 5, 'Office Tower', 2, 25.00),
(4, 6, 'Compact Home', 1, 22.00);

