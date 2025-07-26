import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@shared/api/axios";
import type { User } from "../types";

export const fetchUsers = createAsyncThunk<User[]>("users/fetch", async () => {
  const response = await api.get("/v1/users");
  return response.data;
});

export const deleteUser = createAsyncThunk<void, string>(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/v1/users/${id}`);
    } catch {
      return rejectWithValue("Ошибка удаления");
    }
  }
);
