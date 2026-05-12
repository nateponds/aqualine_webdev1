<?php
header('Content-Type: application/json');

include('../includes/db_connect.php');

$order_id = $_GET['id'] ?? null;

if (!$order_id) {
    echo json_encode(['error' => 'No Order ID provided']);
    exit;
}

$sql = "SELECT product_name, quantity FROM order_items WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row['product_name'] . " (x" . $row['quantity'] . ")";
}

echo json_encode($items);
$stmt->close();
$conn->close();
?>