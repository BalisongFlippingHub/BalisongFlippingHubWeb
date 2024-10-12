import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../modals/User";
import { login, logout, registerNewUser, refreshAccessToken } from "./authActions";
import { AppDispatch } from "../store";
import { clearCollection } from "../collection/collectionSlice";

interface AuthState {
  user: Profile | null;
  accessToken: string | null;
  rememberLoginCredentials: boolean;
  error: boolean;
  errorMsg: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  rememberLoginCredentials: false,
  error: false,
  errorMsg: "",
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToRememberLoginInfo: (state) => {
      state.rememberLoginCredentials = true
      localStorage.setItem("save-user-info", "true")
    },
    toggleOffRememberLoginInfo: (state) => {
      state.rememberLoginCredentials = false
      localStorage.removeItem("save-user-info")
      localStorage.removeItem("saved-user-email")
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
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.account;
          state.loading = false;

          // update collection slice

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

        // clear collection slice
        clearCollection()
      })
      .addCase(refreshAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
        // on successful refresh of access token check for valid access token
        if (action.payload !== "") {
          state.accessToken = action.payload

          // set timeout to recall refresh on access token
          setTimeout(() => {
            refreshAccessToken()
          }, 10000)
        }
      })
      .addCase(refreshAccessToken.rejected, (state, action: PayloadAction<any>) => {
        // when unauthorized with failed attempt to get new access token
        // reset state
        state = initialState
        
      })
  },
});

export const { setToRememberLoginInfo, toggleOffRememberLoginInfo, setError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
