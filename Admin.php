<?php
// Admin.php
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Admin Panel</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 min-h-screen">

<div class="max-w-6xl mx-auto p-6">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold text-gray-800">Admin Panel</h1>
    <button onclick="logout()"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
      Logout
    </button>
  </div>

  <!--  Create Teacher Account -->
  <div class="bg-white rounded-xl shadow p-6 mb-8">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Create Teacher Account</h2>

    <form id="teacherForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="teacher_id" placeholder="Teacher ID" required
        class="border border-gray-300 rounded-lg px-4 py-2">

      <input name="fullname" placeholder="Full name" required
        class="border border-gray-300 rounded-lg px-4 py-2">

      <input name="email" type="email" placeholder="Email" required
        class="border border-gray-300 rounded-lg px-4 py-2">

      <input name="password" type="password" placeholder="Password" required
        class="border border-gray-300 rounded-lg px-4 py-2">

      <button type="submit"
        class="md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
        Create Teacher
      </button>
    </form>

    <pre id="teacherResult" class="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm overflow-auto"></pre>
  </div>

  <!--  User Management -->
  <!-- ================= ADD COURSE ================= -->
<div class="bg-white rounded-xl shadow-lg p-6 mt-8">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">
    Add New Course
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <input
      id="newCourseName"
      class="border rounded px-4 py-2"
      placeholder="Course Name (e.g. Advanced Mathematics)"
    />

    <input
      id="newCourseSubject"
      class="border rounded px-4 py-2"
      placeholder="Subject (e.g. Math, Science)"
    />

<button
  type="button"
  id="createCourseBtn"
  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Save Course
</button>


  </div>

  <div id="courseCreateMsg" class="text-sm"></div>
</div>

      <!-- Assign Teacher to Course -->
<div class="bg-white rounded-xl shadow-lg p-6 mt-8">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">
    Assign Teacher to Course
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <select id="assignTeacher" class="border rounded px-4 py-2">
      <option value="">Select Teacher</option>
    </select>

    <select id="assignCourse" class="border rounded px-4 py-2">
      <option value="">Select Course</option>
    </select>

  <button
  type="button"
  id="assignBtn"
  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
  Assign
</button>

  </div>

  <div id="assignMsg" class="text-sm"></div>
  <div class="bg-white rounded-xl shadow p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">User Management</h2>

    <div class="flex flex-col md:flex-row gap-3 mb-4">
      <input id="adminUserSearch" type="text"
        placeholder="Search by name, ID, email..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2" />
      <button id="adminRefreshBtn"
        class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium">
        Refresh
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="text-left border-b">
            <th class="py-2 pr-4">ID</th>
            <th class="py-2 pr-4">Fullname</th>
            <th class="py-2 pr-4">Email</th>
            <th class="py-2 pr-4">Role</th>
            <th class="py-2 pr-4">Status</th>
            <th class="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody id="adminUsersTbody">
          <tr><td class="py-3 text-gray-500" colspan="6">Loading...</td></tr>
        </tbody>
      </table>
    </div>

    <p class="text-xs text-gray-500 mt-3">
      Note: Admin can manage only student/teacher users.
    </p>
  </div>
</div>

<script>
async function apiJson(url, payload=null) {
  const opts = payload
    ? { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) }
    : {};
  const res = await fetch(url, opts);
  return res.json();
}

async function apiForm(url, formData) {
  const res = await fetch(url, { method: "POST", body: formData });
  return res.json();
}

function esc(s){ return String(s??"").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

/*  Create Teacher */
document.getElementById("teacherForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = await apiForm("admin_create_teacher.php", fd);
  document.getElementById("teacherResult").textContent = JSON.stringify(data, null, 2);
  if (data.status === "success") {
    e.target.reset();
    loadUsers(document.getElementById("adminUserSearch").value.trim());
  }
});

/*  User Management */
async function loadUsers(q="") {
  const tbody = document.getElementById("adminUsersTbody");
  tbody.innerHTML = `<tr><td class="py-3 text-gray-500" colspan="6">Loading...</td></tr>`;

  const url = "admin_list_users.php" + (q ? `?q=${encodeURIComponent(q)}` : "");
  const data = await apiJson(url);

  if (data.status !== "success") {
    tbody.innerHTML = `<tr><td class="py-3 text-red-500" colspan="6">${esc(data.message||"Failed")}</td></tr>`;
    return;
  }

  const users = data.users || [];
  if (users.length === 0) {
    tbody.innerHTML = `<tr><td class="py-3 text-gray-500" colspan="6">No users found.</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(u => `
    <tr class="border-b">
      <td class="py-2 pr-4">${esc(u.student_id)}</td>
      <td class="py-2 pr-4">${esc(u.fullname)}</td>
      <td class="py-2 pr-4">${esc(u.email)}</td>

      <td class="py-2 pr-4">
        <select class="border rounded px-2 py-1"
          onchange="changeRole('${esc(u.student_id)}', this.value)">
          <option value="student" ${u.role==="student"?"selected":""}>student</option>
          <option value="teacher" ${u.role==="teacher"?"selected":""}>teacher</option>
        </select>
      </td>

      <td class="py-2 pr-4">
        <select class="border rounded px-2 py-1"
          onchange="setStatus('${esc(u.student_id)}', this.value)">
          <option value="active" ${u.status==="active"?"selected":""}>active</option>
          <option value="suspended" ${u.status==="suspended"?"selected":""}>suspended</option>
        </select>
      </td>

      <td class="py-2 pr-4">
        <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          onclick="resetPass('${esc(u.student_id)}')">
          Reset Password
        </button>
      </td>
    </tr>
  `).join("");
}

async function changeRole(student_id, role) {
  const ok = confirm(`Change role of ${student_id} to ${role}?`);
  if (!ok) return;
  const data = await apiJson("admin_update_role.php", { student_id, role });
  if (data.status !== "success") alert(data.message || "Failed to change role");
}

async function setStatus(student_id, status) {
  const ok = confirm(`Set ${student_id} to ${status}?`);
  if (!ok) return;
  const data = await apiJson("admin_set_status.php", { student_id, status });
  if (data.status !== "success") alert(data.message || "Failed to update status");
}

async function resetPass(student_id) {
  const ok = confirm(`Reset password of ${student_id}?`);
  if (!ok) return;
  const data = await apiJson("admin_reset_password.php", { student_id });
  if (data.status !== "success") {
    alert(data.message || "Failed to reset password");
    return;
  }
  alert(`Temporary password for ${student_id}:\n\n${data.temp_password}\n\nCopy it now.`);
}

let t = null;
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("adminUserSearch");
  const refresh = document.getElementById("adminRefreshBtn");

  loadUsers("");

  refresh.addEventListener("click", () => loadUsers(search.value.trim()));
  search.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => loadUsers(search.value.trim()), 300);
  });
});

async function logout() {
  localStorage.removeItem("clasmeyt_auth");
  window.location.href = "Welcome.html";
}

</script>
<script>
(function () {
  const auth = JSON.parse(localStorage.getItem("clasmeyt_auth") || "null");
  if (!auth || auth.role !== "admin") {
    window.location.href = "Welcome.html";
  }
})();
</script>

<script src="admin.js"></script>

</body>
</html>
