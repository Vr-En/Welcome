<?php
require "db.php";
header("Content-Type: application/json");

$course_id = $_GET["course_id"] ?? null;

if (!$course_id) {
  echo json_encode(["status" => "error", "message" => "Missing course_id"]);
  exit;
}

$sql = "SELECT * FROM lessons WHERE course_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
  echo json_encode([
    "status" => "error",
    "message" => "SQL prepare failed",
    "sql_error" => $conn->error
  ]);
  exit;
}

$stmt->bind_param("i", $course_id);
$stmt->execute();
$result = $stmt->get_result();

$lessons = [];
while ($row = $result->fetch_assoc()) {
  $lessons[] = $row;
}

echo json_encode([
  "status" => "success",
  "lessons" => $lessons
]);
