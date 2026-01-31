<?php
require "db.php";
header("Content-Type: application/json");

$course_id = (int)($_GET["course_id"] ?? 0);

if (!$course_id) {
  echo json_encode(["status" => "error", "message" => "Missing course_id"]);
  exit;
}

    $stmt = $conn->prepare("
    SELECT
        id,
        name,
        file_path,
        file_type,
        file_size_kb
    FROM resources
    WHERE course_id = ?
    ORDER BY created_at DESC
    ");

$stmt->bind_param("i", $course_id);
$stmt->execute();
$res = $stmt->get_result();

$resources = [];
while ($row = $res->fetch_assoc()) {
  $resources[] = $row;
}

echo json_encode([
  "status" => "success",
  "resources" => $resources
]);
