<?php
require "admin_guard.php";
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$teacher_id = $data['teacher_id'] ?? '';
$course_id  = (int)($data['course_id'] ?? 0);

if (!$teacher_id || !$course_id) {
  echo json_encode(["status" => "error", "message" => "Missing data"]);
  exit;
}

$stmt = $conn->prepare("
  INSERT IGNORE INTO teacher_courses (teacher_id, course_id)
  VALUES (?, ?)
");
$stmt->bind_param("si", $teacher_id, $course_id);
$stmt->execute();

echo json_encode(["status" => "success"]);
