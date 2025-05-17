import axios from "../../../utils/axios.config";

import cookieMethods from "../../../utils/cookieUtils";

// Manual Login

export const login = async (data) => {
  try {
    let responseOnLogin = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/login`,
      data
    );

    const { username, user_id, email } = responseOnLogin.data;

    // Store necessary user info in sessionStorage
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("email", email);

    return {
      success: true,
      message: responseOnLogin.data.message || "Login successful!",
      data: responseOnLogin.data, // Return token, refresh_token, role, etc.
    };
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);

    return {
      success: false,
      message: err.response?.data?.message || "Invalid credentials",
      errors: err.response?.data?.errors || {}, // Validation errors
    };
  }
};

//Manual Register

export const register = async (data) => {
  try {
    let responseOnRegister = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/register`,
      data
    );

    console.log("Registration success:", responseOnRegister.data);

    return {
      success: true,
      message: responseOnRegister.data.message || "Registration successful!",
      data: responseOnRegister.data, // Return any additional data
    };
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);

    return {
      success: false,
      message:
        err.response?.data?.message || "An error occurred during registration.",
      errors: err.response?.data?.errors || {}, // Return validation errors
    };
  }
};

export const verifyOtp = async (data) => {
  try {
    let responseOnVerifyOtp = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/verify-otp`,
      data
    );

    if (responseOnVerifyOtp.status === 200) {
      return responseOnVerifyOtp.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const ResendOtp = async (data) => {
  try {
    let responseOnResendOtp = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/send-otp`,
      data
    );

    if (responseOnResendOtp.status === 200) {
      return responseOnResendOtp.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

//Retrieve Info

// Retrieve User Info
export const retrieve = async () => {
  try {
    let responseOnRetrieve = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/user`
    );

    return responseOnRetrieve;
    // if (responseOnRetrieve.status === SUCCESS_STATUS) {
    //   return responseOnRetrieve.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    return false;
  }
};

// Request Password Reset (Forgotten Password)
export const forgottenPassword = async (data) => {
  try {
    let responseForgottenPass = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/forgot-password`,
      data
    );

    if (
      responseForgottenPass.status === 200 ||
      responseForgottenPass.status === 201
    ) {
      return responseForgottenPass.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

// verify reste otp
export const VerifyReset = async (data) => {
  try {
    let responseOnVerifyResetOtp = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/verify-reset-otp`,
      data
    );

    if (responseOnVerifyResetOtp.status === 200) {
      // Check if the status is 200
      return responseOnVerifyResetOtp.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const updateUserRole = async (data) => {
  try {
    let response = await axios.put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/update-user-role`,
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
// Change Password
export const changePassword = async (data) => {
  try {
    let responseOnChangePassword = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/v1/change-password`,
      data
    );

    // Check the response message for success
    if (
      responseOnChangePassword.data.message === "Password reset successfully."
    ) {
      return { success: true, message: responseOnChangePassword.data.message };
    } else {
      return {
        success: false,
        message: responseOnChangePassword.data.message || "An error occurred",
      };
    }
  } catch (err) {
    return { success: false, message: "An error occurred. Please try again." };
  }
};

// export const loginWithGoogle = (data) => {
//   window.location.href = `${process.env.REACT_APP_BACKEND_HOST}/auth/google/redirect?role=${data}`;
// };

export const loginWithGoogle = () => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/google/redirect`;
  console.log("Redirecting to:", url); // Debugging
  window.location.href = url;
};

export const loginWithLinkedIn = async () => {
  window.location.href = `${process.env.REACT_APP_BACKEND_HOST}/auth/redirect/linkedin`;
};

// Logout
export const logout = async () => {
  try {
    let data = cookieMethods.getCookies();

    if (data.refreshToken) {
      let responseOnLogout = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/v1/logout`,
        { refresh_token: data.refreshToken }, // Send refresh token
        { headers: { Authorization: `Bearer ${data.accessToken}` } } // Send access token in headers
      );

      if (responseOnLogout.status === 200) {
        sessionStorage.removeItem("authToken");
        cookieMethods.deleteCookies(); // Clear cookies after successful logout
        return responseOnLogout.data;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
