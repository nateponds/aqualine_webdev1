<?php
header('Content-Type: application/json');
session_start();

include('../includes/db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

$username = isset($data['username']) ? trim($data['username']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? $data['password'] : '';
$client_name = isset($data['client_name']) ? trim($data['client_name']) : '';
$client_contact = isset($data['client_contact']) ? trim($data['client_contact']) : '';
$client_address = isset($data['client_address']) ? trim($data['client_address']) : '';

if (empty($username) || empty($email) || empty($password) || empty($client_name) || empty($client_contact) || empty($client_address)) {
    echo json_encode(['status' => 'error', 'message' => 'All profile registration fields are required.']);
    exit;
}

$checkStmt = $conn->prepare("SELECT user_id FROM users WHERE username = ? OR email = ?");
$checkStmt->bind_param("ss", $username, $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Username or Email has already been registered.']);
    $checkStmt->close();
    $conn->close();
    exit;
}
$checkStmt->close();

$password_hash = password_hash($password, PASSWORD_BCRYPT);

$insertStmt = $conn->prepare("INSERT INTO users (username, email, password_hash, client_name, client_contact, client_address) VALUES (?, ?, ?, ?, ?, ?)");
$insertStmt->bind_param("ssssss", $username, $email, $password_hash, $client_name, $client_contact, $client_address);

if ($insertStmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Account created successfully! Welcome to Aqualine.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database dropped request execution thread error.']);
}

$insertStmt->close();
$conn->close();
?>