import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import baseUrlReducer from "./features/baseUrlSet/baseUrlSlice";
import userInfoReducer, { initializeUser } from "./features/User/loginLogout";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    baseUrl: baseUrlReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
