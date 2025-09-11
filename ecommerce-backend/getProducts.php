<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

$sql = "SELECT * FROM products ORDER BY id DESC";
$result = $conn->query($sql);

$products = [];

while($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>
