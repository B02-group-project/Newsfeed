import supabase from "./supabase.client";

//사용자가 선택한 아바타 이미지를 Storage에 업로드하는 함수.
export const uploadImage = async ({ e, bucket }) => {
  if (!e.target.files || e.target.files.length === 0) {
    throw new Error("이미지를 선택해주세요.");
  }
  const file = e.target.files[0];
  //이미지 업로드 실행
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${file.name}`, file);

  if (error) {
    console.error(`[${bucket}]이미지 업로드과정에 에러`, error);
  }
  return data.path;
};

export const getAvatarPublicUrl = (imagePath) => {
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(String(imagePath));
  return data.publicUrl;
};
