<?php
require "db.php";

$sql = "
SELECT
  c.id,
  c.name,
  c.subject,
  u.fullname AS teacher_name
FROM courses c
LEFT JOIN teacher_courses tc ON tc.course_id = c.id
LEFT JOIN users u ON u.student_id = tc.teacher_id
ORDER BY c.name
";

$res = $conn->query($sql);

$courses = [];
while ($row = $res->fetch_assoc()) {
  $courses[] = $row;
}

echo json_encode([
  "status" => "success",
  "courses" => $courses
]);
