const supabaseUrl = "https://ahurvvnmirgwfcrrginq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodXJ2dm5taXJnd2ZjcnJnaW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDg2MTIsImV4cCI6MjA3NjEyNDYxMn0.CKE2Pcgk8_2mXZRenAAgpYwH973mxgjm5JXWnRIK3SY";

export const client = supabase.createClient(supabaseUrl, supabaseKey);

export async function registerUser(fullName, email, password) {
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        displayName: fullName,
      },
    },
  });

  if (error) {
    throw error;
    return null;
  } else {
    return data;
  }
}

export async function loginUser(email, password) {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;

    return null;
  } else {
    return data;
  }
}

export async function checkAuth() {
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw error;

    return null;
  } else {
    return data;
  }
}
