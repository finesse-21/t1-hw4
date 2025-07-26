import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, deleteUser } from "./usersThunk";
import type { User } from "../types";

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, { meta }) => {
        state.users = state.users.filter((user) => user.id !== meta.arg);
      });
  },
});

export default userSlice.reducer;
