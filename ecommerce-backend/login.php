<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Read the raw POST body and decode it
$input = file_get_contents("php://input");
$data = json_decode($input);

if (!$data || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "Invalid input or missing fields"]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $data->password;

// Check if user exists
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "user" => $user["name"]]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}
?>
