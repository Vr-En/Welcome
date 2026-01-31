// ===============================
// ADMIN AUTH GUARD (FRONTEND)
// ===============================
(function () {
  try {
    const auth = JSON.parse(localStorage.getItem("clasmeyt_auth") || "null");
    if (!auth || auth.role !== "admin") {
      window.location.href = "Welcome.html";
    }
  } catch {
    window.location.href = "Welcome.html";
  }
})();

// ===============================
// HELPERS
// ===============================
async function apiForm(url, formData) {
  const res = await fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include"
  });
  return res.json();
}

// ===============================
// CREATE TEACHER
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("teacherForm");
  const result = document.getElementById("result");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const data = await apiForm("admin_create_teacher.php", fd);
      result.textContent = JSON.stringify(data, null, 2);
      loadTeachersAndCourses(); // refresh dropdown
      loadAdminUsers();         // refresh users
    });
  }
});

// ===============================
// LOGOUT
// ===============================
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("clasmeyt_auth");
  fetch("logout.php", { credentials: "include" });
  window.location.href = "Welcome.html";
});

// ===============================
// LOAD USERS
// ===============================
async function loadAdminUsers() {
  const tbody = document.getElementById("adminUsersTbody");
  if (!tbody) return;

  tbody.innerHTML = `<tr><td>Loading...</td></tr>`;

  try {
    const res = await fetch("admin_list_users.php", { credentials: "include" });
    const data = await res.json();

    if (data.status !== "success") {
      tbody.innerHTML = `<tr><td>Failed to load users</td></tr>`;
      return;
    }

    tbody.innerHTML = data.users.map(u => `
      <tr>
        <td>${u.student_id}</td>
        <td>${u.fullname}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${u.status}</td>
        <td><button onclick="resetPassword('${u.student_id}')">Reset</button></td>
      </tr>
    `).join("");

  } catch {
    tbody.innerHTML = `<tr><td>Server error</td></tr>`;
  }
}

document.getElementById("adminRefreshBtn")?.addEventListener("click", loadAdminUsers);


// LOAD TEACHERS & COURSES

async function loadTeachersAndCourses() {
  const teacherSel = document.getElementById("assignTeacher");
  const courseSel = document.getElementById("assignCourse");
  if (!teacherSel || !courseSel) return;

  const res = await fetch("admin_list_teachers_courses.php", {
    credentials: "include"
  });
  const data = await res.json();
  if (data.status !== "success") return;

  teacherSel.innerHTML = `<option value="">Select Teacher</option>`;
  courseSel.innerHTML = `<option value="">Select Course</option>`;

  data.teachers.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.teacher_id;
    opt.textContent = `${t.fullname} (${t.teacher_id})`;
    teacherSel.appendChild(opt);
  });

  data.courses.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.subject})`;
    courseSel.appendChild(opt);
  });
}


// ASSIGN TEACHER → COURSE

document.getElementById("assignBtn")?.addEventListener("click", async () => {
const teacherSel = document.getElementById("assignTeacher");
const courseSel = document.getElementById("assignCourse");
const msg = document.getElementById("assignMsg");

const teacherId = teacherSel.value;
const courseId = courseSel.value;

if (!teacherId || !courseId) {
    msg.textContent = "❌ Please select teacher and course.";
    msg.className = "text-red-500";
    return;
}

msg.textContent = "Assigning...";
msg.className = "text-gray-500";

const res = await fetch("admin_assign_teacher.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
    teacher_id: teacherId,
    course_id: courseId
    })
});

const data = await res.json();

if (data.status === "success") {
    msg.textContent = " Teacher successfully assigned to course!";
    msg.className = "text-green-600";

    teacherSel.value = "";
    courseSel.value = "";
} else {
    msg.textContent = "❌ Assignment failed.";
    msg.className = "text-red-500";
}
});




// INIT

document.addEventListener("DOMContentLoaded", () => {
  loadAdminUsers();
  loadTeachersAndCourses();
});


// CREATE COURSE (ADMIN)

document.getElementById("createCourseBtn")?.addEventListener("click", async () => {
  const name = document.getElementById("newCourseName").value.trim();
  const subject = document.getElementById("newCourseSubject").value.trim();
  const msg = document.getElementById("courseCreateMsg");

  if (!name || !subject) {
    msg.textContent = "❌ Please enter course name and subject.";
    msg.className = "text-red-500";
    return;
  }

  msg.textContent = "Saving...";
  msg.className = "text-gray-500";

  try {
    const res = await fetch("admin_create_course.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, subject })
    });

    const data = await res.json();

    if (data.status === "success") {
      msg.textContent = " Course added successfully!";
      msg.className = "text-green-600";

      document.getElementById("newCourseName").value = "";
      document.getElementById("newCourseSubject").value = "";

      // refresh assign dropdowns
      loadTeachersAndCourses();
    } else {
      msg.textContent = "❌ " + (data.message || "Failed to add course");
      msg.className = "text-red-500";
    }
  } catch (e) {
    msg.textContent = "❌ Server error";
    msg.className = "text-red-500";
  }
});

