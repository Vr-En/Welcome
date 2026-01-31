<?php
require "admin_guard.php";
header('Content-Type: application/json');
include 'db.php';
include 'admin_guard.php';

function genTempPassword($len = 10) {
  $chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  $out = "";
  for ($i=0; $i<$len; $i++) {
    $out .= $chars[random_int(0, strlen($chars)-1)];
  }
  return $out;
}

$body = json_decode(file_get_contents("php://input"), true);
$student_id = trim($body["student_id"] ?? "");

if ($student_id === "") {
  echo json_encode(["status" => "error", "message" => "Missing student_id"]);
  exit;
}

if ($student_id === ($_SESSION['student_id'] ?? '')) {
  echo json_encode(["status" => "error", "message" => "You cannot reset your own password"]);
  exit;
}

$temp = genTempPassword(10);
$hash = password_hash($temp, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE users SET password = ? WHERE student_id = ? AND role IN ('student','teacher')");
$stmt->bind_param("ss", $hash, $student_id);

if ($stmt->execute()) {
  echo json_encode(["status" => "success", "temp_password" => $temp]);
  exit;
}

echo json_encode(["status" => "error", "message" => "Failed to reset password"]);
exit;
