import axios from "axios";
import { store } from "../redux/store";
import { setNewAccessToken } from "../redux/auth/authSlice";

// export const axiosApiInstance = axios.create({
//   baseURL: "http://localhost:8080",
//   withCredentials: true,
// });

// export const axiosApiInstanceAuth = axios.create({
//   baseURL: "http://localhost:8080",
//   withCredentials: true,
// });

export const axiosApiInstance = axios.create({
  baseURL: "http://ec2-3-217-173-234.compute-1.amazonaws.com:8080",
  withCredentials: true,
});

export const axiosApiInstanceAuth = axios.create({
  baseURL: "http://ec2-3-217-173-234.compute-1.amazonaws.com:8080",
  withCredentials: true,
});

/*Axios auth request interceptor to set auth token before every request*/ 
axiosApiInstanceAuth.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

/*Interceptor for every auth request to check for a failed accesst token.*/
axiosApiInstanceAuth.interceptors.response.use(
  // return successful response
  (response) => response,
  async (error) => {
    // get error request
    const originRequest = error.config;

    console.log("error: ", error);
    // check for error status if retried
    if (
      (error.response.status === 403 || !error.response) &&
      !originRequest._retry
    ) {
      // set retry to true to prevent infinite loop
      originRequest._retry = true;

      if (!error.response) {
        if (error.config.data === FormData)
          originRequest.headers["Content-Type"] = "multipart/form-data";
      }

      try {
        // attempt to retrieve a new access token using passed refresh token

        const response = await axios.get(
          "http://localhost:8080/auth/refresh-access-token",
          {
            withCredentials: true,
          }
        );

        // update state with new access token
        store.dispatch(setNewAccessToken(response.data));

        // update auth header
        originRequest.headers["Authorization"] = `Bearer ${response.data}`;

        // retry original request with new auth
        return axiosApiInstanceAuth(originRequest);
      } catch (refreshError) {
        // catch error or failed attempt to get new access token
        // return refresh error
        return Promise.reject(refreshError);
      }
    }

    // return original error
    return Promise.reject(error);
  }
);
