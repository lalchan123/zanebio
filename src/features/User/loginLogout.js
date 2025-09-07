import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  jwtToken: null,
  name: null,
  status: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { email, jwtToken, name, status } = action.payload;
      state.email = email;
      state.jwtToken = jwtToken;
      state.name = name;
      state.status = status;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
    userLogout: (state) => {
      localStorage.removeItem("userInfo");
      return initialState; // Reset state
    },
    initializeUser: (state) => {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (storedUserInfo) {
        return { ...state, ...storedUserInfo };
      }
      return state;
    },
  },
});

export const { userLogin, userLogout, initializeUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
