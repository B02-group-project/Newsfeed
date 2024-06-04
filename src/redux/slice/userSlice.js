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
    updateNicknameAvatar: (state, action) => {
      state.nickname = action.payload.nickname;
      state.avatar_url = action.payload.avatarUrl;
      state.desc = action.payload.desc;
    },
  },
});

// Redux 액션과 리듀서 내보내기
export const { updateEmailPassword, updatePersonalInfo, updateNicknameAvatar } =
  userSlice.actions;
export default userSlice.reducer;
