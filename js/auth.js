import { registerUser } from "../backend/backend.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupFormContainer = document.getElementById("signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");

  const signupNameEl = document.getElementById("signup-name");
  const signupEmailEl = document.getElementById("signup-email");
  const signupPasswordEl = document.getElementById("signup-password");

  const signupForm = document.getElementById("signup");
  //Status Messages

  // -------------------------
  // FORM SWITCHING
  // -------------------------
  showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    signupFormContainer.classList.remove("hidden");
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupFormContainer.classList.add("hidden");
    loginForm.classList.remove("hidden");
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
});
