<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

include('../includes/db_connect.php');

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT order_id, order_date, total_amount, delivery_status, shipment_type FROM order_list WHERE user_id = ? ORDER BY order_id DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);

$stmt->close();
$conn->close();
?>