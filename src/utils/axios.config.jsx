import axios from "axios";
import cookieMethods from "./cookieUtils";
import {
  baseURL,
  timeOut,
  SUCCESS_STATUS,
  BAD_REQUEST_STATUS,
} from "../globals/constants";

const instance = axios.create({
  baseURL,
  timeOut,
  withCredentials: true,
  crossDomain: true,
  headers: {
    "x-Requested-with": "XMLHttpRequest",
    Accept: "application/json",
  },
});

let accessToken;
let data = cookieMethods.getCookies();
if (data) accessToken = data.accessToken;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === BAD_REQUEST_STATUS) {
      (async () => {
        const response = await axios.post("/auth/refreshToken", {
          accessToken,
        });
        if (response.status === SUCCESS_STATUS) {
          cookieMethods.setCookies(response.data.accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axios(error.config);
        }
      })();
      return error;
    }
  }
);

export default instance;

// import axios from "axios";
// import cookieMethods from "./cookieUtils";
// import {
//   baseURL,
//   timeOut,
//   SUCCESS_STATUS,
//   BAD_REQUEST_STATUS,
// } from "../globals/constants";

// const instance = axios.create({
//   baseUrl: baseURL,
//   timeOut,
//   withCredentials: true,
//   crossDomain: true,
//   headers: {
//     "x-Requested-with": "XMLHttpRequest",
//     Accept: "application/json",
//   },
// });

// // Axios response interceptor
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === BAD_REQUEST_STATUS) {
//       try {
//         const response = await axios.post(`${baseURL}/auth/refreshToken`, {
//           accessToken: getAccessToken(),
//         });

//         if (response.status === SUCCESS_STATUS) {
//           const newToken = response.data.accessToken;

//           // Store new token in cookies
//           cookieMethods.setCookies(newToken);

//           // Update Axios instance headers
//           instance.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${newToken}`;

//           // Retry the failed request with the new token
//           error.config.headers["Authorization"] = `Bearer ${newToken}`;
//           return instance(error.config);
//         }
//       } catch (refreshError) {
//         console.error("Token Refresh Failed:", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
