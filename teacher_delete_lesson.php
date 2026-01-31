<?php
require "db.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"] ?? null;

if (!$id) {
  echo json_encode(["status" => "error"]);
  exit;
}

$stmt = $conn->prepare("DELETE FROM lessons WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo json_encode(["status" => "success"]);
