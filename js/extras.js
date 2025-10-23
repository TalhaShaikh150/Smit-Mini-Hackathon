const signupPasswordEl = document.getElementById("signup-password");
const loginPasswordEl = document.getElementById("login-password");

const showPasswordBtn = document.querySelectorAll(".fa-eye");

function showPassword() {
  showPasswordBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("fa-eye")) {
        btn.classList.add("fa-eye-slash");
        btn.classList.remove("fa-eye");
        if (index == 0) {
          loginPasswordEl.type = "text";
        } else if (index == 1) {
          signupPasswordEl.type = "text";
        }
      } else {
        loginPasswordEl.type = "password";
        signupPasswordEl.type = "password";
        btn.classList.add("fa-eye");
        btn.classList.remove("fa-eye-slash");
      }
    });
  });
}

showPassword();
