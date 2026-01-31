<?php
require_once "session_config.php";
header('Content-Type: application/json');
include 'db.php';

$sid = $_SESSION['student_id'] ?? '';
if ($sid === '') {
echo json_encode(["status" => "not_logged_in"]);
exit;
}

$stmt = $conn->prepare("SELECT state_json FROM user_state WHERE student_id = ?");
$stmt->bind_param("s", $sid);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
echo json_encode([
"status" => "success",
"state" => json_decode($row['state_json'], true)
]);
exit;
}

echo json_encode(["status" => "empty"]); // no saved data yet
exit;
