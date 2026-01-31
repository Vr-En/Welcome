<?php
require "admin_guard.php";
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$name    = trim($data['name'] ?? '');
$subject = trim($data['subject'] ?? '');

if ($name === '' || $subject === '') {
  echo json_encode(["status" => "error", "message" => "Missing fields"]);
  exit;
}

$stmt = $conn->prepare("
  INSERT INTO courses (name, subject)
  VALUES (?, ?)
");
$stmt->bind_param("ss", $name, $subject);
$stmt->execute();

echo json_encode(["status" => "success"]);
