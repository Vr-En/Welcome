
  //  GLOBAL ENROLL
  window.enrollCourse = function enrollCourse(courseId) {
    console.log("ENROLL FUNCTION CALLED:", courseId);


    if (!Array.isArray(window.courses)) {
      alert(" Courses not loaded");
      return;
    }


    const course = window.courses.find(c => Number(c.id) === Number(courseId));
    if (!course) {
      alert(" Course not found");
      return;
    }


    // mark enrolled
    course.enrolled = true;
    course.progress = 0;


    // safe init
    if (!Array.isArray(course.lessons)) course.lessons = [];
    if (!Array.isArray(course.practices)) course.practices = [];
    if (!course.quiz) course.quiz = null;


    // UI refresh (guarded)
    if (typeof updateAllCourses === "function") updateAllCourses();
    if (typeof updateEnrolledCourses === "function") updateEnrolledCourses();
    if (typeof updateStats === "function") updateStats();
    if (typeof updateAccountInfo === "function") updateAccountInfo();
    updateDashboardStats();



    // persist
    if (typeof queueSaveUserState === "function") queueSaveUserState();


    // close modal
    if (typeof closeModal === "function") {
      closeModal("courseOverviewModal");
    }


    alert(` Enrolled in ${course.name}`);
  };



  //  GLOBAL UNENROLL
  window.unenrollCourse = function unenrollCourse(courseId) {
    console.log(" UNENROLL FUNCTION CALLED:", courseId);


    if (!Array.isArray(window.courses)) {
      alert(" Courses not loaded");
      return;
    }


    const course = window.courses.find(c => Number(c.id) === Number(courseId));
    if (!course) {
      alert(" Course not found");
      return;
    }


    // reset enrollment
    course.enrolled = false;
    course.progress = 0;


    // reset lesson progress
    if (Array.isArray(course.lessons)) {
      course.lessons.forEach(l => {
        if (l.pages) l.pages.completed = false;
      });
    }


    // reset practices
    if (Array.isArray(course.practices)) {
      course.practices.forEach(p => {
        p.completed = false;
        p.score = null;
      });
    }


    // reset quiz
    if (course.quiz) {
      course.quiz.completed = false;
      course.quiz.score = null;
    }


    // UI refresh
    if (typeof updateAllCourses === "function") updateAllCourses();
    if (typeof updateEnrolledCourses === "function") updateEnrolledCourses();
    if (typeof updateStats === "function") updateStats();
    if (typeof updateAccountInfo === "function") updateAccountInfo();
    updateDashboardStats();



    // persist
    if (typeof queueSaveUserState === "function") queueSaveUserState();


    alert(` Unenrolled from ${course.name}`);
  };


  function getAuth() {
  try { return JSON.parse(localStorage.getItem("clasmeyt_auth") || "null"); }
  catch { return null; }
  }




  function requireRole(allowed) {
    const auth = getAuth();
    if (!auth || !auth.id || !allowed.includes(auth.role)) {
      window.location.href = "Welcome.html";
      return null;
  }
  return auth;
  }



// badges part
const badges = [
{ name: "Math Wizard", icon: "badges/wizard.png", color: "blue", earned: false },
{ name: "Science Explorer", icon: "badges/explore.png", color: "green", earned: false },
{ name: "Literary Scholar", icon: "badges/literacy.png", color: "purple", earned: false },
{ name: "History Buff", icon: "badges/history.png", color: "yellow", earned: false },
{ name: "Tech Innovator", icon: "badges/techno.png", color: "indigo", earned: false },
{ name: "Chemistry Master", icon: "badges/lab.png", color: "red", earned: false },
];

          let currentCourse = null;
          let currentTab = 'lessons';

  window.courses = [];


// for overview bagde
const SUBJECT_BADGE_MAP = {
  "Mathematics": {
    name: "Math Wizard",
    icon: "badges/wizard.png",
    description: "Awarded for mastering mathematical concepts."
  },
  "Math": {
    name: "Math Wizard",
    icon: "badges/wizard.png",
    description: "Awarded for mastering mathematical concepts."
  },
  "Science": {
    name: "Science Explorer",
    icon: "badges/explore.png",
    description: "Earned by completing science courses."
  },
  "History": {
    name: "History Buff",
    icon: "badges/history.png",
    description: "Earned by completing science courses."
  },
  "Chemistry": {
    name: "Chemistry Master",
    icon: "badges/lab.png",
    description: "Awarded for excellence in chemistry."
  },
  "ICT": {
    name: "Tech Innovator",
    icon: "badges/techno.png",
    description: "Awarded for excellence in ICT and technology."
  },
  "English": {
    name: "Literary Scholar",
    icon: "badges/literacy.png",
    description: "Awarded for language and literature mastery."
  }
};






//for lesson
  async function loadLessonsForCourse(courseId) {
    try {
      const res = await fetch(`student_get_lessons.php?course_id=${courseId}`);
      const data = await res.json();


      if (data.status !== "success") {
        console.warn("No lessons returned");
        return;
      }


      const course = courses.find(c => Number(c.id) === Number(courseId));
      if (!course) return;


  // preserve previous completion state
  const prevLessons = Array.isArray(course.lessons) ? course.lessons : [];


course.lessons = data.lessons.map((l, index) => {
  let pages = {};


  try {
    pages = JSON.parse(l.pages || "{}");
  } catch {
    pages = {};
  }


  return {
    title: l.title,
    pages: {
      description: pages.description || "",
      duration: pages.duration || "",
      objectives: Array.isArray(pages.objectives) ? pages.objectives : [],
      link: pages.link || "",
      completed: prevLessons[index]?.pages?.completed ?? false
    }
  };
});

  reapplyLessonCompletion(courseId);


      console.log(" Lessons loaded:", course.lessons);


    } catch (e) {
      console.error("Lesson load failed", e);
    }
  }


  //for pracices
  async function loadPracticesForCourse(courseId) {
    try {
      const res = await fetch(`student_get_practices.php?course_id=${courseId}`);


      if (!res.ok) {
        console.warn("Practices fetch failed:", res.status);
        currentCourse.practices = [];
        return;
      }


      const data = await res.json();


      if (data.status !== "success" || !Array.isArray(data.practices)) {
        console.warn("Invalid practices response:", data);
        currentCourse.practices = [];
        return;
      }


currentCourse.practices = data.practices.map(p => ({
  id: p.id,
  title: p.title || "Untitled Practice",
  duration: p.duration || "",
  link: p.link || "",
  completed: false,
  score: null
}));


// RESTORE SAVED COMPLETION
reapplyPracticeCompletion(courseId);




    } catch (err) {
      console.error("Practices load error:", err);
      currentCourse.practices = [];
    }
  }


  function reapplyPracticeCompletion(courseId) {
  const key = stateKey();
  if (!key) return;


  const raw = localStorage.getItem(key);
  if (!raw) return;


  try {
    const state = JSON.parse(raw);
    const saved = state.courses?.find(c => c.id === courseId);
    const course = courses.find(c => c.id === courseId);


    if (!saved || !course || !Array.isArray(course.practices)) return;


    saved.practices?.forEach(sp => {
      const p = course.practices.find(x => x.title === sp.title);
      if (!p) return;
      p.completed = !!sp.completed;
      p.score = sp.score ?? null;
    });
  } catch {}
}






  async function loadStudentCourses() {
    try {
      const res = await fetch("student_list_courses.php");
      const data = await res.json();


      if (data.status === "success") {
        window.courses = data.courses.map(c => ({
          id: Number(c.id),
          name: c.name,
          subject: c.subject,
          teacher: c.teacher_name || "TBA",
          enrolled: false,
          progress: 0,
          lessons: []
        }));


        updateAllCourses();
      }
    } catch (e) {
      console.error("Failed to load courses", e);
    }
  }




function reapplyLessonCompletion(courseId) {
  const key = stateKey();
  if (!key) return;


  const raw = localStorage.getItem(key);
  if (!raw) return;


  try {
    const state = JSON.parse(raw);
    const saved = state.courses?.find(c => c.id === courseId);
    const course = courses.find(c => c.id === courseId);


    if (!saved || !course || !Array.isArray(course.lessons)) return;


    course.lessons.forEach((l, i) => {
      if (saved.lessons?.[i]) {
        l.pages.completed = !!saved.lessons[i].completed;
      }
    });
  } catch {}
}


  async function apiJson(url, payload = null) {
      const opts = payload
      ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      : {};
      const res = await fetch(url, opts);
      return res.json();
  }


// for quiz
async function loadQuizForCourse(courseId) {
  const res = await fetch(`student_get_quiz.php?course_id=${courseId}`);
  const data = await res.json();


  if (data.status !== "success") {
    currentCourse.quiz = null;
    return;
  }


  currentCourse.quiz = {
    title: data.quiz.title,
    passing: data.quiz.passing_score,
    badge: data.quiz.badge_name,
    questions: data.quiz.questions,
    completed: false,
    score: null,
    passed: false
  };
}




function submitQuiz() {
  if (!currentCourse || !currentCourse.quiz) return;

  const qs = currentCourse.quiz.questions;
  let correct = 0;

  qs.forEach((q, i) => {
    const picked = document.querySelector(`input[name="q${i}"]:checked`);
    if (picked && Number(picked.value) === q.correct) {
      correct++;
    }
  });

  const score = Math.round((correct / qs.length) * 100);

  // SAVE STATE
  currentCourse.quiz.completed = true;
  currentCourse.quiz.score = score;
  currentCourse.quiz.passed = score === 100;

  // AWARD BADGE IMMEDIATELY
  if (currentCourse.quiz.passed && currentCourse.quiz.badge) {
    awardBadge(currentCourse.quiz.badge);
  }

  updateCourseProgress(currentCourse.id);
  queueSaveUserState();
  showCourseTab("quiz");         // re-render UI
}

function awardBadge(badgeName) {
  const badge = badges.find(b => b.name === badgeName);
  if (!badge || badge.earned) return;

  badge.earned = true;
  showBadgeCelebration(badge);
}


// for dashboard
function updateDashboardStats() {
  if (!Array.isArray(window.courses)) return;

  //  ENROLLED COURSES
  const enrolledCourses = window.courses.filter(c => c.enrolled);

  //  AVAILABLE COURSES (NOT ENROLLED)
  const availableCourses = window.courses.filter(c => !c.enrolled).length;

  //  COURSES THAT ACTUALLY HAVE PROGRESS
  const gradedCourses = enrolledCourses.filter(
    c => Number(c.progress) > 0
  );

  //  AVERAGE GRADE (ONLY FROM STARTED COURSES)
  let avgGrade = 0;

  if (gradedCourses.length > 0) {
    const total = gradedCourses.reduce(
      (sum, c) => sum + Number(c.progress),
      0
    );
    avgGrade = Math.round(total / gradedCourses.length);
  }

  //  UPDATE UI
  const availableEl = document.getElementById("availableCourses");
  const enrolledEl = document.getElementById("enrolledCount");
  const avgEl = document.getElementById("averageGrade");

  if (availableEl) availableEl.textContent = availableCourses;
  if (enrolledEl) enrolledEl.textContent = enrolledCourses.length;
  if (avgEl) avgEl.textContent = avgGrade + "%";
}






function updateQuizTabVisibility() {
  const btn = document.getElementById("quizTabBtn");
  if (!btn) return;


  if (currentCourse && currentCourse.quiz) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
}


function retryQuiz() {
  if (!currentCourse || !currentCourse.quiz) return;


  // reset quiz state
  currentCourse.quiz.completed = false;
  currentCourse.quiz.score = null;
  currentCourse.quiz.passed = false;


  // clear selected answers
  currentCourse.quiz.questions.forEach((_, i) => {
    const inputs = document.querySelectorAll(`input[name="q${i}"]`);
    inputs.forEach(r => r.checked = false);
  });


  showSuccessToast(" Quiz reset. Try again!");
  showCourseTab("quiz");
}
 //for example
  async function loadExamplesForCourse(courseId) {
  const res = await fetch(`student_get_examples.php?course_id=${courseId}`);
  const data = await res.json();


  if (data.status !== "success") {
    currentCourse.examples = [];
    return;
  }


  currentCourse.examples = data.examples;
}

  // PER-USER SAVE / LOAD
  let saveTimer = null;

  function stateKey() {
    const auth = getAuth();
    if (!auth || !auth.id) return null;
    return "clasmeyt_state_v1_" + auth.id;
  }




  function buildUserState() {
    return {
      version: 1,
      courses: courses.map(c => ({
        id: c.id,
        enrolled: !!c.enrolled,
        progress: Number(c.progress) || 0,




  lessons: Array.isArray(c.lessons)
    ? c.lessons.map(l => ({ completed: !!l.pages?.completed }))
    : null,






        practices: Array.isArray(c.practices)
          ? c.practices.map(p => ({
              title: p.title,
              completed: !!p.completed,
              score: p.score ?? null
            }))
          : null,




quiz: c.quiz
  ? {
      completed: !!c.quiz.completed,
      score: c.quiz.score ?? null,
      passed: !!c.quiz.passed
    }
  : null
      })),


      badges: badges.map(b => ({
        name: b.name,
        earned: !!b.earned
      }))
    };
  }



  function applyUserState(state) {
    if (!state) return;




    // restore courses
    if (Array.isArray(state.courses)) {
      state.courses.forEach(saved => {
        const c = courses.find(x => x.id === saved.id);
        if (!c) return;




        c.enrolled = !!saved.enrolled;
        c.progress = Number(saved.progress) || 0;




        // lessons
        if (Array.isArray(c.lessons) && Array.isArray(saved.lessons)) {
          for (let i = 0; i < Math.min(c.lessons.length, saved.lessons.length); i++) {
            c.lessons[i].pages.completed = !!saved.lessons[i].completed;
          }
        }




        // practices
        if (Array.isArray(c.practices) && Array.isArray(saved.practices)) {
          saved.practices.forEach(sp => {
            const p = c.practices.find(x => x.title === sp.title);
            if (!p) return;
            p.completed = !!sp.completed;
            p.score = sp.score ?? null;
          });
        }




        // quiz
if (c.quiz && saved.quiz) {
  c.quiz.completed = !!saved.quiz.completed;
  c.quiz.score = saved.quiz.score ?? null;
  c.quiz.passed = !!saved.quiz.passed;
}

      });
    }




    // restore badges
    if (Array.isArray(state.badges)) {
      state.badges.forEach(sb => {
        const b = badges.find(x => x.name === sb.name);
        if (b) b.earned = !!sb.earned;
      });
    }
  }




  function saveUserStateLocal() {
    const key = stateKey();
    if (!key) return;




    try {
      const state = buildUserState();
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn("saveUserStateLocal failed", e);
    }
  }




  function loadUserStateLocal() {
    const key = stateKey();
    if (!key) return;




    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      applyUserState(JSON.parse(raw));
    } catch (e) {
      console.warn("loadUserStateLocal failed", e);
    }
  }




  function queueSaveUserState() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveUserStateLocal, 300);
  }




  // auto-save when closing / refreshing
  window.addEventListener("beforeunload", () => {
    saveUserStateLocal();
  });








  // Navigation functions
  function showSection(sectionId, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

  document.getElementById(sectionId).classList.remove('hidden');
  if (el) el.classList.add('active');

  if (sectionId === 'courses') updateAllCourses();
  else if (sectionId === 'my-courses') updateEnrolledCourses();
  else if (sectionId === 'teachers') updateTeachers();
  else if (sectionId === 'account') updateAccountInfo();
  }



//for switch icon
function resourceIcon(type) {
  if (type === "pdf") return "images/pdf.png";
  if (type === "video") return "images/video.png";
  return "images/file.png";
}








async function viewCourse(courseId) {
  const course = courses.find(c => c.id === Number(courseId));
  if (!course) return;

  currentCourse = course;
  currentTab = "lessons";

  await loadCourseOverview(courseId);   
  await loadLessonsForCourse(courseId);
  await loadPracticesForCourse(courseId);
  await loadQuizForCourse(courseId);
  await loadExamplesForCourse(courseId);
  await loadResourcesForCourse(courseId);

  updateQuizTabVisibility();
  showCourseDetail();
  showCourseTab("lessons");
}











  function showCourseDetail() {
      document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
      });
   
      document.getElementById('course-detail').classList.remove('hidden');
   
      const header = document.getElementById('courseHeader');
      header.innerHTML = `
          <div class="flex justify-between items-start mb-4">
              <div>
                  <h2 class="text-3xl font-bold text-gray-800">${currentCourse.name}</h2>
                  <p class="text-gray-600 text-lg flex items-center gap-3 flex-wrap">
                  <span class="flex items-center gap-2">
                  <img src="images/teacher.png" class="w-5 h-5 object-contain" alt="Teacher">
                  ${currentCourse.teacher}
                  </span>
                  <span class="text-gray-400">•</span>
                  <span class="flex items-center gap-2">
                  <img src="images/books.png" class="w-5 h-5 object-contain" alt="Subject">
                  ${currentCourse.subject}
                  </span>
                  </p>
                  </div>
              ${currentCourse.enrolled ?
                  `<div class="text-right">
                      <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enrolled</span>
                      <div class="mt-2">
                          <div class="text-sm text-gray-600">Progress: ${currentCourse.progress}%</div>
                          <div class="w-32 bg-gray-200 rounded-full h-2 mt-1">
                              <div class="bg-blue-500 h-2 rounded-full transition-all duration-500" style="width: ${currentCourse.progress}%"></div>
                          </div>
                      </div>
                  </div>` :
                  `<button onclick="enrollCourse(${currentCourse.id})" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Enroll Now
                  </button>`
              }
          </div>
          <p class="text-gray-700">${currentCourse.overview}</p>
      `;
   
      showCourseTab(currentTab ||'lessons');
  }








  function showCourseTab(tabName, clickedBtn = null) {
  currentTab = tabName;




  const tabs = document.querySelectorAll('.course-tab');
      tabs.forEach(tab => {
      tab.classList.remove('tab-active', 'border-blue-500', 'text-blue-600');
      tab.classList.add('border-transparent', 'text-gray-500');
      });




      let activeBtn = clickedBtn;








      if (!activeBtn) {
      // 1) find by data-tab (if you add it later)
      activeBtn = document.querySelector(`.course-tab[data-tab="${tabName}"]`);




      // 2) fallback: try to match by button text
      if (!activeBtn) {
          activeBtn = Array.from(tabs).find(b => {
          const t = (b.textContent || '').trim().toLowerCase();
          return t.includes(tabName.toLowerCase());
          }) || null;
      }
      }




    // Apply active styling if we found a button
      if (activeBtn) {
      activeBtn.classList.add('tab-active', 'border-blue-500', 'text-blue-600');
      activeBtn.classList.remove('border-transparent', 'text-gray-500');
      }




    //  Update tab content
      const content = document.getElementById('courseTabContent');
      if (!content || !currentCourse) return;




      switch (tabName) {
      case 'lessons':
          content.innerHTML = `
          <div class="space-y-6">
              <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-bold text-blue-800 mb-2">Course Lessons</h4>
              <p class="text-blue-700 text-sm">Study the course material and track your learning progress.</p>
              </div>
              ${currentCourse.lessons ? currentCourse.lessons.map((lesson, index) => `
              <div class="border border-gray-200 rounded-lg p-6 ${lesson.pages.completed
              ? 'bg-green-50 border-green-200' : 'bg-white'}">
                  <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center ${lesson.pages.completed
  ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}">
                      ${lesson.pages.completed
                      ? '✓' : index + 1}
                      </div>
                      <div>
                      <h5 class="font-bold text-lg text-gray-800">${lesson.title}</h5>
                      <p class="text-sm text-gray-600 flex items-center gap-2">
                      <img src="images/clock.png" class="w-4 h-4">
                      ${lesson.pages.duration}
                      </p>
                      </div>
                  </div>
                  ${lesson.pages.completed


                  ? '<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Completed</span>'
                  : '<span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">In Progress</span>'
                  }
                  </div>
                  <p class="text-gray-700 mb-4">${lesson.pages.description}</p>
                  <div class="mb-4">
                  <h6 class="font-medium text-gray-800 mb-2">Learning Objectives:</h6>
                  <ul class="space-y-1">
                      ${lesson.pages.objectives.map(obj => `
                      <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span>${obj}</span>
                      </li>
                      `).join('')}
                  </ul>
                  </div>
                  <div class="flex items-center gap-4 mt-4">
                  <p
                  class="text-sm text-blue-600 font-medium cursor-pointer hover:underline"
                  onclick="openLessonLink(${index})">
                  📎 Open lesson material
                  </p>




      ${
      lesson.pages.completed
      ? `<span class="text-sm text-green-600 font-semibold"> Completed</span>`
      : `<button
      onclick="markLessonCompleted(${index})"
      class="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
          Mark as Completed
          </button>`
      }
  </div>








              </div>
              `).join('') : '<p class="text-gray-500">No lessons available yet.</p>'}
          </div>
          `;
          break;




  case "practices":
    content.innerHTML = `
      <div class="space-y-6">
        <div class="bg-orange-50 p-4 rounded-lg">
          <h4 class="font-bold text-orange-800 mb-2">Practice Exercises</h4>
          <p class="text-orange-700 text-sm">
            Reinforce your learning with hands-on practice problems.
          </p>
        </div>


        ${
          currentCourse.practices.length
            ? currentCourse.practices.map((p, i) => `
              <div class="border rounded-lg p-6 ${p.completed ? 'bg-green-50' : 'bg-white'}">
                <div class="flex justify-between mb-3">
                  <div>
                    <h5 class="font-bold text-lg">${p.title}</h5>
                    <p class="text-sm text-gray-600">
                      ⏱ ${p.duration} min
                    </p>
                  </div>
                  ${
                    p.completed
                      ? `<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Completed</span>`
                      : `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Available</span>`
                  }
                </div>


                <div class="border rounded-lg p-6 ${p.completed ? 'bg-green-50' : 'bg-white'}">
                  <div class="inline-flex items-center gap-6">
                    
                    <!-- LINK -->
                    <p
                      class="text-sm text-blue-600 font-medium cursor-pointer hover:underline flex items-center gap-2"
                      onclick="openPracticeLink(${i})">
                      📎 Open practice material
                    </p>


                    <!-- STATUS / ACTION -->
                    ${
                      p.completed
                        ? `<span class="flex items-center gap-2 text-green-700 font-semibold">
                          Completed
                          </span>`
                        : `<button
                            onclick="markPracticeCompleted(${i})"
                            class="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                            Mark as Completed
                          </button>`
                    }


                  </div>
                </div>






            `).join("")
            : `<p class="text-gray-500">No practices available yet.</p>`
        }
      </div>
    `;
    break;




              
                case 'quiz':
                  content.innerHTML = `
                    <div class="space-y-6">


                      <div class="bg-yellow-50 p-4 rounded-lg">
                        <h4 class="font-bold text-yellow-800 mb-2">
                          ${currentCourse.quiz?.title || "Course Quiz"}
                        </h4>
                        <p class="text-yellow-700 text-sm">
                          Answer all questions. Passing score: ${currentCourse.quiz?.passing}%.
                        </p>
                      </div>


                      ${
                        currentCourse.quiz
                          ? currentCourse.quiz.questions.map((q, index) => `
                              <div class="border rounded-lg p-4">
                                <h5 class="font-medium mb-3">
                                  Question ${index + 1}: ${q.question}
                                </h5>


                                <div class="space-y-2">
                                  ${q.options.map((opt, i) => `
                                    <label class="flex items-center gap-2">
                                      <input
                                        type="radio"
                                        name="q${index}"
                                        value="${i}"
                                        ${currentCourse.quiz.completed ? "disabled" : ""}
                                      />
                                      <span>${opt}</span>
                                    </label>
                                  `).join("")}
                                </div>
                              </div>
                            `).join("")
                          : `<p class="text-gray-500">No quiz available yet.</p>`
                      }


                      <!-- 🔘 ACTION BUTTONS -->
                      ${
                        currentCourse.quiz
                          ? `
                            <div class="mt-6 flex gap-4 items-center">


                              ${
                                !currentCourse.quiz.completed
                                  ? `<button
                                        onclick="submitQuiz()"
                                        class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                                        Submit Quiz
                                    </button>`
                                  : !currentCourse.quiz.passed
                                    ? `<button
                                          onclick="retryQuiz()"
                                          class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                                          Retry Quiz
                                      </button>`
                                    : `<span class="text-green-600 font-semibold">
                                          Quiz Passed
                                      </span>`
                              }


                              ${
                                currentCourse.quiz.completed
                                  ? `<span class="text-gray-600">
                                        Score: ${currentCourse.quiz.score}%
                                    </span>`
                                  : ``
                              }


                            </div>
                          `
                          : ``
                      }


                    </div>
                  `;
                  break;




                    case "examples":
                      content.innerHTML = `
                        <div class="space-y-6">
                          <div class="bg-purple-50 p-4 rounded-lg">
                            <h4 class="font-bold text-purple-800 mb-2">Course Examples</h4>
                            <p class="text-purple-700 text-sm">
                              Worked examples and demonstrations.
                            </p>
                          </div>


                          ${
                            currentCourse.examples.length
                              ? currentCourse.examples.map(ex => `
                                <div class="border rounded-lg p-6 bg-white">
                                  <h5 class="font-bold text-lg mb-1">${ex.title}</h5>


                                  <p class="text-gray-600 text-sm mb-4">
                                    ${ex.description || "No description provided."}
                                  </p>


                                  <button
                                    onclick="window.open('${ex.link}', '_blank')"
                                    class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
                                    View Example
                                  </button>
                                </div>
                              `).join("")
                              : `<p class="text-gray-500">No examples available yet.</p>`
                          }
                        </div>
                      `;
                      break;


                    
                    case "resources":
                      content.innerHTML = `
                        <div class="space-y-6">


                          <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-bold text-green-800 mb-1">
                              Course Resources
                            </h4>
                            <p class="text-green-700 text-sm">
                              Download materials, references, and additional learning resources.
                            </p>
                          </div>


                          ${
                            currentCourse.resources && currentCourse.resources.length
                              ? currentCourse.resources.map(r => `
                                <div class="flex items-center justify-between p-4 border rounded-lg bg-white">
                                
                                  <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <img
                                        src="${
                                          r.file_type === "PDF"
                                            ? "images/pdf.png"
                                            : r.file_type === "Video"
                                            ? "images/video.png"
                                            : "images/file.png"
                                        }"
                                        class="w-6 h-6"
                                      />
                                    </div>


                                    <div>
                                      <p class="font-medium text-gray-800">
                                        ${r.name}
                                      </p>
                                      <p class="text-sm text-gray-500">
                                        ${r.file_type} • ${r.file_size_kb} KB
                                      </p>
                                    </div>
                                  </div>


                                  <a
                                    href="${r.file_path}"
                                    download
                                    class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium">
                                    Download
                                  </a>


                                </div>
                              `).join("")
                              : `<p class="text-gray-500">No resources available yet.</p>`
                          }


                        </div>
                      `;
                      break;


              }
          }


  function openLessonLink(index) {
    if (!currentCourse) return;


    const lesson = currentCourse.lessons[index];
    if (!lesson || !lesson.pages?.link) {
      showSuccessToast(" Lesson link not available");
      return;
    }


    window.open(lesson.pages.link, "_blank");
  }


  function openPracticeLink(index) {
  if (!currentCourse) return;


  const practice = currentCourse.practices[index];
  if (!practice || !practice.link) {
    showSuccessToast(" Practice link not available");
    return;
  }


  window.open(practice.link, "_blank");
}




  function markLessonCompleted(index) {
    if (!currentCourse) return;




    if (!currentCourse.enrolled) {
      showSuccessToast("Please enroll in this course first.");
      return;
    }




    const lesson = currentCourse.lessons[index];
    if (!lesson || lesson.pages.completed
  ) return;




    lesson.pages.completed = true;




    updateCourseProgress(currentCourse.id); // updates % + saves
    showSuccessToast(`Lesson completed: "${lesson.title}"`);
  }


function openPractices(courseId) {
  console.log(" openPractices called with:", courseId);


  currentCourseId = Number(courseId);


  if (!currentCourseId) {
    alert(" Invalid course ID");
    return;
  }


  currentTeacherCourse = teacherCourses.find(c => c.id === currentCourseId);
  if (!currentTeacherCourse) {
    alert(" Course not found");
    return;
  }


  hideAllTeacherViews();
  document
    .getElementById("teacher-course-practices")
    .classList.remove("hidden");


  document.getElementById("practicesCourseTitle").textContent =
    `Practices: ${currentTeacherCourse.name}`;


  loadPracticesForTeacher(currentCourseId);
}


function markPracticeCompleted(index) {
  if (!currentCourse) return;


  if (!currentCourse.enrolled) {
    showSuccessToast("Please enroll in this course first.");
    return;
  }


  const practice = currentCourse.practices[index];
  if (!practice || practice.completed) return;


  practice.completed = true;
  practice.score = 100;


  showSuccessToast(`Practice completed: "${practice.title}"`);


  updateCourseProgress(currentCourse.id); // updates % + saves
}


//for resources tab
async function loadResourcesForCourse(courseId) {
  try {
    const res = await fetch(
      `student_get_resources.php?course_id=${courseId}`
    );
    const data = await res.json();


    if (data.status !== "success") {
      currentCourse.resources = [];
      return;
    }


    currentCourse.resources = data.resources;
  } catch (e) {
    console.error("Load resources failed", e);
    currentCourse.resources = [];
  }
}




  // Modal functions
  function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
  }








  function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
  }








  // Form handlers
  function handleLogin(event) {
  event.preventDefault();
  showSuccessToast(' Login successful! Welcome back to StudentHub.');
  closeModal('loginModal');
  }




  function handleRegister(event) {
  event.preventDefault();
  showSuccessToast(' Account created successfully! Welcome to StudentHub.');
  closeModal('registerModal');
  }




  function refreshUIAfterCourseChange(courseId) {
  // update lists / stats
  updateAllCourses();
  updateEnrolledCourses();
  updateAccountInfo();
  updateStats();




  // if currently inside a course detail page, refresh it too
  if (currentCourse && currentCourse.id === courseId) {
  showCourseDetail(); // this also redraws the tabs + progress bar
  }
  }












  function startPractice(practiceTitle) {
  if (!currentCourse) return;




  if (!currentCourse.enrolled) {
  showSuccessToast(" Please enroll in this course first.");
  return;
  }




  const practice = currentCourse.practices?.find(p => p.title === practiceTitle);
  if (!practice) return;




  // Complete or retry
  const score = Math.floor(Math.random() * (100 - 75 + 1)) + 75;




  if (!practice.completed) {
  practice.completed = true;
  practice.score = score;
  showSuccessToast(`Practice completed: "${practiceTitle}"! Score: ${score}%`);
  } else {
  practice.score = score;
  showSuccessToast(` Practice retried: "${practiceTitle}"! New score: ${score}%`);
  }




  updateCourseProgress(currentCourse.id); //  updates UI + saves
  }




  /// Check if course is complete and award badge






  function showSuccessToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
  toast.style.animation = 'slideIn 0.3s ease-out';
  toast.textContent = message;




  // Add to page
  document.body.appendChild(toast);




  // Remove after 3 seconds
  setTimeout(() => {
  toast.style.animation = 'slideOut 0.3s ease-out';
  setTimeout(() => {
  if (document.body.contains(toast)) {
  document.body.removeChild(toast);
  }
  }, 300);
  }, 3000);
  }










  function showBadgeCelebration(badge) {
  document.getElementById('badgeIconLarge').innerHTML = `
  <img src="${badge.icon}" class="w-24 h-24 mx-auto" />
  `;
  document.getElementById('badgeNameDisplay').textContent = badge.name;
  document.getElementById('badgeDescriptionDisplay').textContent = 'Congratulations on earning this achievement badge!';
  document.getElementById('badgeCelebrationModal').classList.remove('hidden');
  }




  function closeBadgeCelebration() {
  document.getElementById('badgeCelebrationModal').classList.add('hidden');
  showSuccessToast(`Badge Added: ${document.getElementById('badgeNameDisplay').textContent}!`);
  }






  function updateCourseProgress(courseId) {
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.enrolled) return;




  let totalItems = 0;
  let completedItems = 0;






// lessons
if (Array.isArray(course.lessons) && course.lessons.length > 0) {
  totalItems += course.lessons.length;
  completedItems += course.lessons.filter(
    l => l.pages && l.pages.completed === true
  ).length;
}










  // practices
  if (Array.isArray(course.practices) && course.practices.length > 0) {
  totalItems += course.practices.length;
  completedItems += course.practices.filter(p => p.completed).length;
  }




  // quiz counts as 1 item
  if (course.quiz && Array.isArray(course.quiz.questions) && course.quiz.questions.length > 0) {
  totalItems += 1;
  if (course.quiz.completed) completedItems += 1;
  }




  const oldProgress = Number(course.progress) || 0;
  course.progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;




  // milestone toasts
  if (oldProgress < 25 && course.progress >= 25) showSuccessToast('25% Complete! Keep it up!');
  else if (oldProgress < 50 && course.progress >= 50) showSuccessToast(' 50% Complete! Halfway there!');
  else if (oldProgress < 75 && course.progress >= 75) showSuccessToast(' 75% Complete! Almost done!');
  else if (oldProgress < 100 && course.progress >= 100) showSuccessToast(' 100% Complete! Course finished!');




  // award badge when 100%
  if (course.progress === 100 && course.badge) {
  const badge = badges.find(b => b.name === course.badge);
  if (badge && !badge.earned) {
  badge.earned = true;
  showBadgeCelebration(badge);
  }
  }




  // update UI immediately
  refreshUIAfterCourseChange(courseId);


updateDashboardStats();


  // save user state
  queueSaveUserState();
  }








  // Update display functions
  function updateAllCourses() {
      const container = document.getElementById('allCoursesContainer');
      const filtered = getFilteredCoursesList();
      container.innerHTML = filtered.map(course => `
      <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-800 cursor-pointer hover:text-blue-600" onclick="viewCourse(${course.id})">${course.name}</h4>
                  ${course.enrolled ? '<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Enrolled</span>' : ''}
              </div>
              <p class="text-gray-600 mb-2"> ${course.teacher}</p>
              <p class="text-gray-600 mb-4"> ${course.subject}</p>
              ${course.enrolled ? `
                  <div class="mb-4">
                      <div class="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>${course.progress}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-blue-500 h-2 rounded-full transition-all duration-500" style="width: ${course.progress}%"></div>
                      </div>
                  </div>
              ` : ''}
              <div class="flex space-x-2 mb-4">
                  <button onclick="showCourseOverview(${course.id})" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                      View Overview
                  </button>
                  ${course.enrolled ?
                      `<button onclick="unenrollCourse(${course.id})" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                          Unenroll
                      </button>` :
                      `<button onclick="enrollCourse(${course.id})" class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                          Enroll
                      </button>`
                  }
              </div>
          </div>
      `).join('');
  }





  // Search + Filters state

  const courseFilters = {
  q: "",
  subject: "all",
  enroll: "all",
  sort: "name_asc"
  };




  function normalizeText(s) {
  return (s || "").toString().trim().toLowerCase();
  }




  function getUniqueSubjects() {
  const set = new Set();
  courses.forEach(c => {
  if (c.subject) set.add(c.subject);
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
  }




  function populateSubjectFilterOnce() {
  const select = document.getElementById("courseSubjectFilter");
  if (!select) return;




  // Prevent duplicates if called multiple times
  if (select.dataset.ready === "1") return;




  const subjects = getUniqueSubjects();
  subjects.forEach(sub => {
  const opt = document.createElement("option");
  opt.value = sub;
  opt.textContent = sub;
  select.appendChild(opt);
  });




  select.dataset.ready = "1";
  }




  function getFilteredCoursesList() {
  let list = [...courses];




  // Search
  const q = normalizeText(courseFilters.q);
  if (q) {
  list = list.filter(c => {
  const blob = normalizeText(
  `${c.name} ${c.subject} ${c.teacher}`
  );
  return blob.includes(q);
  });
  }




  // Subject filter
  if (courseFilters.subject !== "all") {
  list = list.filter(c => c.subject === courseFilters.subject);
  }




  // Enrollment filter
  if (courseFilters.enroll === "enrolled") {
  list = list.filter(c => !!c.enrolled);
  } else if (courseFilters.enroll === "not_enrolled") {
  list = list.filter(c => !c.enrolled);
  }




  // Sorting
  switch (courseFilters.sort) {
  case "name_desc":
  list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
  break;
  case "progress_desc":
  list.sort((a, b) => (Number(b.progress) || 0) - (Number(a.progress) || 0));
  break;
  case "progress_asc":
  list.sort((a, b) => (Number(a.progress) || 0) - (Number(b.progress) || 0));
  break;
  case "name_asc":
  default:
  list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  break;
  }




  return list;
  }




  function initCourseSearchFilters() {
  populateSubjectFilterOnce();




  const searchEl = document.getElementById("courseSearch");
  const subjectEl = document.getElementById("courseSubjectFilter");
  const enrollEl = document.getElementById("courseEnrollFilter");
  const sortEl = document.getElementById("courseSort");




  if (searchEl) {
  searchEl.addEventListener("input", () => {
  courseFilters.q = searchEl.value;
  updateAllCourses(); // re-render instantly
  });
  }




  if (subjectEl) {
  subjectEl.addEventListener("change", () => {
  courseFilters.subject = subjectEl.value;
  updateAllCourses();
  });
  }




  if (enrollEl) {
  enrollEl.addEventListener("change", () => {
  courseFilters.enroll = enrollEl.value;
  updateAllCourses();
  });
  }




  if (sortEl) {
  sortEl.addEventListener("change", () => {
  courseFilters.sort = sortEl.value;
  updateAllCourses();
  });
  }
  }




  //sa ano toh my courses
      function updateEnrolledCourses() {
      const container = document.getElementById('enrolledCoursesContainer');
      const enrolledCourses = courses.filter(c => c.enrolled);
      
      if (enrolledCourses.length === 0) {
          container.innerHTML = '<p class="text-gray-500 text-center col-span-3">No enrolled courses yet. Browse available courses to get started!</p>';
          return;
      }
      
      container.innerHTML = enrolledCourses.map(course => `
          <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-800 cursor-pointer hover:text-blue-600" onclick="viewCourse(${course.id})">${course.name}</h4>
                  ${course.badge && badges.find(b => b.name === course.badge && b.earned)
                  ? `
                  <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1">
                  <img src="images/trophy.png" alt="Trophy" class="w-4 h-4 object-contain">
                  Badge Earned
                  </span>
                  `
                  : ''
  }
              </div>
              <p class="text-gray-600 mb-2"> ${course.teacher}</p>
              <p class="text-gray-600 mb-4"> ${course.subject}</p>
              <div class="mb-4">
                  <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>${course.progress}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full transition-all duration-500" style="width: ${course.progress}%"></div>
                  </div>
              </div>
              <div class="flex space-x-2">
                  <button onclick="viewCourse(${course.id})" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                      Continue Learning
                  </button>
                  <button onclick="unenrollCourse(${course.id})" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                      Unenroll
                  </button>
              </div>
          </div>
      `).join('');
  }



  //for teacher tab
function updateTeachers() {
  fetch("student_get_teachers.php")
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success") {
        document.getElementById("teachersContainer").innerHTML =
          "<p class='text-red-500'>Failed to load teachers.</p>";
        return;
      }

      const container = document.getElementById("teachersContainer");

      container.innerHTML = data.teachers.map(t => `
        <div class="bg-gray-100 rounded-lg p-6 text-center">
          <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
            ${t.fullname.split(" ").map(n => n[0]).join("")}
          </div>

          <h4 class="font-bold text-lg">${t.fullname}</h4>

          <p class="text-blue-600 text-sm font-medium">
            ${t.subjects ?? "No subject assigned"}
          </p>

          <p class="text-gray-600 text-sm mt-1">${t.email}</p>
        </div>
      `).join("");
    })
    .catch(() => {
      document.getElementById("teachersContainer").innerHTML =
        "<p class='text-red-500'>Failed to load teachers.</p>";
    });
}









// for logout button
  function logout() {
  localStorage.removeItem("clasmeyt_auth");
  window.location.href = "Welcome.html";
  }

//for showcourse overview button
async function showCourseOverview(courseId) {
  try {
    const res = await fetch(
      `student_get_course_overview.php?course_id=${courseId}`
    );
    const data = await res.json();

    if (data.status !== "success") {
      alert("No course overview available yet.");
      return;
    }

    const o = data.overview;

    //  get course enrollment state
    const course = courses.find(c => Number(c.id) === Number(courseId));
    const isEnrolled = course ? !!course.enrolled : false;

    //  badge resolution
    const badgeName = o.badge_name;
    const badgeInfo =
      badges.find(b => b.name === badgeName) || {
        name: badgeName || "Course Badge",
        icon: "badges/default.png",
        description: "Complete this course to earn this badge."
      };

    //  ENROLL / UNENROLL BUTTON
    const enrollButtonHtml = isEnrolled
      ? `
        <button
          onclick="unenrollCourse(${courseId})"
          class="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold">
          Unenroll from Course
        </button>
      `
      : `
        <button
          onclick="enrollCourse(${courseId})"
          class="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold">
          Enroll in Course
        </button>
      `;

    document.getElementById("modalCourseContent").innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <!-- LEFT COLUMN -->
        <div>
          <p class="text-gray-700 mb-4">
            ${o.description || "No description available."}
          </p>

          <h4 class="font-semibold mb-2">Topics Covered:</h4>
          <ul class="space-y-2">
            ${(o.topics || []).map(t => `
              <li class="flex items-center gap-2 text-gray-700">
                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                ${t}
              </li>
            `).join("")}
          </ul>

          <div class="mt-6 bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-700">
              <strong>Instructor:</strong> ${o.teacher_name || "TBA"}
            </p>
            <p class="text-sm text-gray-700">
              <strong>Subject:</strong> ${o.subject || "—"}
            </p>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div>
          <h3 class="text-xl font-bold mb-3">Badge Information</h3>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <img
              src="${badgeInfo.icon}"
              class="w-20 h-20 mx-auto mb-3"
              alt="Badge"
            />
            <h4 class="font-bold text-lg text-yellow-800">
              ${badgeInfo.name}
            </h4>
            <p class="text-sm text-yellow-700 mt-2">
              ${badgeInfo.description}
            </p>
          </div>

          ${enrollButtonHtml}
        </div>

      </div>
    `;

    currentCourse = course || null;
    openModal("courseOverviewModal");

  } catch (e) {
    console.error("Overview load failed", e);
    alert("Failed to load course overview.");
  }
}







  function updateAccountInfo() {
      // Update enrolled courses in account
      const enrolledCourses = courses.filter(c => c.enrolled);
      const accountCoursesContainer = document.getElementById('accountEnrolledCourses');
   
      if (enrolledCourses.length === 0) {
          accountCoursesContainer.innerHTML = '<p class="text-gray-500 text-sm">No enrolled courses yet.</p>';
      } else {
          accountCoursesContainer.innerHTML = enrolledCourses.map(course => `
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100" onclick="viewCourse(${course.id})">
                  <div>
                      <p class="font-medium text-gray-800">${course.name}</p>
                      <p class="text-sm text-gray-600">${course.progress}% complete</p>
                  </div>
                  ${course.badge && badges.find(b => b.name === course.badge && b.earned)
                  ? `<img src="images/trophy.png" alt="Trophy" class="w-5 h-5 object-contain">`
                  : ''
  }
              </div>
          `).join('');
      }




      // Update badges in account
      const accountBadgesContainer = document.getElementById('accountBadges');
      accountBadgesContainer.innerHTML = badges.map(badge => `
          <div class="text-center p-3 ${badge.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'} rounded-lg">
              <img
          src="${badge.icon}"
          alt="${badge.name}"
          class="w-10 h-10 mx-auto mb-1 ${badge.earned ? '' : 'opacity-30'}"
          />




              <p class="text-xs font-medium text-gray-700">${badge.name}</p>
              ${badge.earned ? '<p class="text-xs text-green-600"> Earned!</p>' : '<div class="flex items-center justify-center space-x-1"><img src="images/padlock.png" alt="Locked badge" class="w-4 h-4"/><span class="text-xs text-gray-400">Locked</span></div>'}
          </div>
      `).join('');
  }




function updateStats() {
  const earnedBadges = badges.filter(b => b.earned).length;
  const badgeEl = document.getElementById('badgeCount');
  if (badgeEl) badgeEl.textContent = earnedBadges;
}





  // Initialize the page
document.addEventListener("DOMContentLoaded", async () => {
  requireRole(["student"]);


  await loadStudentCourses();
  loadUserStateLocal();
  initCourseSearchFilters();
  updateDashboardStats();

  populateProfileFromAuth();   // name, email, id
  await loadProfileMeta();     // grade + joined date + photo

  updateAllCourses();
  updateEnrolledCourses();
  updateTeachers();
  updateAccountInfo();
  updateStats();
});






          // Close modals when clicking outside
          window.addEventListener('click', function(event) {
              if (event.target.classList.contains('modal-backdrop')) {
                  const modals = ['courseOverviewModal']; // lagay mo dto  yung id ng class mo for the closing trigger
                  modals.forEach(modalId => {
                      if (!document.getElementById(modalId).classList.contains('hidden')) {
                          closeModal(modalId);
                      }
                  });
              }
          });




  function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  }




  function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  }
  function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
  }




  function makeInitials(fullname, fallback) {
  const name = (fullname || "").trim();
  if (!name) return (fallback || "").slice(0, 2).toUpperCase();




  const parts = name.split(/\s+/).filter(Boolean);




  // Belinda Laurora => BL (first + last)
  if (parts.length >= 2) {
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
  }






  function populateProfileFromAuth() {
    const auth = getAuth();
    if (!auth) return;




    setText("profileName", auth.fullname || "Student");
    setText("profileStudentId", auth.id || "—");
    setText("profileEmail", auth.email || "—");




    setText("profileInitials", makeInitials(auth.fullname, auth.id));
  }










  // ---- Photo picker ----
  function openPhotoPicker() {
  const input = document.getElementById("profilePhotoInput");
  if (input) input.click();
  }






  function formatJoined(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }




  // ---- Load joined date + photo from DB (via PHP session) ----
async function loadProfileMeta() {
  try {
    const auth = localStorage.getItem("clasmeyt_auth");
    if (!auth) return;


    const res = await fetch("get_profile_meta.php", {
      headers: { "X-Auth": auth }
    });


    const data = await res.json();
    if (data.status !== "success") return;

    // GRADE LEVEL
    const gradeEl = document.getElementById("profileGrade");
    if (gradeEl && data.grade_level) {
      gradeEl.textContent = data.grade_level;
    }


    // PROFILE PHOTO
    const img = document.getElementById("profilePhotoImg");
    const initials = document.getElementById("profileInitials");


    if (data.profile_photo) {
      img.src = data.profile_photo + "?t=" + Date.now();
      img.classList.remove("hidden");
      initials.classList.add("hidden");
    } else {
      img.classList.add("hidden");
      initials.classList.remove("hidden");
    }


  } catch (e) {
    console.warn("loadProfileMeta failed", e);
  }
}










  // ---- Upload photo ----
function initProfilePhotoUpload() {
  const input = document.getElementById("profilePhotoInput");
  if (!input) return;


  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;


    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }


    const auth = localStorage.getItem("clasmeyt_auth");
    if (!auth) {
      alert("Not logged in");
      return;
    }


    const fd = new FormData();
    fd.append("photo", file);


    try {
      const r = await fetch("upload_profile_photo.php", {
        method: "POST",
        headers: {
          "X-Auth": auth
        },
        body: fd
      });


      const data = await r.json();


      if (data.status === "success") {
        const img = document.getElementById("profilePhotoImg");
        const initials = document.getElementById("profileInitials");


        img.src = data.photo_url + "?t=" + Date.now();
        img.classList.remove("hidden");
        initials.classList.add("hidden");


        alert("Profile photo updated");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (e) {
      console.error(e);
      alert("Upload error");
    }
  });
}


document.addEventListener("DOMContentLoaded", initProfilePhotoUpload);


  function redirectByRole(role) {
  if (role === "admin") window.location.href = "Admin.php";
  else if (role === "teacher") window.location.href = "Teacher.html";
  else window.location.href = "ClasMeyt.html";
  }

// for my message
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("contact_send.php", {
        method: "POST",
        body: new FormData(contactForm)
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Message sent! Check your email.");
        contactForm.reset();
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (err) {
      alert("Server error. Check console.");
      console.error(err);
    }
  });
}

async function loadCourseOverview(courseId) {
  try {
    const res = await fetch(
      `student_get_course_overview.php?course_id=${courseId}`
    );
    const data = await res.json();

    if (data.status !== "success") {
      currentCourse.overview = "";
      currentCourse.badge = null;
      return;
    }

    currentCourse.overview = data.overview.description || "";
    currentCourse.badge = data.overview.badge_name || null;

  } catch (e) {
    console.error("Failed to load course overview", e);
    currentCourse.overview = "";
  }
}








  (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98065659c46a0663',t:'MTc1ODA4ODM0NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();

