    <?php
    require "db.php";

    $sql = "
    SELECT
    u.student_id AS teacher_id,
    u.fullname,
    u.email,
    GROUP_CONCAT(c.subject SEPARATOR ', ') AS subjects
    FROM users u
    LEFT JOIN teacher_courses tc ON tc.teacher_id = u.student_id
    LEFT JOIN courses c ON c.id = tc.course_id
    WHERE u.role = 'teacher'
    GROUP BY u.student_id, u.fullname, u.email
    ";

    $res = $conn->query($sql);

    $teachers = [];
    while ($row = $res->fetch_assoc()) {
    $teachers[] = $row;
    }

    echo json_encode([
    "status" => "success",
    "teachers" => $teachers
    ]);
