import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, fetchMe } from "./loginThunk";

interface AuthState {
  user: { email: string } | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchMe.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
