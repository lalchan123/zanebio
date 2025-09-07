import { createSlice } from "@reduxjs/toolkit";

const generateUniqueKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("baseUrl", JSON.stringify(state));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("baseUrl");
  return data
    ? JSON.parse(data)
    : { type: null, key: null, value: null, uniqueKey: null };
};

const initialState = loadFromLocalStorage();

export const baseUrlSlice = createSlice({
  name: "baseUrl",
  initialState,
  reducers: {
    setUpNewIp: (state, action) => {
      const uniqueKey = generateUniqueKey();
      state.type = action.payload.type;
      state.key = action.payload.key;
      state.value = action.payload.value;
      state.uniqueKey = uniqueKey;
      saveToLocalStorage(state);
    },
    updateOldIp: (state, action) => {
      state.type = action.payload.type;
      state.key = action.payload.key;
      state.value = action.payload.value;
      saveToLocalStorage(state);
    },
    loadBaseUrl: (state) => {
      const savedState = loadFromLocalStorage();
      return { ...state, ...savedState };
    },
  },
});

export const { setUpNewIp, updateOldIp, loadBaseUrl } = baseUrlSlice.actions;

export default baseUrlSlice.reducer;
