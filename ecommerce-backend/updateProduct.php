<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$id = $_POST['id'];
$name = $_POST['name'];
$price = $_POST['price'];
$description = $_POST['description'];

if (isset($_FILES['image'])) {
    $image = $_FILES['image'];
    $image_name = time() . "_" . basename($image["name"]);
    $target_file = "uploads/" . $image_name;
    if (move_uploaded_file($image["tmp_name"], $target_file)) {
        $sql = "UPDATE products SET name='$name', price='$price', description='$description', image='$image_name' WHERE id=$id";
    } else {
        echo json_encode(["status" => "error", "message" => "Image upload failed"]);
        exit;
    }
} else {
    $sql = "UPDATE products SET name='$name', price='$price', description='$description' WHERE id=$id";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
