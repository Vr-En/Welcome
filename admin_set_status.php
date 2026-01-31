<?php
require "admin_guard.php";
header('Content-Type: application/json');
include 'db.php';
include 'admin_guard.php';

$body = json_decode(file_get_contents("php://input"), true);
$student_id = trim($body["student_id"] ?? "");
$status     = trim($body["status"] ?? "");

if ($student_id === "" || !in_array($status, ["active","suspended"], true)) {
  echo json_encode(["status" => "error", "message" => "Invalid data"]);
  exit;
}

if ($student_id === ($_SESSION['student_id'] ?? '')) {
  echo json_encode(["status" => "error", "message" => "You cannot suspend yourself"]);
  exit;
}

$stmt = $conn->prepare("UPDATE users SET status = ? WHERE student_id = ? AND role IN ('student','teacher')");
$stmt->bind_param("ss", $status, $student_id);

if ($stmt->execute()) {
  echo json_encode(["status" => "success"]);
  exit;
}

echo json_encode(["status" => "error", "message" => "Failed to update status"]);
exit;
