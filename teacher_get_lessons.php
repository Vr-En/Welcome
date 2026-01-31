<?php
require "teacher_auth.php";
require "db.php";

$course_id = intval($_GET["course_id"] ?? 0);

$stmt = $pdo->prepare("
  SELECT id, title, pages
  FROM lessons
  WHERE course_id = ?
  ORDER BY id ASC
");
$stmt->execute([$course_id]);

echo json_encode([
  "status" => "success",
  "lessons" => $stmt->fetchAll(PDO::FETCH_ASSOC)
]);
