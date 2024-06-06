import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  created_at: "",
  nickname: "",
  name: "",
  phone: "",
  birthday: "",
  avatar_url: "",
  desc: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmailPassword: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    updatePersonalInfo: (state, action) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.birthday = action.payload.birthday;
    },
    updateNicknameDesc: (state, action) => {
      state.nickname = action.payload.nickname;
      state.desc = action.payload.desc;
    },
    updateAvartarURL: (state, action) => {
      console.log("아바타 url 저장로직 실행", action.payload.avatar_url);
      state.avatar_url = action.payload.avatar_url;
    },
  },
});

// Redux 액션과 리듀서 내보내기
export const {
  updateEmailPassword,
  updatePersonalInfo,
  updateNicknameDesc,
  updateAvartarURL,
} = userSlice.actions;
export default userSlice.reducer;
