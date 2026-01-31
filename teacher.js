
//  LOGOUT (GLOBAL)
function logout() {
  localStorage.removeItem("clasmeyt_auth");
  window.location.href = "Welcome.html";
}
let quizQuestions = [];
let teacherCourses = [];
let currentCourseId = null;
function getAuth() {
  try {
    return JSON.parse(localStorage.getItem("clasmeyt_auth") || "null");
  } catch {
    return null;
  }
}

const PREDEFINED_BADGES = [
  "Math Wizard",
  "Science Explorer",
  "Literary Scholar",
  "History Buff",
  "Chemistry Master",
  "Tech Innovator"
];


// TEACHER GUARD (ISA LANG)
(function () {
  const auth = getAuth();
  if (!auth || auth.role !== "teacher") {
    window.location.href = "Welcome.html";
  }
})();

async function postForm(url, formEl) {
  const fd = new FormData(formEl);
  const res = await fetch(url, { method: "POST", body: fd });
  return res.json();
}

let currentTeacherCourse = null;

function hideAllTeacherViews() {
  document.getElementById("teacher-dashboard").classList.add("hidden");
  document.getElementById("teacher-course-overview").classList.add("hidden");
  document.getElementById("teacher-course-lessons").classList.add("hidden");
  document.getElementById("teacher-course-practices").classList.add("hidden");
  document.getElementById("teacher-course-quiz").classList.add("hidden");
  document.getElementById("teacher-course-examples").classList.add("hidden");
  document.getElementById("teacher-course-resources").classList.add("hidden");

}

function backToCourses() {
  hideAllTeacherViews();
  document.getElementById("teacher-dashboard").classList.remove("hidden");
}

function renderTeacherCourses(courses) {
  const list = document.getElementById("courseList");

  list.innerHTML = courses.map(c => `
    <div class="border rounded p-4 flex justify-between items-center">
      <div>
        <h4 class="font-bold">${c.name}</h4>
        <p class="text-sm text-gray-600">${c.subject}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="openOverview(${c.id})"
          class="bg-blue-500 text-white px-3 py-1 rounded">
          Overview
        </button>
        <button onclick="openLessons(${c.id})"
          class="bg-green-500 text-white px-3 py-1 rounded">
          Lessons
        </button>
        <!-- PRACTICES BUTTON -->
        <button onclick="openPractices(${c.id})"
          class="bg-orange-500 text-white px-3 py-1 rounded">
          Practices
        </button>
        
        <button onclick="openQuiz(${c.id})"
          class="bg-purple-500 text-white px-3 py-1 rounded">
          Quizzes
        </button>

        <button onclick="openExamples(${c.id})"
        class="bg-indigo-500 text-white px-3 py-1 rounded">
        Examples
        </button>

        <button
        onclick="openResources(${c.id})"
        class="bg-teal-500 text-white px-3 py-1 rounded">
        Resources
</button>


      </div>
    </div>
  `).join("");
}


function openOverview(courseId) {
  currentTeacherCourse = teacherCourses.find(c => c.id === courseId);
  if (!currentTeacherCourse) return;

  //  SET CURRENT COURSE ID
  currentCourseId = Number(courseId);

  hideAllTeacherViews();
  document.getElementById("teacher-course-overview").classList.remove("hidden");

  document.getElementById("overviewCourseTitle").textContent =
    `Course Overview: ${currentTeacherCourse.name}`;

  console.log(" Overview opened for course:", currentCourseId);
  
    loadOverviewBadgeOptions();
}


function openLessons(courseId) {
  currentTeacherCourse = teacherCourses.find(c => c.id === courseId);
  if (!currentTeacherCourse) return;

currentCourseId = courseId;

  hideAllTeacherViews();
  document.getElementById("teacher-course-lessons").classList.remove("hidden");

  document.getElementById("lessonsCourseTitle").textContent =
    `Lessons: ${currentTeacherCourse.name}`;

  loadLessonsForTeacher(courseId);
}

async function getJson(url) {
  const res = await fetch(url);
  return res.json();
}

async function refreshCourses() {
  const data = await getJson("teacher_list_courses.php");

  const list = document.getElementById("courseList");
  const sel = document.getElementById("resourceCourse");

  list.innerHTML = "";
  sel.innerHTML = `<option value="">Select Course</option>`;

  if (data.status !== "success") {
    list.innerHTML = `<p class="text-red-500">Not allowed / not logged in as teacher.</p>`;
    return;
  }

  data.courses.forEach(c => {
    // list
    const div = document.createElement("div");
    div.className = "border rounded-lg p-4 cursor-pointer hover:bg-blue-50";
    div.innerHTML = `
  <div class="font-bold text-gray-800">${c.name}</div>
  <div class="text-sm text-gray-600">${c.subject}</div>
  <div class="text-xs text-gray-500">Created: ${c.created_at}</div>
`;


list.appendChild(div);

    // select
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.subject})`;
    sel.appendChild(opt);
  });
const lessonSelect = document.getElementById("lessonCourseSelect");
lessonSelect.addEventListener("change", () => {
  currentCourseId = lessonSelect.value || null;
  console.log("Course selected from dropdown:", currentCourseId);
});

lessonSelect.innerHTML = `<option value="">Select Course</option>`;

data.courses.forEach(c => {
  const opt = document.createElement("option");
  opt.value = c.id;
  opt.textContent = `${c.name} (${c.subject})`;
  lessonSelect.appendChild(opt);
});


}
async function loadTeacherCourses() {
  const data = await getJson("teacher_list_courses.php");

  if (data.status !== "success") {
    document.getElementById("courseList").innerHTML =
      "<p class='text-red-500'>Failed to load courses</p>";
    return;
  }

  teacherCourses = data.courses.map(c => ({
    id: Number(c.id),
    name: c.name,
    subject: c.subject
  }));

  renderTeacherCourses(teacherCourses);
}


  document.addEventListener("DOMContentLoaded", () => {

  loadTeacherCourses();
  loadQuizBadgeOptions();
    // create course
  const createForm = document.getElementById("createCourseForm");
  if (createForm) {
    createForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = document.getElementById("createCourseMsg");
      if (msg) msg.textContent = "Saving...";

      const data = await postForm("teacher_create_course.php", createForm);
      if (data.status === "success") {
        if (msg) msg.textContent = " Course created!";
        createForm.reset();
        refreshCourses();
      } else {
        if (msg) msg.textContent = "❌ " + (data.message || "Failed");
      }
    });
  }


  // upload resource
  const uploadForm = document.getElementById("uploadResourceForm");
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("uploadMsg");
    msg.textContent = "Uploading...";

    const data = await postForm("teacher_upload_resource.php", uploadForm);
    if (data.status === "success") {
      msg.textContent = " Uploaded!";
      uploadForm.reset();
      refreshCourses();
    } else {
      msg.textContent = "❌ " + (data.message || "Failed");
    }
  });
});

let pageCounter = 0;

function addLessonPage(text = "") {
  pageCounter++;
  const div = document.createElement("div");
  div.className = "border p-3 rounded";

  div.innerHTML = `
    <label class="text-sm font-medium">Page ${pageCounter}</label>
    <textarea class="lesson-page w-full border rounded mt-1 p-2"
      rows="3"
      placeholder="Lesson content...">${text}</textarea>
  `;

  document.getElementById("lessonPages").appendChild(div);
}

async function saveLesson() {
  console.log(" saveLesson called");
  console.log(" currentCourseId:", currentCourseId);

  if (!currentCourseId) {
    alert(" Please select a course first");
    return;
  }

  const title = document.getElementById("lessonTitle").value.trim();
  const duration = document.getElementById("lessonDuration").value.trim();
  const description = document.getElementById("lessonDescription").value.trim();
  const link = document.getElementById("lessonLink").value.trim();

  // objectives = array (VERY IMPORTANT)
  const objectives = document
    .getElementById("lessonObjectives")
    .value
    .split("\n")
    .map(o => o.trim())
    .filter(Boolean);

  if (!title) {
    alert(" Lesson title is required");
    return;
  }

  const payload = {
    course_id: currentCourseId,
    title,
    duration,
    description,
    objectives, // ARRAY
    link
  };

  const auth = localStorage.getItem("clasmeyt_auth");

  const res = await fetch("teacher_save_lesson.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log(" saveLesson response:", data);

  if (data.status === "success") {
    alert(" Lesson saved successfully");

    // clear form
    document.getElementById("lessonTitle").value = "";
    document.getElementById("lessonDuration").value = "";
    document.getElementById("lessonDescription").value = "";
    document.getElementById("lessonObjectives").value = "";
    document.getElementById("lessonLink").value = "";

    // reload lessons list
    loadLessonsForTeacher(currentCourseId);
  } else {
    alert("❌ " + (data.message || "Save failed"));
  }
}



async function saveLinkLesson() {
  console.log(" Save Lesson button clicked");
  const courseId = document.getElementById("lessonCourseSelect").value;
  const title = document.getElementById("lessonTitle").value.trim();
  const duration = document.getElementById("lessonDuration").value.trim();
  const description = document.getElementById("lessonDescription").value.trim();
  const objectives = document.getElementById("lessonObjectives").value
    .split("\n")
    .map(o => o.trim())
    .filter(Boolean);
  const link = document.getElementById("lessonLink").value.trim();

  const msg = document.getElementById("lessonMsg");

  if (!courseId || !title || !link) {
    msg.textContent = " Course, title, and link are required.";
    return;
  }

const auth = localStorage.getItem("clasmeyt_auth");

const res = await fetch("teacher_save_lesson.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Auth": auth
  },
  body: JSON.stringify({
    course_id: courseId,
    title,
    duration,
    description,
    objectives,
    link
  })
});


  const data = await res.json();

  msg.textContent =
    data.status === "success"
      ? " Lesson saved"
      : "Save failed";
}

async function saveCourseOverview(courseId) {
  // 🔒 Course safety
  if (!courseId || !Number.isInteger(Number(courseId))) {
    alert(" No course selected. Please open a course overview first.");
    return;
  }

  const description = document.getElementById("overviewDesc").value.trim();
  const badgeName = document.getElementById("badgeName").value.trim();
  const badgeReq = document.getElementById("badgeRequirement").value.trim();

  const topics = document
    .getElementById("overviewTopics")
    .value
    .split("\n")
    .map(t => t.trim())
    .filter(Boolean);

  //  VALIDATION (THIS IS THE FIX)
  if (!description) {
    alert(" Course description is required");
    return;
  }

  if (topics.length === 0) {
    alert(" Please add at least one topic");
    return;
  }

  if (!badgeName) {
    alert(" Badge name is required");
    return;
  }

  if (!badgeReq) {
    alert(" Badge requirement is required");
    return;
  }

  // PAYLOAD
  const payload = {
    course_id: Number(courseId),
    description,
    topics,
    badge_name: badgeName,
    badge_requirement: badgeReq
  };

  const auth = localStorage.getItem("clasmeyt_auth");

  const res = await fetch("teacher_save_course_overview.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (data.status === "success") {
    alert(" Course overview saved successfully");
  } else {
    alert("❌ " + (data.message || "Save failed"));
  }
}




function openPractices(courseId) {
  currentTeacherCourse = teacherCourses.find(c => c.id === courseId);
  if (!currentTeacherCourse) return;

  currentCourseId = courseId;

  hideAllTeacherViews();
  document
    .getElementById("teacher-course-practices")
    .classList.remove("hidden");

  document.getElementById("practicesCourseTitle").textContent =
    `Practices: ${currentTeacherCourse.name}`;

  loadPracticesForTeacher(courseId); 
}

async function loadPracticesForTeacher(courseId) {
  const res = await fetch(`teacher_get_practices.php?course_id=${courseId}`);
  const data = await res.json();

  if (data.status !== "success") return;

  const list = document.getElementById("practiceList");

  list.innerHTML = data.practices.map((p, i) => `
    <div class="border rounded-lg p-6 bg-white">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h4 class="font-bold text-lg">${p.title}</h4>
          <p class="text-sm text-gray-600">
            ⏱ ${p.duration} min
          </p>
        </div>

        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Available
        </span>
      </div>

      <div class="flex gap-4 mt-4">
        <a href="${p.link}" target="_blank"
          class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
          Open Practice
        </a>

        <button onclick="togglePracticeComplete(${p.id})"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Mark as Complete
        </button>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const practiceBtn = document.getElementById("savePracticeBtn");

  if (!practiceBtn) {
    console.error(" savePracticeBtn not found");
    return;
  }

  practiceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(" Practice save button clicked (forced)");
    savePractice();
  });
});

async function savePractice() {
  console.log("🔥 savePractice called");

  if (!currentCourseId) {
    alert(" No course selected");
    return;
  }

  const titleEl = document.getElementById("practiceTitle");
  const minutesEl = document.getElementById("practiceMinutes");
  const linkEl = document.getElementById("practiceLink");

  if (!titleEl || !minutesEl || !linkEl) {
    alert(" Practice inputs not found in DOM");
    return;
  }

  const title = titleEl.value.trim();
  const duration = minutesEl.value.trim();
  const link = linkEl.value.trim();

  if (!title || !duration || !link) {
    alert(" All fields are required");
    return;
  }

  const auth = localStorage.getItem("clasmeyt_auth");
  if (!auth) {
    alert(" Not logged in");
    return;
  }

  const res = await fetch("teacher_save_practice.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth
    },
    body: JSON.stringify({
      course_id: currentCourseId,
      title,
      duration,
      link
    })
  });

  const data = await res.json();

  if (data.status === "success") {
    alert(" Practice saved");
    titleEl.value = "";
    minutesEl.value = "";
    linkEl.value = "";
    loadPracticesForTeacher(currentCourseId);
  } else {
    alert("❌ " + (data.message || "Save failed"));
  }
}

//Practices Functions
function addQuizQuestion() {
  const index = quizQuestions.length;

  quizQuestions.push({
    question: "",
    options: ["", "", "", ""],
    correct: 0
  });

  const div = document.createElement("div");
  div.className = "border p-4 rounded bg-gray-50 space-y-2";

  div.innerHTML = `
    <input
      class="w-full border p-2 rounded"
      placeholder="Question"
      oninput="quizQuestions[${index}].question = this.value"
    />

    ${[0,1,2,3].map(i => `
      <div class="flex gap-2 items-center">
        <input type="radio" name="correct${index}" ${i===0?"checked":""}
          onclick="quizQuestions[${index}].correct=${i}" />
        <input
          class="flex-1 border p-2 rounded"
          placeholder="Choice ${i+1}"
          oninput="quizQuestions[${index}].options[${i}] = this.value"
        />
      </div>
    `).join("")}
  `;

  document.getElementById("quizQuestions").appendChild(div);
}

async function saveQuiz() {
  if (!currentCourseId) {
    alert(" Select a course first");
    return;
  }

  const title = document.getElementById("quizTitle").value.trim();
  const passing = Number(document.getElementById("quizPassing").value);
  const badge = document.getElementById("quizBadge").value.trim();

  if (!title || !passing || quizQuestions.length === 0) {
    alert(" Fill all quiz details");
    return;
  }

  const auth = localStorage.getItem("clasmeyt_auth");

  const res = await fetch("teacher_save_quiz.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth
    },
    body: JSON.stringify({
      course_id: currentCourseId,
      title,
      passing_score: passing,
      badge_name: badge,
      questions: quizQuestions
    })
  });

  const data = await res.json();

  if (data.status === "success") {
    alert(" Quiz saved");
    quizQuestions = [];
    document.getElementById("quizQuestions").innerHTML = "";
  } else {
    alert("❌ " + (data.message || "Save failed"));
  }
}

function openQuiz(courseId) {
  currentCourseId = courseId;
  hideAllTeacherViews();

  document.getElementById("teacher-course-quiz").classList.remove("hidden");

  const course = teacherCourses.find(c => c.id === courseId);
  document.getElementById("quizCourseTitle").textContent =
    `Quiz: ${course.name}`;
}

// for example
async function saveExample() {
  if (!currentCourseId) {
    alert(" Select a course first");
    return;
  }

  const title = document.getElementById("exampleTitle").value.trim();
  const description = document.getElementById("exampleDescription").value.trim();
  const link = document.getElementById("exampleLink").value.trim();

  if (!title || !link) {
    alert("Title and link are required");
    return;
  }

  const auth = localStorage.getItem("clasmeyt_auth");

  const res = await fetch("teacher_save_example.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth
    },
    body: JSON.stringify({
      course_id: currentCourseId,
      title,
      description,
      link
    })
  });

  const data = await res.json();

  if (data.status === "success") {
    alert(" Example saved");
    document.getElementById("exampleTitle").value = "";
    document.getElementById("exampleDescription").value = "";
    document.getElementById("exampleLink").value = "";
  } else {
    alert("❌ " + (data.message || "Save failed"));
  }
}

function openExamples(courseId) {
  currentCourseId = Number(courseId);

  currentTeacherCourse = teacherCourses.find(c => c.id === currentCourseId);
  if (!currentTeacherCourse) return;

  hideAllTeacherViews();

  document
    .getElementById("teacher-course-examples")
    .classList.remove("hidden");

  document.getElementById("examplesCourseTitle").textContent =
    `Examples: ${currentTeacherCourse.name}`;

  //LOAD EXAMPLES HERE
  loadExamplesForTeacher(currentCourseId);
}


async function loadExamplesForTeacher(courseId) {
  try {
    const auth = localStorage.getItem("clasmeyt_auth");

    const res = await fetch(
      `teacher_get_examples.php?course_id=${courseId}`,
      {
        headers: { "X-Auth": auth }
      }
    );

    const data = await res.json();

    if (data.status !== "success") {
      console.warn("No examples returned");
      return;
    }

    renderTeacherExamples(data.examples);
  } catch (e) {
    console.error("Load examples failed", e);
  }
}

function renderTeacherExamples(examples) {
  const container = document.getElementById("teacherExamplesList");
  if (!container) return;

  if (!examples.length) {
    container.innerHTML = `<p class="text-gray-500">No examples yet.</p>`;
    return;
  }

  container.innerHTML = examples.map(ex => `
    <div class="border rounded-lg p-4 mb-3">
      <h4 class="font-bold text-lg">${ex.title}</h4>
      <p class="text-sm text-gray-600 mb-2">${ex.description}</p>
      <a
        href="${ex.link}"
        target="_blank"
        class="text-blue-600 text-sm underline">
        Open example
      </a>
    </div>
  `).join("");
}

async function uploadResource() {
  console.log(" uploadResource clicked");

  if (!currentCourseId) {
    alert("No course selected");
    return;
  }

  // ID
  const nameEl = document.getElementById("resourceName");
  const fileEl = document.getElementById("resourceFile");

  if (!nameEl || !fileEl) {
    alert(" Resource inputs not found");
    return;
  }

  const name = nameEl.value.trim();
  const file = fileEl.files[0];

  if (!name || !file) {
    alert(" Name and file are required");
    return;
  }

  const fd = new FormData();
  fd.append("course_id", currentCourseId);
  fd.append("name", name);
  fd.append("file", file);

  const auth = localStorage.getItem("clasmeyt_auth");
  if (!auth) {
    alert(" Not logged in");
    return;
  }

  const res = await fetch("teacher_upload_course_resource.php", {
    method: "POST",
    headers: {
      "X-Auth": auth
    },
    body: fd
  });

  const data = await res.json();
  console.log(" uploadResource response:", data);

  if (data.status === "success") {
    alert(" Resource uploaded");

    nameEl.value = "";
    fileEl.value = "";

    loadResourcesForTeacher(currentCourseId);
  } else {
    alert("❌ " + (data.message || "Upload failed"));
  }
}


function openResources(courseId) {
  currentCourseId = Number(courseId);

  hideAllTeacherViews();

  document
    .getElementById("teacher-course-resources")
    .classList.remove("hidden");

  const course = teacherCourses.find(c => c.id === currentCourseId);
  if (course) {
    document.getElementById("resourcesCourseTitle").textContent =
      `Resources: ${course.name}`;
  }

  loadResourcesForTeacher(currentCourseId);
}

async function loadResourcesForTeacher(courseId) {
  const res = await fetch(
    `teacher_get_resources.php?course_id=${courseId}`
  );
  const data = await res.json();

  const box = document.getElementById("resourceList");
  box.innerHTML = "";

  if (data.status !== "success") {
    box.innerHTML = "<p>No resources yet.</p>";
    return;
  }

  data.resources.forEach(r => {
    box.innerHTML += `
      <div class="flex justify-between items-center border p-4 rounded-lg">
        <div class="flex items-center gap-3">
          <img
            src="${
              r.file_type === 'PDF'
                ? 'images/pdf.png'
                : r.file_type === 'Video'
                ? 'images/video.png'
                : 'images/file.png'
            }"
            class="w-8 h-8"
          />
          <div>
            <p class="font-medium">${r.name}</p>
            <p class="text-sm text-gray-500">
              ${r.file_type} • ${r.file_size_kb} KB
            </p>
          </div>
        </div>
      </div>
    `;
  });
}

//  SAVE COURSE OVERVIEW BUTTON HANDLER
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "saveOverviewBtn") {
    console.log(" Save Overview clicked");
    console.log(" currentCourseId:", currentCourseId);

    saveCourseOverview(currentCourseId);
  }
});

function loadQuizBadgeOptions() {
  const select = document.getElementById("quizBadge");
  if (!select) return;

  // prevent duplicate loading
  if (select.dataset.loaded === "1") return;

  PREDEFINED_BADGES.forEach(badgeName => {
    const option = document.createElement("option");
    option.value = badgeName;       // SAVED VALUE
    option.textContent = badgeName; // DISPLAY TEXT
    select.appendChild(option);
  });

  select.dataset.loaded = "1";
}

function loadOverviewBadgeOptions() {
  const select = document.getElementById("badgeName");
  if (!select) return;

  if (select.dataset.loaded === "1") return;

  PREDEFINED_BADGES.forEach(badge => {
    const opt = document.createElement("option");
    opt.value = badge;       // what gets saved
    opt.textContent = badge; // what teacher sees
    select.appendChild(opt);
  });

  select.dataset.loaded = "1";
}










