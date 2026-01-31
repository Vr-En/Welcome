<?php
require "teacher_auth.php";
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$course_id = (int)$data['course_id'];
$description = $data['description'] ?? '';
$topics_json = json_encode($data['topics'] ?? []);
$badge_name = $data['badge_name'] ?? '';
$badge_requirement = $data['badge_requirement'] ?? '';

$stmt = $conn->prepare("
INSERT INTO course_overviews
(course_id, description, topics, badge_name, badge_requirement)
VALUES (?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
description = VALUES(description),
topics = VALUES(topics),
badge_name = VALUES(badge_name),
badge_requirement = VALUES(badge_requirement)
");

$stmt->bind_param(
  "issss",
  $course_id,
  $description,
  $topics_json,
  $badge_name,
  $badge_requirement
);

$stmt->execute();

echo json_encode(["status" => "success"]);
