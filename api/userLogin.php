<?php
header('Content-Type: application/json');
session_start();

require('../includes/db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);
$inputUser = isset($data['username']) ? trim($data['username']) : '';
$inputPass = isset($data['password']) ? $data['password'] : '';

if (empty($inputUser) || empty($inputPass)) {
    echo json_encode(['status' => 'error', 'message' => 'Please provide both your username and password.']);
    exit;
}

$stmt = $conn->prepare("SELECT user_id, username, password_hash, client_name, client_contact, client_address FROM users WHERE username = ?");
$stmt->bind_param("s", $inputUser);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $userRow = $result->fetch_assoc();
    
    if (password_verify($inputPass, $userRow['password_hash'])) {
        
        $_SESSION['user_id'] = $userRow['user_id'];
        $_SESSION['username'] = $userRow['username'];
        $_SESSION['client_name'] = $userRow['client_name'];
        $_SESSION['client_contact'] = $userRow['client_contact'];
        $_SESSION['client_address'] = $userRow['client_address'];
        
        echo json_encode([
            'status' => 'success', 
            'message' => 'Login successful!',
            'user' => [
                'name' => $userRow['client_name']
            ]
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or security password parameters.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Account parameter context could not be located.']);
}

$stmt->close();
$conn->close();
?>