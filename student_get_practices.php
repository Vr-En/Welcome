<?php
require "db.php";

$course_id = intval($_GET["course_id"] ?? 0);

$stmt = $conn->prepare("
  SELECT id, title, duration, link
  FROM practices
  WHERE course_id = ?
");
$stmt->bind_param("i", $course_id);
$stmt->execute();

$result = $stmt->get_result();

echo json_encode([
  "status" => "success",
  "practices" => $result->fetch_all(MYSQLI_ASSOC)
]);
