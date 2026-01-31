<?php
header("Content-Type: application/json");
require "db.php";

// READ AUTH FROM HEADER
$rawAuth = $_SERVER["HTTP_X_AUTH"] ?? null;
if (!$rawAuth) {
  echo json_encode(["status"=>"error","message"=>"No auth"]);
  exit;
}

$auth = json_decode($rawAuth, true);
$teacher_id = $auth["id"] ?? null;

if (!$teacher_id) {
  echo json_encode(["status"=>"error","message"=>"Not logged in"]);
  exit;
}

// READ JSON BODY
$data = json_decode(file_get_contents("php://input"), true);

$course_id = (int)($data["course_id"] ?? 0);
$title     = trim($data["title"] ?? "");
$duration  = trim($data["duration"] ?? "");
$link      = trim($data["link"] ?? "");

if (!$course_id || !$title || !$duration || !$link) {
  echo json_encode(["status"=>"error","message"=>"Missing fields"]);
  exit;
}

// INSERT (MYSQLI)
$stmt = $conn->prepare(
  "INSERT INTO practices (course_id, teacher_id, title, duration, link)
   VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param(
  "iisss",
  $course_id,
  $teacher_id,
  $title,
  $duration,
  $link
);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success"]);
} else {
  echo json_encode([
    "status"=>"error",
    "message"=>$stmt->error
  ]);
}
