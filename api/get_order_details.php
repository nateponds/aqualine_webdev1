<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'aqualine_orders'; 
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $order_id = isset($_GET['id']) ? $_GET['id'] : '';
    $contact = isset($_GET ['contact']) ? trim($_GET['contact']) : '';
    

    if (empty($order_id) || empty($contact)) {
        echo json_encode(['success' => false, 'message' => 'Both Order ID and Contact Number are required.']);
        exit;
    }

    $orderStmt = $pdo->prepare("SELECT order_id, client_name, client_address, total_amount, delivery_status 
                                FROM order_list 
                                WHERE order_id = :id AND client_contact = :contact");
    $orderStmt->bindParam(':id', $order_id);
    $orderStmt->bindParam(':contact', $contact);
    $orderStmt->execute();
    $order = $orderStmt->fetch(PDO::FETCH_ASSOC);

    if ($order) {
        $itemsStmt = $pdo->prepare("SELECT product_name, quantity, price FROM order_items WHERE order_id = :id");
        $itemsStmt->bindParam(':id', $order_id);
        $itemsStmt->execute();
        $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'order' => [
                'id' => $order['order_id'],
                'name' => $order['client_name'],
                'address' => $order['client_address'],
                'total' => number_format($order['total_amount'], 2),
                'status' => $order['delivery_status'],
                'items' => $items
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Order not found or verification details do not match.']);
    }

} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>