import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApiInstance } from "../../api/axios";

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
      await axiosApiInstance.request({
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
      const response = await axiosApiInstance.request({
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
  await axiosApiInstance.request({
    url: "/auth/logout",
    method: "post",
    withCredentials: true,
  });
});

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh-access-token",
  async (_payload, { rejectWithValue }) => {
    try {
      console.log("calling refresh token");
      const newAccessToken: string = await axiosApiInstance.request({
        url: "/auth/refresh-access-token",
        method: "get",
        withCredentials: true,
      });

      return newAccessToken;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
