<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

// Get raw input and decode
$input = file_get_contents("php://input");
$data = json_decode($input);

if (!$data || !isset($data->name) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "Incomplete data or invalid JSON"]);
    exit;
}

$name = $conn->real_escape_string($data->name);
$email = $conn->real_escape_string($data->email);
$password = $data->password;

// ✅ Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format"]);
    exit;
}

// ✅ Validate password strength
if (
    strlen($password) < 6 ||
    !preg_match('/[A-Z]/', $password) ||  // at least one uppercase
    !preg_match('/[a-z]/', $password) ||  // at least one lowercase
    !preg_match('/[0-9]/', $password)     // at least one number
) {
    echo json_encode([
        "status" => "error",
        "message" => "Password must be at least 6 characters long and contain at least 1 uppercase, 1 lowercase, and 1 number."
    ]);
    exit;
}

// ✅ Check if email already exists
$checkQuery = "SELECT * FROM users WHERE email = '$email'";
$checkResult = $conn->query($checkQuery);

if ($checkResult && $checkResult->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already registered"]);
    exit;
}

// ✅ Hash password securely
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// ✅ Insert into database
$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "user" => $name]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
