<?php
header("Content-Type: application/json");
require "db.php";

/* ========= AUTH (X-Auth) ========= */
$raw = $_SERVER["HTTP_X_AUTH"] ?? null;
if (!$raw) {
  echo json_encode(["status"=>"error","message"=>"No auth"]);
  exit;
}

$auth = json_decode($raw, true);
$teacher_id = $auth["id"] ?? null;

if (!$teacher_id) {
  echo json_encode(["status"=>"error","message"=>"Invalid auth"]);
  exit;
}

/* ========= READ BODY ========= */
$data = json_decode(file_get_contents("php://input"), true);

$course_id   = (int)($data["course_id"] ?? 0);
$title       = trim($data["title"] ?? "");
$description = trim($data["description"] ?? "");
$link        = trim($data["link"] ?? "");

if (!$course_id || !$title || !$link) {
  echo json_encode(["status"=>"error","message"=>"Missing fields"]);
  exit;
}

/* ========= SAVE ========= */
$stmt = $conn->prepare("
  INSERT INTO examples (course_id, title, description, link)
  VALUES (?, ?, ?, ?)
");

$stmt->bind_param("isss", $course_id, $title, $description, $link);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success"]);
} else {
  echo json_encode(["status"=>"error","message"=>"DB insert failed"]);
}
