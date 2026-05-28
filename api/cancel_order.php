<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'] ?? null;

if (!$order_id) {
    echo json_encode(['status' => 'error', 'message' => 'No order ID provided']);
    exit;
}

require('../includes/db_connect.php');

$stmt = $conn->prepare("DELETE FROM order_list WHERE order_id = ?");
$stmt->bind_param("i", $order_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Delete failed']);
}

$stmt->close();
$conn->close();
?>