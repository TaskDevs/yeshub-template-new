import axios from "axios";
import cookieMethods from "./cookieUtils";
import {
  baseUrl,
  timeOut,
  SUCCESS_STATUS,
  BAD_REQUEST_STATUS,
} from "../globals/constants";

const instance = axios.create({
  baseUrl,
  timeOut,
  withCredentials: true,
  crossDomain: true,
  headers: {
    "x-Requested-with": "XMLHttpRequest",
    Accept: "application/json",
  },
});

// Axios response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === BAD_REQUEST_STATUS) {
      try {
        const cookiesData = cookieMethods.getCookies(); // Retrieve the cookies
        const accessToken = cookiesData ? cookiesData.accessToken : null;

        if (accessToken) {
          const refreshResponse = await axios.post(`${baseUrl}api/v1/auth/refreshToken`, {
            accessToken: accessToken, // Use the accessToken from cookies
          });

          if (refreshResponse.status === SUCCESS_STATUS) {
            const newToken = refreshResponse.data.accessToken;

            // Store new token in cookies
            cookieMethods.setCookies(newToken);

            // Update Axios instance headers with the new token
            instance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

            // Retry the failed request with the new token
            error.config.headers["Authorization"] = `Bearer ${newToken}`;
            return instance(error.config);
          }
        }
      } catch (refreshError) {
        console.error("Token Refresh Failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;