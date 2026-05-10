<?php

    header('Content-Type: application/json');
    include('db_connect.php');

    $input = file_get_contents('php://input');
    $orderData = json_decode($input, true);

    if(empty( $orderData['cart'])){
        echo json_encode(['status' => 'error', 'message' => 'Cart is empty']);
        exit;
    }

    // make the checkout form from front-end fetched to here
    $client_name = "test name";
    $order_datre = date("Y-m-d");
    $total_amount = $orderData['total'];
    $delivery_status = "Pending";
    $client_address = "test address";
    $shipment_type = "delivery"; // default to delivery but changes depending on what is put checkout form make it now bruh

    $stmt = $conn->prepare("INSERT INTO order_list (client_name, order_date, 
                                                    total_amount, delivery_status, 
                                                    client_address, client_contact, 
                                                    shipment_type)
                                                    VALUES
                                                    (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdssss", $client_name, $order_date, $total_amount, $delivery_status, $client_address, $client_contact, $shipment_type);

    if($stmt->execute()){
        $order_id = $conn->insert_id();

        $itemStmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
                                    VALUES (?, ?, ?, ?, ?)");

        forEach($orderData['cart'] as $item){
            $itemStmt->bind_param("iisid", $order_id, $item['id'], $item['name'], $item['qty'], $item['price']);
            $itemStmt->execute();
        }

        echo json_encode(['status' => 'success', 'message' => 'Order placed perfectly!', 'order_id' => $order_id]);
    }

    else {
        echo json_encode(['status' => 'error', 'message' => 'Database failed to save the order.']);
    }


    $conn->close();
?>