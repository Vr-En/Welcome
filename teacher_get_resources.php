<?php
require "db.php";
header("Content-Type: application/json");

$course_id = (int)($_GET["course_id"] ?? 0);
if (!$course_id) {
  echo json_encode(["status"=>"error"]);
  exit;
}

$stmt = $conn->prepare("
  SELECT id, name, file_type, file_path, file_size_kb
  FROM resources
  WHERE course_id = ?
  ORDER BY created_at DESC
");

$stmt->bind_param("i", $course_id);
$stmt->execute();

$res = $stmt->get_result();
$rows = [];

while ($r = $res->fetch_assoc()) {
  $rows[] = $r;
}

echo json_encode([
  "status"=>"success",
  "resources"=>$rows
]);
