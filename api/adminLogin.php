<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$inputUser = $data['username'] ?? '';
$inputPass = $data['password'] ?? '';

$validUser = "nateponds";
$validPass = "admin123"; 

if ($inputUser === $validUser && $inputPass === $validPass) {
    session_start();
    $_SESSION['is_admin'] = true;
    
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid username or password. If you forgot your credentials, contact your manager.']);
}
?>