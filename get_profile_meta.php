<?php
header("Content-Type: application/json");

ini_set('display_errors', 1);
error_reporting(E_ALL);

require "db.php";

$headers = getallheaders();
if (!isset($headers["X-Auth"])) {
  echo json_encode(["status" => "error"]);
  exit;
}

$auth = json_decode($headers["X-Auth"], true);
$userId = $auth["id"] ?? null;

if (!$userId) {
  echo json_encode(["status" => "error"]);
  exit;
}

$stmt = $conn->prepare(
  "SELECT grade_level, profile_photo FROM users WHERE student_id = ?"
);
$stmt->bind_param("s", $userId);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();

echo json_encode([
  "status" => "success",
  "grade_level" => $row["grade_level"] ?? null,
  "profile_photo" => $row["profile_photo"] ?? null
]);
