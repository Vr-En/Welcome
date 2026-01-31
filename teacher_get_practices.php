<?php
require "teacher_auth.php";
require "db.php";

$course_id = (int)($_GET['course_id'] ?? 0);

if (!$course_id) {
  echo json_encode(["status" => "error", "message" => "Missing course_id"]);
  exit;
}

$stmt = $conn->prepare("
  SELECT id, title, duration, link
  FROM practices
  WHERE course_id = ?
  ORDER BY id DESC
");

$stmt->bind_param("i", $course_id);
$stmt->execute();

$result = $stmt->get_result();
$practices = [];

while ($row = $result->fetch_assoc()) {
  $practices[] = [
    "id"       => (int)$row["id"],
    "title"    => $row["title"],
    "duration" => $row["duration"],
    "link"     => $row["link"]
  ];
}

echo json_encode([
  "status" => "success",
  "practices" => $practices
]);
