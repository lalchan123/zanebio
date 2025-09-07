import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk for checking link validity
export const checkLinkValidity = createAsyncThunk(
  "apiTest/checkLinkValidity",
  async (url) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const text = await response.text();

      // Check if the response contains the GraphQL screen keywords
      const isGraphQLScreen =
        text.includes("GraphQL") || text.includes("GraphiQL");

      return isGraphQLScreen;
    } catch (error) {
      return false;
    }
  }
);

const apiTestSlice = createSlice({
  name: "apiTest",
  initialState: {
    isValid: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLinkValidity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkLinkValidity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isValid = action.payload;
      })
      .addCase(checkLinkValidity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isValid = false;
      });
  },
});

export default apiTestSlice.reducer;
