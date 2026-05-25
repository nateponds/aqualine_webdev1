<?php

$host = "localhost";
$username = "root";
$password = "";
// change the database in line 8 when using forked versions of aqualine 
// to another database that may be sensitive to changes away from the main branch
$database = "aqualine_branch-user";

$conn = new mysqli($host, $username, $password, $database);

// if ($conn->connect_error) {
//     die("Connection failed: ngano itom kaau ka oi" . $conn->connect_error);
// }


// echo "test: if you see this u got it working! if not u are BLACCCCCCC";
?>


