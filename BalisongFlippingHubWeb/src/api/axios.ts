import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/auth/authActions";
import { setNewAccessToken } from "../redux/auth/authSlice";

export const axiosApiInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const axiosApiInstanceAuth = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${store.getState().auth.accessToken}`,
  },
});

/*Interceptor for every auth request to check for a failed accesst token.*/
axiosApiInstanceAuth.interceptors.response.use(
  // return successful response
  (response) => response,
  async (error) => {
    // get error request
    const originRequest = error.config;

    // check for error status if retried
    if (error.response.status === 403 && !originRequest._retry) {
      // set retry to true to prevent infinite loop
      originRequest._retry = true;

      try {
        // attempt to retrieve a new access token using passed refresh token
        const response = await axios.get(
          "http://localhost:8080/auth/refresh-access-token"
        );

        // update state with new access token
        store.dispatch(setNewAccessToken(response.data));

        // update auth header
        axiosApiInstanceAuth.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data}`;

        // retry original request with new auth
        return axiosApiInstanceAuth(originRequest);
      } catch (refreshError) {
        // catch error or failed attempt to get new access token
        // logout user from state
        store.dispatch(logout());

        // return refresh error
        return Promise.reject(refreshError);
      }
    }

    // return original error
    return Promise.reject(error);
  }
);
