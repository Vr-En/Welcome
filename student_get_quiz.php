<?php
require "db.php";
header("Content-Type: application/json");

$course_id = (int)($_GET["course_id"] ?? 0);
if (!$course_id) {
  echo json_encode(["status" => "error"]);
  exit;
}

$stmt = $conn->prepare("
  SELECT title, passing_score, badge_name, questions
  FROM quizzes
  WHERE course_id = ?
  LIMIT 1
");

$stmt->bind_param("i", $course_id);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
  echo json_encode([
    "status" => "success",
    "quiz" => [
      "title" => $row["title"],
      "passing_score" => (int)$row["passing_score"],
      "badge_name" => $row["badge_name"],
      "questions" => json_decode($row["questions"], true)
    ]
  ]);
} else {
  echo json_encode(["status" => "none"]);
}
