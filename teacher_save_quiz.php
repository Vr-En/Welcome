<?php
header("Content-Type: application/json");
require "db.php";

/* AUTH */
$raw = $_SERVER['HTTP_X_AUTH'] ?? null;
if (!$raw) {
  echo json_encode(["status"=>"error","message"=>"No auth"]);
  exit;
}

/* BODY */
$data = json_decode(file_get_contents("php://input"), true);

$course_id = (int)($data["course_id"] ?? 0);
$title = trim($data["title"] ?? "");
$passing = (int)($data["passing_score"] ?? 0);
$badge = trim($data["badge_name"] ?? "");
$questions = $data["questions"] ?? [];

if (!$course_id || !$title || !$passing || empty($questions)) {
  echo json_encode(["status"=>"error","message"=>"Missing fields"]);
  exit;
}

$qjson = json_encode($questions, JSON_UNESCAPED_UNICODE);

$stmt = $conn->prepare("
  INSERT INTO quizzes (course_id, title, passing_score, badge_name, questions)
  VALUES (?, ?, ?, ?, ?)
");

$stmt->bind_param("isiss", $course_id, $title, $passing, $badge, $qjson);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success"]);
} else {
  echo json_encode(["status"=>"error","message"=>"DB failed"]);
}
