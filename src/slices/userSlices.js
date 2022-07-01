import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  fullName: "",
  email: "",
  token: "",
  imageUrl: "",
  userId: ""
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signInUser: (state, { payload }) => {
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
    userSignOut: (state) => {
      for (const key in initialState) {
        state[key] = initialState[key];
      }
    },
  },
});

export const { signInUser, userSignOut } = userSlice.actions;

export default userSlice.reducer;
