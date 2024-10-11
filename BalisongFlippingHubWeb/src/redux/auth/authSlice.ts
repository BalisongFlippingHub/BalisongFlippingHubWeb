import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { Profile } from "../../modals/User";
import { login, logout, registerNewUser } from "./authActions";

interface AuthState {
  user: Profile | null;
  accessToken: string | null;
  rememberLoginCredentials: boolean;
  error: boolean;
  errorMsg: string;
  loading: boolean;
  success: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  rememberLoginCredentials: false,
  error: false,
  errorMsg: "",
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleToRememberLogiinCredentials: (state) => {
      if (!state.rememberLoginCredentials) {
        localStorage.setItem("remember-login-info", "true");
      } else {
        localStorage.removeItem("remember-login-info");
      }

      state.rememberLoginCredentials = !state.rememberLoginCredentials;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.errorMsg = action.payload;
    },
    clearError: (state) => {
      state.error = false;
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        // handle registration is loading
        state.loading = true;
      })
      .addCase(registerNewUser.fulfilled, (state) => {
        // handle successful registration
        state.loading = false;
      })
      .addCase(
        registerNewUser.rejected,
        (state, action: PayloadAction<any>) => {
          // handle error in registration
          state.loading = false;
          state.error = true;
          state.errorMsg = action.payload;
        }
      )
      .addCase(login.pending, (state) => {
        // handle login is loading
        state.loading = true;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            accessToken: string;
            account: Profile | null;
          }>
        ) => {
          // handle successful login
          console.log(action);
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.account;
          state.loading = false;
        }
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        // handle error in logging in user
        state.loading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(logout.pending, (state) => {
        // handle loading logout
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        // handle successful logout
        state.accessToken = null;
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        // handle error from backend in logging out user
        state.loading = false;
        state.accessToken = null;
        state.user = null;
      });
  },
});

export const { toggleToRememberLogiinCredentials, setError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
