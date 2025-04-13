import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookieMethods from "../../../../../utils/cookieUtils";
import { base } from "../../../../../globals/route-names";

const LinkedInCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refresh_token = params.get("refresh_token");
    const name = params.get("name");
    const userId = params.get("userid");
    const role = params.get("role");
    if (token && refresh_token) {
      sessionStorage.setItem("authToken", token);
      cookieMethods.setCookies(token, refresh_token);
      // Store user info if needed
      sessionStorage.setItem("username", name);
      sessionStorage.setItem("userId", userId);
      setTimeout(() => {
        switch (role) {
          case "user":
            navigate(`/dashboard/onboard?user=${userId}`);
            break;
          case "client":
            navigate("/profile");
            break;
          case "freelancer":
          default:
            navigate(base.CANDIDATE_PRE);
            break;
        }
      }, 800);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1>Processing LinkedIn Callback...</h1>
    </div>
  );
};

export default LinkedInCallback;
