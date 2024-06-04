import supabase from "./supabase.client";

async function signInWithEmail(email, password) {
  const { user, session, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    // 로그인 실패
    return { success: false, error: error.message };
  } else {
    // 로그인 성공
    return { success: true, user: user, session: session };
  }
}
export default signInWithEmail;
