import { createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import axios from "../../api/axios";

interface RegistrationPayload {
  email: string;
  displayName: string | null;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerNewUser = createAsyncThunk(
  "auth/register",
  async (payload: RegistrationPayload, thunkAPI) => {
    console.log(payload);
    try {
      await axios.request({
        url: "/auth/register",
        method: "post",
        data: payload,
      });
    } catch (error: any) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const response = await axios.request({
        url: "/auth/login",
        method: "post",
        withCredentials: true,
        data: payload,
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.request({
    url: "/auth/logout",
    method: "post",
    withCredentials: true,
  });
});
