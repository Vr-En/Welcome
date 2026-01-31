<?php
require "db.php";
session_start();

$data = json_decode(file_get_contents("php://input"), true);

$student_id = $_SESSION['student_id'] ?? null;
$lesson_id = $data['lesson_id'] ?? null;
$course_id = $data['course_id'] ?? null;

if (!$student_id || !$lesson_id) {
  echo json_encode(["status"=>"error"]);
  exit;
}

$stmt = $conn->prepare(
  "INSERT INTO student_progress (student_id, course_id, lesson_id, completed)
   VALUES (?, ?, ?, 1)
   ON DUPLICATE KEY UPDATE completed=1"
);
$stmt->bind_param("sii", $student_id, $course_id, $lesson_id);

$stmt->execute();
echo json_encode(["status"=>"success"]);
