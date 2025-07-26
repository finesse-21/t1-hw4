import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@shared/api/axios";

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/v1/auth/logout");
  } catch {
    throw new Error("Ошибка выхода");
  }
});
