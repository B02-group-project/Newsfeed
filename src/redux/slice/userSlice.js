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
    // addUser: async (state, action) => {
    //   // 리듀서의 동작을 정의합니다. 비동기 작업은 thunk에서 처리합니다.
    //   state.nickname = action.payload.nickname;
    //   state.name = action.payload.name;
    //   state.phone = action.payload.phone;
    //   state.birthday = action.payload.birthday;
    //   state.avartar_url = action.payload.avartar_url;
    // },
  },
});

// Thunk 액션 생성
// export const addUserAsync = (userData) => async (dispatch) => {
//   try {
//     const { data, error } = await supabase.auth.updateUser({
//       data: {
//         nickname: userData.nickname,
//         name: userData.name,
//         phone: userData.phone,
//         birthday: userData.birthday,
//         avartar_url: userData.avartar_url,
//       },
//     });

//     if (error) {
//       throw error;
//     } else {
//       console.log("data=>", data);
//     }
//   } catch (error) {
//     console.error("Error updating user metadata :", error);
//   }
// };
// Redux 액션과 리듀서 내보내기
export const { updateEmailPassword, updatePersonalInfo, updateNicknameAvatar } =
  userSlice.actions;
export default userSlice.reducer;
