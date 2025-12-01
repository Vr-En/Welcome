// Default configuration
const defaultConfig = {
site_title: "YourSite",
hero_headline: "Welcome to Our Amazing Platform",
hero_subtitle:
    "Discover innovative solutions that transform the way you work and connect",
how_it_works_title: "How It Works",
contact_title: "Contact Us",
};

// Modal functions
function openModal(modalId) {
document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
document.getElementById(modalId).style.display = "none";
const successMsg = document.querySelector(`#${modalId} .success-message`);
if (successMsg) {
    successMsg.style.display = "none";
}
}

function switchModal(currentModal, targetModal) {
closeModal(currentModal);
openModal(targetModal);
}

// Close modal when clicking outside
window.onclick = function (event) {
if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
}
};

// Smooth scrolling
function scrollToSection(sectionId) {
document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
});
}

// Form handlers
function handleLogin(event) {
event.preventDefault();
document.getElementById("login-success").style.display = "block";
event.target.reset();
setTimeout(() => closeModal("loginModal"), 2000);
}

function handleRegister(event) {
event.preventDefault();
document.getElementById("register-success").style.display = "block";
event.target.reset();
setTimeout(() => closeModal("registerModal"), 2000);
}

function handleContactSubmit(event) {
event.preventDefault();
document.getElementById("contact-success").style.display = "block";
event.target.reset();
document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
});
}

// Element SDK integration
async function onConfigChange(config) {
document.getElementById("site-title").textContent =
    config.site_title || defaultConfig.site_title;
document.getElementById("hero-headline").textContent =
    config.hero_headline || defaultConfig.hero_headline;
document.getElementById("hero-subtitle").textContent =
    config.hero_subtitle || defaultConfig.hero_subtitle;
document.getElementById("how-it-works-title").textContent =
    config.how_it_works_title || defaultConfig.how_it_works_title;
document.getElementById("contact-title").textContent =
    config.contact_title || defaultConfig.contact_title;
}

function mapToCapabilities(config) {
return {
    recolorables: [],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined,
};
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
window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
});
}


