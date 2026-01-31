<?php
header("Content-Type: application/json");

$raw = $_SERVER['HTTP_X_AUTH'] ?? '';
$auth = json_decode($raw, true);

if (!$auth || ($auth['role'] ?? '') !== 'teacher') {
  echo json_encode(["status" => "error", "message" => "Forbidden"]);
  exit;
}
    