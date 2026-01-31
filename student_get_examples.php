<?php
require "db.php";
header("Content-Type: application/json");

$course_id = (int)($_GET["course_id"] ?? 0);
if (!$course_id) {
  echo json_encode(["status"=>"error"]);
  exit;
}

$stmt = $conn->prepare("
  SELECT id, title, description, link
  FROM examples
  WHERE course_id = ?
  ORDER BY id DESC
");

$stmt->bind_param("i", $course_id);
$stmt->execute();
$res = $stmt->get_result();

$examples = [];
while ($row = $res->fetch_assoc()) {
  $examples[] = $row;
}

echo json_encode([
  "status"=>"success",
  "examples"=>$examples
]);
