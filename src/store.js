import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlices";
import userReducer from "./slices/userSlices";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer
  },
});

export default store;