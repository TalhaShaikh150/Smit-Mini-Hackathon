const supabaseUrl = "https://ahurvvnmirgwfcrrginq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodXJ2dm5taXJnd2ZjcnJnaW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDg2MTIsImV4cCI6MjA3NjEyNDYxMn0.CKE2Pcgk8_2mXZRenAAgpYwH973mxgjm5JXWnRIK3SY";

export const client = supabase.createClient(supabaseUrl, supabaseKey);

const errorMessage = document.querySelector(".error-message");
const statusMessage = document.querySelector(".status");
const signInBtn = document.getElementById("show-login");
//SignUp Form
//Login Form

function addError() {
  errorMessage.classList.remove("hide");
  setTimeout(() => {
    errorMessage.classList.add("hide");
  }, 2400);
}

function showStatus() {
  statusMessage.classList.remove("hide");
  statusMessage.innerHTML = "Account Created Sucessfully";

  setTimeout(() => {
    statusMessage.classList.add("hide");
    statusMessage.innerHTML = "";
  }, 2000);
}

export async function registerUser(name, email, password) {
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        displayName: name,
      },
    },
  });
  if (data.user == null) {
    addError();
  } else {
    statusMessage.classList.remove("hide");
    statusMessage.innerHTML = "Account Created Sucessfully";
    setTimeout(() => {
      statusMessage.classList.add("hide");
      statusMessage.innerHTML = "";
      signInBtn.click();
    }, 1000);
  }

  if (error) {
    if (error.message) {
      statusMessage.classList.add("hide");

      addError();
      errorMessage.innerHTML = `${error.message}`;
      return;
    }
  }
  return data;
}



// export async function checkAuth() {
//   const { data, error } = await client.auth.getSession();

//   if (error) {
//     throw error;

//     return null;
//   } else {
//     return data;
//   }
// }
