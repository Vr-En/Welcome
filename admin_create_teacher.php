<?php
require "admin_guard.php";
require "db.php";

$teacher_id = $_POST['teacher_id'] ?? '';
$fullname   = $_POST['fullname'] ?? '';
$email      = $_POST['email'] ?? '';
$password   = $_POST['password'] ?? '';

if (!$teacher_id || !$fullname || !$email || !$password) {
  echo json_encode(["status" => "error", "message" => "Missing fields"]);
  exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
  INSERT INTO users (student_id, fullname, email, password, role, status)
  VALUES (?, ?, ?, ?, 'teacher', 'active')
");
$stmt->bind_param("ssss", $teacher_id, $fullname, $email, $hash);
$stmt->execute();

echo json_encode(["status" => "success"]);
