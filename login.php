<?php
header('Content-Type: application/json');
session_start();
require 'db.php';

$student_id = $_POST['student_id'] ?? '';
$password   = $_POST['password'] ?? '';

if ($student_id === '' || $password === '') {
  echo json_encode(["status" => "error", "message" => "Missing fields"]);
  exit;
}

$stmt = $conn->prepare("
  SELECT student_id, fullname, email, grade_level, password, role, status
  FROM users
  WHERE student_id = ?
  LIMIT 1
");
$stmt->bind_param("s", $student_id);
$stmt->execute();
$res = $stmt->get_result();

$user = $res->fetch_assoc();
if (!$user) {
  echo json_encode(["status" => "invalid"]);
  exit;
}

// blocked user check
if ($user['status'] === 'suspended') {
  echo json_encode(["status" => "suspended"]);
  exit;
}

//  wrong password
if (!password_verify($password, $user['password'])) {
  echo json_encode(["status" => "invalid"]);
  exit;
}

//  regenerate session FIRST
session_regenerate_id(true);

//  store FULL user info in session
$_SESSION['user'] = [
  "id"          => $user["student_id"],
  "role"        => $user["role"],
  "fullname"    => $user["fullname"],
  "email"       => $user["email"],
  "grade_level" => $user["grade_level"]
];

//  response for frontend (localStorage)
echo json_encode([
  "status"      => "success",
  "student_id"  => $user["student_id"],
  "fullname"    => $user["fullname"],
  "email"       => $user["email"],
  "grade_level" => $user["grade_level"],
  "role"        => $user["role"]
]);
exit;
