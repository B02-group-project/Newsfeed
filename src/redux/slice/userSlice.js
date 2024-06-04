import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  name: "",
  phone: "",
  birthday: "",
  nickname: "",
  avartar_url: "",
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
      state.avartar_url = action.payload.avartar_url;
    },
  },
});

// Redux 액션과 리듀서 내보내기
export const { updateEmailPassword, updatePersonalInfo, updateNicknameAvatar } =
  userSlice.actions;
export default userSlice.reducer;
