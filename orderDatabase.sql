CREATE TABLE `order_list`(
    `order_id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_name` varchar(50) NOT NULL,
    `date` varchar(8) NOT NULL,
    `total_amount` decimal(10, 2) NOT NULL,
    `delivery_status` varchar(20) NOT NULL,
    PRIMARY KEY (`order_id`);
);
