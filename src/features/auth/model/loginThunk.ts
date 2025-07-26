import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@shared/api/axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      await api.post("/v1/auth/login", data);
      const res = await api.get("/v1/auth/me");
      return res.data;
    } catch {
      return rejectWithValue("Ошибка авторизации");
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/v1/auth/me");
      return res.data;
    } catch {
      return rejectWithValue(null);
    }
  }
);
