<?php
require "admin_guard.php";
header('Content-Type: application/json');
include 'db.php';
include 'admin_guard.php';

$body = json_decode(file_get_contents("php://input"), true);
$student_id = trim($body["student_id"] ?? "");
$newRole    = trim($body["role"] ?? "");

if ($student_id === "" || !in_array($newRole, ["student","teacher"], true)) {
  echo json_encode(["status" => "error", "message" => "Invalid data"]);
  exit;
}

if ($student_id === ($_SESSION['student_id'] ?? '')) {
  echo json_encode(["status" => "error", "message" => "You cannot change your own role"]);
  exit;
}

$stmt = $conn->prepare("UPDATE users SET role = ? WHERE student_id = ? AND role IN ('student','teacher')");
$stmt->bind_param("ss", $newRole, $student_id);

if ($stmt->execute()) {
  echo json_encode(["status" => "success"]);
  exit;
}

echo json_encode(["status" => "error", "message" => "Failed to update role"]);
exit;
