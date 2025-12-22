<?php
include 'db.php';

$student_id = $_POST['student_id'];
$fullname   = $_POST['fullname'];
$email      = $_POST['email'];
$password   = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (student_id, fullname, email, password)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $student_id, $fullname, $email, $password);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}
?>
