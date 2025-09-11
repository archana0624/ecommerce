<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$email = isset($_GET['email']) ? $_GET['email'] : '';

if (!$email) {
    echo json_encode([]);
    exit;
}

$email = $conn->real_escape_string($email);

$sql = "SELECT * FROM orders WHERE user_email = '$email' ORDER BY id DESC";
$result = $conn->query($sql);

$orders = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode($orders);
?>
