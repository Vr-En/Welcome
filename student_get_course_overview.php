<?php
require "db.php";

$course_id = (int)($_GET['course_id'] ?? 0);

$sql = "
SELECT
c.name,
c.subject,
o.description,
o.topics,
o.badge_name,
o.badge_requirement,
u.fullname AS teacher_name
FROM courses c
LEFT JOIN course_overviews o ON o.course_id = c.id
LEFT JOIN teacher_courses tc ON tc.course_id = c.id
LEFT JOIN users u ON u.student_id = tc.teacher_id
WHERE c.id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $course_id);
$stmt->execute();

$row = $stmt->get_result()->fetch_assoc();

if ($row) {
    echo json_encode([
    "status" => "success",
    "overview" => [
    "description" => $row["description"],
    "topics" => json_decode($row["topics"], true),
    "badge_name" => $row["badge_name"],
    "badge_requirement" => $row["badge_requirement"],
    "teacher_name" => $row["teacher_name"],
    "subject"  => $row["subject"]
    ]
    ]);
} else {
echo json_encode(["status" => "error"]);
}
