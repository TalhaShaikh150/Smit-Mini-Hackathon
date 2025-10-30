const supabaseUrl = "https://ahurvvnmirgwfcrrginq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodXJ2dm5taXJnd2ZjcnJnaW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDg2MTIsImV4cCI6MjA3NjEyNDYxMn0.CKE2Pcgk8_2mXZRenAAgpYwH973mxgjm5JXWnRIK3SY";

export const client = supabase.createClient(supabaseUrl, supabaseKey);

const errorMessageSignup = document.querySelector(".error-message-signup");
const errorMessageLogin = document.querySelector(".error-message-login");
const statusMessage = document.querySelector(".status");
const signInBtn = document.getElementById("show-login");
//SignUp Form
//Login Form

function addError() {
  errorMessageSignup.classList.remove("hide");
  setTimeout(() => {
    errorMessageSignup.classList.add("hide");
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
      errorMessageSignup.innerHTML = `${error.message}`;
      return;
    }
  }
  return data;
}

export async function loginUser(email, password) {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    statusMessage.classList.add("hide");
    errorMessageLogin.classList.remove("hide");
    setTimeout(() => {
      errorMessageLogin.classList.add("hide");
    }, 2400);
    errorMessageLogin.innerHTML = error.message;
    return;
  }

  if (data) {
    statusMessage.classList.remove("hide");
    statusMessage.innerHTML = "Login Successful!";
    return data;
  }
}

// export async function loginUser(email, password) {
//   const { data, error } = await client.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {

//       console.log(errorMessage);
//       console.log(error.message);

//       addError();

//     errorMessage.innerHTML = `${error.message}`;
//     return;
//   }

//   if (data) {
//     statusMessage.classList.remove("hide");
//     statusMessage.innerHTML = "Login Successful!";
//     // setTimeout(() => {
//     //   window.location.href = "dashboard.html";
//     statusMessage.classList.add("hide");
//     // }, 1000);
//     console.log("Login Successful");
//   }
// }

// export async function checkAuth() {
//   const { data, error } = await client.auth.getSession();

//   if (error) {
//     throw error;

//     return null;
//   } else {
//     return data;
//   }
// }

export async function checkAuth() {
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw error;

    return null;
  } else {
    return data;
  }
}
