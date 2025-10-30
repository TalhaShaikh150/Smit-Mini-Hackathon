import { registerUser, loginUser } from "../backend/backend.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login");
  const signupFormContainer = document.getElementById("signup-form");
  const loginFormContainer = document.getElementById("login-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");

  const signupNameEl = document.getElementById("signup-name");
  const signupEmailEl = document.getElementById("signup-email");
  const signupPasswordEl = document.getElementById("signup-password");

  const signupForm = document.getElementById("signup");
  //Status Messages
  const loginEmailEl = document.getElementById("login-email");
  const loginPasswordEl = document.getElementById("login-password");
  // -------------------------
  // FORM SWITCHING
  // -------------------------
  showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    loginFormContainer.classList.add("hidden");
    signupFormContainer.classList.remove("hidden");
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupFormContainer.classList.add("hidden");
    loginFormContainer.classList.remove("hidden");
  });

  // -------------------------
  // SIGNUP
  // -------------------------
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = signupNameEl.value;
    const email = signupEmailEl.value;
    const password = signupPasswordEl.value;

    const result = await registerUser(name, email, password);
    if (result) {
      signupForm.reset();
    }
  });
  // -------------------------
  // LOGIN
  // -------------------------

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginEmailEl.value;
    const password = loginPasswordEl.value;

    const result = await loginUser(email, password);
    if (result) {
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);
    }
  });
});
