<?php
session_start();
header('Content-Type: application/json');
include 'db.php';

$sid = $_SESSION['student_id'] ?? '';
if ($sid === '') {
echo json_encode(["status" => "not_logged_in"]);
exit;
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$state = $data['state'] ?? null;
if (!$state) {
echo json_encode(["status" => "invalid"]);
exit;
}

$state_json = json_encode($state);

$stmt = $conn->prepare("
INSERT INTO user_state (student_id, state_json)
VALUES (?, ?)
ON DUPLICATE KEY UPDATE state_json = VALUES(state_json)
");
$stmt->bind_param("ss", $sid, $state_json);

if ($stmt->execute()) {
echo json_encode(["status" => "success"]);
exit;
}

echo json_encode(["status" => "error"]);
exit;
