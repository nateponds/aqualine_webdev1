<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'] ?? null;
$new_status = $data['status'] ?? null;

if (!$order_id || !$new_status) {
    echo json_encode(['status' => 'error', 'message' => 'Missing data']);
    exit;
}

$conn = new mysqli("localhost", "root", "", "aqualine_orders");

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed']);
    exit;
}

$stmt = $conn->prepare("UPDATE order_list SET delivery_status = ? WHERE order_id = ?");
$stmt->bind_param("si", $new_status, $order_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Update failed']);
}

$stmt->close();
$conn->close();
?>