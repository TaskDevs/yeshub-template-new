import React, { createContext, useState, useEffect } from "react";
import { login, retrieve, logout } from "./authApi";
import { notify } from "../../../utils/responseUtils";
import axios from "../../../utils/axios.config";
import { BAD_REQUEST_STATUS } from "../../../globals/constants";
import cookieMethods from "../../../utils/cookieUtils";

export const AuthApiData = createContext();

const AuthApiDataProvider = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  sessionStorage.setItem("OAuthUserId", userProfile?.id)
 
  // console.log("userProfile", userProfile)


  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (!isAuthenticated) {
      const userSession = await processRetrieve();
      if (userSession) {
        setIsAuthenticated(true);
      }
    }
  };

  const processLogin = async (data) => {
    let response = await login(data);
    if (response.data) {
      setUserProfile(response.data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      setRole(response.data.role);
      cookieMethods.setCookies(response.accessToken);
      setRole(response.data.role);
    } else {
      notify(BAD_REQUEST_STATUS, "Failed to login");
    }
  };

  const processRetrieve = async () => {
    let cookieData = cookieMethods.getCookies();
    if (!cookieData.accessToken) return false;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookieData.accessToken}`;

    let response = await retrieve();
    if (response) {
      setUserProfile(response.data);
      setRole(response.data.role);
      setIsAuthenticated(true);
      return true;
    } else {
      return false;
    }
  };

  const processLogout = async () => {
    let cookieData = cookieMethods.getCookies();
    if (!cookieData.accessToken) return false;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookieData.accessToken}`;
    let response = await logout();
    if (response) {
      cookieMethods.deleteCookies();
      setUserProfile(null);
      setRole(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  return (
    <AuthApiData.Provider
      value={{
        userProfile,
        role,
        isAuthenticated,
        processRetrieve,
        processLogin,
        processLogout,
      }}
    >
      {props.children}
    </AuthApiData.Provider>
  );
};

export default AuthApiDataProvider;
