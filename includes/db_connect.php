<?php
if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
    // --- LOCAL XAMPP CREDENTIALS ---
    $host = "localhost";
    $username = "root"; 
    $password = "";
} else {
    // --- UBUNTU HOMELAB CREDENTIALS ---
    $host = "localhost";
    $username = "aqualine_admin"; 
    $password = "aqualine123";
}

$database = "aqualine_branch-user";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error', 
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit;
}
?>