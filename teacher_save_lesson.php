<?php
ini_set('display_errors', 0);
ini_set('html_errors', 0);
error_reporting(E_ALL);

header("Content-Type: application/json");
require "db.php";

/* =========================
   AUTH (X-Auth)
========================= */
$raw = $_SERVER['HTTP_X_AUTH'] ?? null;
if (!$raw) {
  echo json_encode(["status" => "error", "message" => "No auth"]);
  exit;
}

$auth = json_decode($raw, true);
$teacher_id = $auth['id'] ?? null;

if (!$teacher_id) {
  echo json_encode(["status" => "error", "message" => "Invalid teacher"]);
  exit;
}

/* =========================
   READ JSON BODY
========================= */
$data = json_decode(file_get_contents("php://input"), true);

$course_id   = (int)($data["course_id"] ?? 0);
$title       = trim($data["title"] ?? "");
$description = trim($data["description"] ?? "");
$duration    = trim($data["duration"] ?? "");
$objectives  = $data["objectives"] ?? [];
$link        = trim($data["link"] ?? "");

if (!$course_id || !$title) {
  echo json_encode(["status" => "error", "message" => "Missing required fields"]);
  exit;
}

/* =========================
   BUILD PAGES JSON
========================= */
$pages = json_encode([
  "description" => $description,
  "duration"    => $duration,
  "objectives"  => $objectives,
  "link"        => $link
], JSON_UNESCAPED_UNICODE);

/* =========================
   INSERT (MATCH YOUR TABLE)
========================= */
$stmt = $conn->prepare("
  INSERT INTO lessons (course_id, title, pages)
  VALUES (?, ?, ?)
");

if (!$stmt) {
  echo json_encode([
    "status" => "error",
    "message" => "Prepare failed"
  ]);
  exit;
}

$stmt->bind_param(
  "iss",
  $course_id,
  $title,
  $pages
);

if ($stmt->execute()) {
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode([
    "status" => "error",
    "message" => "Insert failed"
  ]);
}

