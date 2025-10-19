import { registerUser } from "../backend/backend.js";
import { loginUser } from "../backend/backend.js";
// Form switching functionality
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");
  const fullNameEl = document.getElementById("signup-name");
  const emailEl = document.getElementById("signup-email");
  const passwordEl = document.getElementById("signup-password");
  const loginEmailEl = document.getElementById("login-email");
  const loginPasswordEl = document.getElementById("login-password");

  //Signing Up
  async function signUpUser() {
    const fullName = fullNameEl.value;
    const email = emailEl.value;
    const password = passwordEl.value;
    const data = await registerUser(fullName, email, password);
  }
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signUpUser();
  });

  //Login
  async function signInUser() {
    const email = loginEmailEl.value;
    const password = loginPasswordEl.value;
    const data = await loginUser(email, password);
    console.log(data);
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signInUser();
  });

  // Form switching
  showSignup.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });
});
