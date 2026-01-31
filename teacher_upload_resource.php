<?php
header('Content-Type: application/json');
include 'teacher_auth.php';
include 'db.php';

$course_id = intval($_POST['course_id'] ?? 0);

if ($course_id <= 0) {
echo json_encode(["status" => "error", "message" => "Invalid course"]);
exit;
}

if (!isset($_FILES["file"])) {
echo json_encode(["status" => "error", "message" => "No file uploaded"]);
exit;
}

$file = $_FILES["file"];
if ($file["error"] !== UPLOAD_ERR_OK) {
echo json_encode(["status" => "error", "message" => "Upload error"]);
exit;
}

if ($file["size"] > 10 * 1024 * 1024) {
echo json_encode(["status" => "error", "message" => "Max 10MB only"]);
exit;
}

$dir = __DIR__ . "/uploads/resources/";
if (!is_dir($dir)) mkdir($dir, 0777, true);

$origName = basename($file["name"]);
$safeName = preg_replace("/[^a-zA-Z0-9._-]/", "_", $origName);

$filename = "res_" . $course_id . "_" . time() . "_" . $safeName;
$diskPath = $dir . $filename;
$dbPath   = "uploads/resources/" . $filename;

if (!move_uploaded_file($file["tmp_name"], $diskPath)) {
echo json_encode(["status" => "error", "message" => "Failed to save"]);
exit;
}

$fileType = mime_content_type($diskPath) ?: "application/octet-stream";
$fileSizeKb = intval(round(filesize($diskPath) / 1024));
$uploaded_by = $_SESSION['student_id'];

$stmt = $conn->prepare("INSERT INTO resources (course_id, name, file_path, file_type, file_size_kb, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isssis", $course_id, $safeName, $dbPath, $fileType, $fileSizeKb, $uploaded_by);
$stmt->execute();

echo json_encode(["status" => "success", "file_path" => $dbPath]);
exit;
