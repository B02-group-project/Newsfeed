import supabase from "./supabase.client";

async function signUp(userdata) {
  //Auth/ users 에 인증된 사용자로 등록
  const { data, error } = await supabase.auth.signUp({
    email: userdata.email,
    password: userdata.password,
  });
  if (error) {
    console.error("Auth유저 생성에 에러가 발생", error.message);
  }
  const { error: insertError } = await supabase.from("userInfo").insert({
    id: data.user.id,
    nickname: userdata.nickname,
    name: userdata.name,
    phone: userdata.phone,
    birthday: userdata.birthday,
    avatar_url: userdata.avatar_url,
    desc: userdata.desc,
  });

  if (insertError) {
    console.error(" userInfo에 유저 생성시, 에러가 발생", insertError.message);
    return;
  }
}

export default signUp;
