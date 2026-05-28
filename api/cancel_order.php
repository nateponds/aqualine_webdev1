<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'] ?? null;

if (!$order_id) {
    echo json_encode(['status' => 'error', 'message' => 'No order ID provided']);
    exit;
}

require('../includes/db_connect.php');

$stmt = $conn->prepare("UPDATE order_list SET delivery_status = 'Cancelled' WHERE order_id = ?");
$stmt->bind_param("i", $order_id);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Cancellation failed or order does not exist']);
}

$stmt->close();
$conn->close();
?>