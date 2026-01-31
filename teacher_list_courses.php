<?php
session_start();
require "db.php";

// MUST be logged in teacher
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'teacher') {
  http_response_code(403);
  echo json_encode(["status" => "error", "message" => "Not allowed"]);
  exit;
}

$teacher_id = $_SESSION['user']['id'];

$stmt = $conn->prepare("
  SELECT c.id, c.name, c.subject, c.created_at
  FROM courses c
  JOIN teacher_courses tc ON tc.course_id = c.id
  WHERE tc.teacher_id = ?
");
$stmt->bind_param("s", $teacher_id);
$stmt->execute();
$res = $stmt->get_result();

$courses = [];
while ($row = $res->fetch_assoc()) {
  $courses[] = $row;
}

echo json_encode([
  "status" => "success",
  "courses" => $courses
]);
