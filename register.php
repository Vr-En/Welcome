<?php
header('Content-Type: application/json');
include 'db.php';

$fullname    = $_POST['fullname'] ?? '';
$email       = $_POST['email'] ?? '';
$student_id  = $_POST['student_id'] ?? '';
$grade_level = $_POST['grade_level'] ?? '';
$passwordRaw = $_POST['password'] ?? '';

if ($fullname === '' || $email === '' || $student_id === '' || $grade_level === '' || $passwordRaw === '') {
  echo json_encode(["status" => "error"]);
  exit;
}

$check = $conn->prepare("SELECT id FROM users WHERE student_id = ?");
$check->bind_param("s", $student_id);
$check->execute();
$exists = $check->get_result();

if ($exists->num_rows > 0) {
  echo json_encode(["status" => "exists"]);
  exit;
}

$password = password_hash($passwordRaw, PASSWORD_DEFAULT);
$role = "student";

$stmt = $conn->prepare("INSERT INTO users (student_id, fullname, email, grade_level, password, role) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $student_id, $fullname, $email, $grade_level, $password, $role);

if ($stmt->execute()) {
  echo json_encode(["status" => "success"]);
  exit;
}

echo json_encode(["status" => "error"]);
exit;
