<?php
header('Content-Type: application/json');
include 'db.php';

// Check if admin already exists
$check = $conn->query("SELECT id FROM users WHERE role='admin' LIMIT 1");
if ($check && $check->num_rows > 0) {
  echo json_encode(["status"=>"already_exists","message"=>"Admin already exists. Delete bootstrap files now."]);
  exit;
}

$admin_id  = $_POST['admin_id'] ?? '';
$fullname  = $_POST['fullname'] ?? '';
$email     = $_POST['email'] ?? '';
$password  = $_POST['password'] ?? '';

if ($admin_id === '' || $fullname === '' || $email === '' || $password === '') {
  echo json_encode(["status"=>"error","message"=>"Missing fields"]);
  exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

// grade_level can be NULL for admin
$grade_level = null;

$stmt = $conn->prepare("INSERT INTO users (student_id, fullname, email, grade_level, password, role)
                        VALUES (?, ?, ?, ?, ?, 'admin')");
$stmt->bind_param("sssss", $admin_id, $fullname, $email, $grade_level, $hash);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success","message"=>"Admin created! Now delete bootstrap_admin.html & bootstrap_admin.php"]);
  exit;
}

echo json_encode(["status"=>"error","message"=>"Failed to create admin"]);
exit;
