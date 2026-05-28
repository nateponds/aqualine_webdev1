<?php
header('Content-Type: application/json');

// 1. Read the raw JSON payload
$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'] ?? null;
$new_status = $data['status'] ?? null;

if (!$order_id || !$new_status) {
    echo json_encode(['status' => 'error', 'message' => 'Missing data']);
    exit;
}

// 2. Call in the universal database connection!
// This magically drops your $conn variable right here.
require('../includes/db_connect.php');

// 3. Prepare and execute the query
$stmt = $conn->prepare("UPDATE order_list SET delivery_status = ? WHERE order_id = ?");
$stmt->bind_param("si", $new_status, $order_id);

// 4. Verify the database actually changed something
if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Update failed or no changes were made']);
}

$stmt->close();
$conn->close();
?>