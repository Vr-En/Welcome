<?php
include 'db.php';

$student_id = $_POST['student_id'];
$password   = $_POST['password'];

$sql = "SELECT * FROM users WHERE student_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $student_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "status" => "success",
            "student_id" => $user['student_id'],
            "fullname" => $user['fullname']
        ]);
    } else {
        echo "invalid";
    }
} else {
    echo "invalid";
}
