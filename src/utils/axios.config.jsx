import axios from "axios";
import cookieMethods from "./cookieUtils";
import {
	baseURL,
	timeOut,
	SUCCESS_STATUS,
	BAD_REQUEST_STATUS,
} from "../globals/constants";

// console.log("baseUrl-constants", baseURL);

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
