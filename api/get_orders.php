<?php
    header('Content-Type: application/json');

    require('../includes/db_connect.php');

    if ($conn->connect_error) {
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }

    $sql = "SELECT order_id, client_name, order_date, total_amount, client_address, client_contact, delivery_status, shipment_type FROM order_list ORDER BY order_id DESC";
    $result = $conn->query($sql);

    $orders = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
    }

    echo json_encode($orders);
    $conn->close();
?>