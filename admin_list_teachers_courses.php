<?php
require "admin_guard.php";
require "db.php";

$teachers = [];
$res = $conn->query("
  SELECT student_id AS teacher_id, fullname
  FROM users
  WHERE role = 'teacher'
  ORDER BY fullname
");

while ($r = $res->fetch_assoc()) {
  $teachers[] = $r;
}

$courses = [];
$res2 = $conn->query("
  SELECT id, name, subject
  FROM courses
  ORDER BY name
");

while ($r = $res2->fetch_assoc()) {
  $courses[] = $r;
}

echo json_encode([
  "status" => "success",
  "teachers" => $teachers,
  "courses" => $courses
]);
