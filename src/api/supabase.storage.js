import supabase from "./supabase.api";

//이미지 업로드
export const uploadImage = async (file) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${file.name}`, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  console.log("Image uploaded:", data);
  return data;
};

// 이미지 URL 가져오기 - 업로드한 이미지 내려받기
export const getImageUrl = (path) => {
  const { publicURL, error } = supabase.storage
    .from("images")
    .getPublicUrl(path);

  if (error) {
    console.error("Error getting image URL:", error);
    return null;
  }

  return publicURL;
};
