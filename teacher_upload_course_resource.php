<?php
require "db.php";
header("Content-Type: application/json");

/* ===== AUTH (same pattern as others) ===== */
$raw = $_SERVER['HTTP_X_AUTH'] ?? null;
$auth = json_decode($raw, true);
$teacher_id = $auth['id'] ?? null;

if (!$teacher_id) {
  echo json_encode(["status"=>"error","message"=>"Unauthorized"]);
  exit;
}

/* ===== INPUT ===== */
$course_id = (int)($_POST["course_id"] ?? 0);
$name = trim($_POST["name"] ?? "");

if (!$course_id || !$name || !isset($_FILES["file"])) {
  echo json_encode(["status"=>"error","message"=>"Missing fields"]);
  exit;
}

/* ===== FILE ===== */
$file = $_FILES["file"];
$tmp = $file["tmp_name"];
$original = $file["name"];
$size_kb = round($file["size"] / 1024);

$ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));

/* ===== FILE TYPE DETECTION ===== */
$file_type = "file";
if ($ext === "pdf") {
  $file_type = "pdf";
} elseif (in_array($ext, ["mp4", "mov", "webm"])) {
  $file_type = "video";
}

/* ===== SAVE FILE ===== */
$dir = "uploads/resources/";
if (!is_dir($dir)) mkdir($dir, 0777, true);

$filename = time() . "_" . preg_replace("/[^a-zA-Z0-9._-]/", "_", $original);
$path = $dir . $filename;

move_uploaded_file($tmp, $path);

/* ===== INSERT (MATCH YOUR TABLE) ===== */
$stmt = $conn->prepare("
  INSERT INTO resources
  (course_id, name, file_path, file_type, file_size_kb, uploaded_by)
  VALUES (?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
  "isssii",
  $course_id,
  $name,
  $path,
  $file_type,
  $size_kb,
  $teacher_id
);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success"]);
} else {
  echo json_encode(["status"=>"error","message"=>"DB insert failed"]);
}
