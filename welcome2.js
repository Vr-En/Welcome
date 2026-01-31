const defaultConfig = {
site_title: "ClasMeyt",
hero_headline: "Welcome to Our Amazing Platform",
hero_subtitle: "Discover innovative solutions that transform the way you work and connect",
how_it_works_title: "How It Works",
contact_title: "Contact Us",
};

// -------------------- Modal functions --------------------
function openModal(modalId) {
document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
document.getElementById(modalId).style.display = "none";
const successMsg = document.querySelector(`#${modalId} .success-message`);
if (successMsg) successMsg.style.display = "none";
}

function switchModal(currentModal, targetModal) {
closeModal(currentModal);
openModal(targetModal);
}

window.onclick = function (event) {
if (event.target.classList.contains("modal")) {
event.target.style.display = "none";
}
};

function scrollToSection(sectionId) {
document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// -------------------- HELPERS --------------------
async function postForm(url, formEl) {
const formData = new FormData(formEl);

const res = await fetch(url, {
  method: "POST",
  body: formData,
  credentials: "include" //  REQUIRED
});


const data = await res.json();
return data;
}

function showError(el, msg) {
if (!el) return;
el.textContent = msg;
el.style.display = "block";
}

function hideError(el) {
if (!el) return;
el.textContent = "";
el.style.display = "none";
}

// -------------------- AUTH --------------------
document.addEventListener("DOMContentLoaded", () => {
  // LOGIN
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("login-error");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError(loginError);

    try {
      const data = await postForm("login.php", loginForm);

      if (data.status === "success") {
        //  MAIN AUTH OBJECT (used for auto-login + guards)
        const auth = {
          id: data.student_id,
          role: data.role || "student",
          fullname: data.fullname || "",
          email: data.email || "",
          grade_level: data.grade_level || ""
        };
        localStorage.setItem("clasmeyt_auth", JSON.stringify(auth));

        //  redirect by role
        if (auth.role === "admin") {
          window.location.href = "Admin.php";
        } else if (auth.role === "teacher") {
          window.location.href = "Teacher.html";
        } else {
          window.location.href = "ClasMeyt.html";
        }
        return;
      }

      showError(loginError, "Invalid Student ID or Password.");
    } catch (err) {
      console.error(err);
      showError(loginError, "Server error. Use localhost (XAMPP), not file://");
    }
  });
}



function redirectByRole(role) {
if (role === "admin") window.location.href = "Admin.php";
else if (role === "teacher") window.location.href = "Teacher.html";
else window.location.href = "ClasMeyt.html";
}



//REGISTER
const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("register-error");

if (registerForm) {
registerForm.addEventListener("submit", async (e) => {
e.preventDefault();
hideError(registerError);

try {
const data = await postForm("register.php", registerForm);
if (data.status === "success") {
const ok = document.getElementById("register-success");
if (ok) ok.style.display = "block";
registerForm.reset();
setTimeout(() => {
closeModal("registerModal");
openModal("loginModal");
}, 1000);
return;
}

if (data.status === "exists") {
showError(registerError, "Student ID already exists. Try another one.");
return;
}
showError(registerError, "Registration failed. Please complete all fields.");
} catch (err) {
showError(registerError, "Server error. Use localhost (XAMPP), not file://");
}
});
}
});

// -------------------- CONTACT --------------------
function handleContactSubmit(event) {
event.preventDefault();
document.getElementById("contact-success").style.display = "block";
event.target.reset();
document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// -------------------- Element SDK integration --------------------
async function onConfigChange(config) {
document.getElementById("site-title").textContent = config.site_title || defaultConfig.site_title;
document.getElementById("hero-headline").textContent = config.hero_headline || defaultConfig.hero_headline;
document.getElementById("hero-subtitle").textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
document.getElementById("how-it-works-title").textContent = config.how_it_works_title || defaultConfig.how_it_works_title;
document.getElementById("contact-title").textContent = config.contact_title || defaultConfig.contact_title;
}

function mapToCapabilities(config) {
return { recolorables: [], borderables: [], fontEditable: undefined, fontSizeable: undefined };
}

function mapToEditPanelValues(config) {
return new Map([
["site_title", config.site_title || defaultConfig.site_title],
["hero_headline", config.hero_headline || defaultConfig.hero_headline],
["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
["how_it_works_title", config.how_it_works_title || defaultConfig.how_it_works_title],
["contact_title", config.contact_title || defaultConfig.contact_title],
]);
}

if (window.elementSdk) {
window.elementSdk.init({ defaultConfig, onConfigChange, mapToCapabilities, mapToEditPanelValues });
}


// AUTH HELPERS

function getAuth() {
  try {
    return JSON.parse(localStorage.getItem("clasmeyt_auth") || "null");
  } catch {
    return null;
  }
}


// AUTO LOGIN

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth();
  if (!auth || !auth.id || !auth.role) return;

  if (auth.role === "admin") {
    window.location.href = "Admin.php";
  } else if (auth.role === "teacher") {
    window.location.href = "Teacher.html";
  } else {
    window.location.href = "ClasMeyt.html";
  }
});





