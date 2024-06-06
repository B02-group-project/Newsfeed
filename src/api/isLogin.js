import supabase from "./supabase.client";

async function isLogin() {
  const session = await supabase.auth.session();
  console.log("세션 정보 : ", session);
  if (session) {
    return true;
  } else return false;
}

export default isLogin;
