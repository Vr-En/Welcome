<?php
require "admin_guard.php";
require "db.php";

$res = $conn->query("
  SELECT student_id, fullname, email, role, status
  FROM users
  WHERE role != 'admin'
  ORDER BY fullname
");

$users = [];
while ($row = $res->fetch_assoc()) {
  $users[] = $row;
}

echo json_encode([
  "status" => "success",
  "users" => $users
]);
