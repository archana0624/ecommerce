<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true); // returns associative array

// ✅ Debug: Check what you received
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON or no data received"]);
    exit;
}

// ✅ Debug print
// file_put_contents("debug.log", print_r($data, true)); // optional for debugging

// ✅ Now check required fields (as array)
$requiredFields = ['email', 'customer_name', 'mobile', 'address', 'product_id', 'product_name', 'price', 'quantity', 'image'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || $data[$field] === '') {
        echo json_encode(["status" => "error", "message" => "Missing field: $field"]);
        exit;
    }
}

// ✅ Safe assignments
$email = $conn->real_escape_string($data['email']);
$name = $conn->real_escape_string($data['customer_name']);
$mobile = $conn->real_escape_string($data['mobile']);
$address = $conn->real_escape_string($data['address']);
$product_id = (int)$data['product_id'];
$product_name = $conn->real_escape_string($data['product_name']);
$price = (float)$data['price'];
$quantity = (int)$data['quantity'];
$image = $conn->real_escape_string($data['image']);
$total = $price * $quantity;

// ✅ Insert into orders
$sql = "INSERT INTO orders 
(user_email, customer_name, mobile, address, product_id, product_name, price, quantity, total_amount, image)
VALUES 
('$email', '$name', '$mobile', '$address', $product_id, '$product_name', $price, $quantity, $total, '$image')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
