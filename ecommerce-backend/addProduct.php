<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $description = $_POST['description'];

    $image = $_FILES['image'];
    $target_dir = "uploads/";
    $image_name = time() . "_" . basename($image["name"]);
    $target_file = $target_dir . $image_name;

    if (move_uploaded_file($image["tmp_name"], $target_file)) {
        $sql = "INSERT INTO products (name, price, description, image)
                VALUES ('$name', '$price', '$description', '$image_name')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to upload image."]);
    }
}
?>
