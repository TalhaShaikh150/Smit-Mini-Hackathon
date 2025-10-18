const supabaseUrl = "https://ahurvvnmirgwfcrrginq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodXJ2dm5taXJnd2ZjcnJnaW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDg2MTIsImV4cCI6MjA3NjEyNDYxMn0.CKE2Pcgk8_2mXZRenAAgpYwH973mxgjm5JXWnRIK3SY";

export const client = supabase.createClient(supabaseUrl, supabaseKey);

export async function registerUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data) {
    return data;
  } else {
    return null;
  }
}

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data) {
    return data;
  } else {
    return null;
  }
}

export async function checkAuth() {
  const { data, error } = await supabase.auth.getSession();

  if (data) {
    return data;
  } else {
    return null;
  }
}
