import { registerUser, loginUser } from "../backend/backend.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");

  const fullNameEl = document.getElementById("signup-name");
  const emailEl = document.getElementById("signup-email");
  const passwordEl = document.getElementById("signup-password");
  const loginEmailEl = document.getElementById("login-email");
  const loginPasswordEl = document.getElementById("login-password");

  // -------------------------
  // SIGNUP
  // -------------------------
  async function signUpUser() {
    const fullName = fullNameEl.value.trim();
    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();

    if (!fullName || !email || !password) {
      alert("Please fill all fields", "error");
      return;
    }

    const result = await registerUser(fullName, email, password);

    if (result.user) {
      alert("Account created successfully!", "success");
      signupForm.reset();
      showLogin.click(); // Switch to login form
    } else if (result.error) {
      alert(result.error.message, "error");
    }
  }

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signUpUser();
  });

  // -------------------------
  // LOGIN
  // -------------------------
  async function signInUser() {
    const email = loginEmailEl.value.trim();
    const password = loginPasswordEl.value.trim();

    if (!email || !password) {
      alert("Please fill all fields", "error");
      return;
    }

    const result = await loginUser(email, password);

    if (result.user) {
      alert("Login successful!", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else if (result.error) {
      alert(result.error.message, "error");
    }
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signInUser();
  });

  // -------------------------
  // FORM SWITCHING
  // -------------------------
  showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });
});
