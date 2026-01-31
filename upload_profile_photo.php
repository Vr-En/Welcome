<?php
header("Content-Type: application/json");
require "db.php";

$headers = getallheaders();
if (!isset($headers["X-Auth"])) {
  echo json_encode(["status" => "error", "message" => "Not authenticated"]);
  exit;
}

$auth = json_decode($headers["X-Auth"], true);
$userId = $auth["id"] ?? null;

if (!$userId || !isset($_FILES["photo"])) {
  echo json_encode(["status" => "error", "message" => "Invalid request"]);
  exit;
}

$file = $_FILES["photo"];

$allowed = ["jpg", "jpeg", "png", "webp"];
$ext = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

if (!in_array($ext, $allowed)) {
  echo json_encode(["status" => "error", "message" => "Invalid file type"]);
  exit;
}

$dir = "uploads/profile_photos/";
if (!is_dir($dir)) mkdir($dir, 0777, true);

$filename = "user_" . $userId . "." . $ext;
$path = $dir . $filename;

move_uploaded_file($file["tmp_name"], $path);

// SAVE TO DB
$stmt = $conn->prepare("UPDATE users SET profile_photo = ? WHERE id = ?");
$stmt->bind_param("si", $path, $userId);
$stmt->execute();

echo json_encode([
  "status" => "success",
  "photo_url" => $path
]);
