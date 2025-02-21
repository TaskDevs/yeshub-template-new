import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, BAD_REQUEST_STATUS } from "../../../globals/constants";import cookieMethods from "../../../utils/cookieUtils";


// Manual Login
export const login = async (data) => {
  console.log("Login function called with data:", data);
  try {
    let responseOnLogin = await axios.post(
      `${process.env.REACT_APP_BASE_URL}login`,
      data
    );
    console.log("Response received:", responseOnLogin); // Check the response

    if (responseOnLogin.status === SUCCESS_STATUS) {
      return responseOnLogin.data;
    } else {
      console.log("Unexpected response status:", responseOnLogin.status);
      return false;
    }
  } catch (err) {
    console.error("Login error:", err); // Print the error
    return false;
  }
};

//Manual Register
export const register = async (data) => {
  try {
    let responseOnRegister = await axios.post(
      `${process.env.REACT_APP_BASE_URL}register`,
      data
    );
    if (responseOnRegister.status === SUCCESS_STATUS) {
      return responseOnRegister.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const verifyOtp = async (data) => {
  try {
    let responseOnVerifyOtp = await axios.post(
      `${process.env.REACT_APP_BASE_URL}verify-otp`,
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
      `${process.env.REACT_APP_BASE_URL}send-otp`,
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


export const googleLogin = async ()=>{
    try{
        
    }catch(err){

    }
}

//Retrieve Info

// Retrieve User Info
export const retrieve = async () => {
  try {
    let responseOnRetrieve = await axios.get(
      `${process.env.REACT_APP_BASE_URL}user`
    );

    if (responseOnRetrieve.status === SUCCESS_STATUS) {
      return responseOnRetrieve.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Retrieve User Error:", err);
    return false;
  }
};

// Request Password Reset (Forgotten Password)
export const forgottenPassword = async (data) => {
    try {
        let responseForgottenPass = await axios.post(`${process.env.REACT_APP_BASE_URL}forgot-password`, data);
        
        console.log("Forgot Password API Response:", responseForgottenPass);

        if (responseForgottenPass.status === 200 || responseForgottenPass.status === 201) { 
            return responseForgottenPass.data;
        } else {
            console.error("Unexpected API response:", responseForgottenPass);
            return false;
        }
    } catch (err) {
        console.error("Forgotten Password API Error:", err.response ? err.response.data : err.message);
        return false;
    }
};


// verify reste otp
export const VerifyReset = async (data) => {
    try {
        let responseOnVerifyResetOtp = await axios.post(`${process.env.REACT_APP_BASE_URL}verify-reset-otp`, data);
        console.log("API Status:", responseOnVerifyResetOtp.status); // Log the status code

        if (responseOnVerifyResetOtp.status === 200) { // Check if the status is 200
            return responseOnVerifyResetOtp.data;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Error:", err);
        return false;
    }
};

// Change Password
export const changePassword = async (data) => {
    try {
      let responseOnChangePassword = await axios.post(
        `${process.env.REACT_APP_BASE_URL}change-password`,
        data
      );
  
      console.log("API Response Status:", responseOnChangePassword.status);  // Log the status
      console.log("API Response Data:", responseOnChangePassword.data);      // Log the response data
  
      // Check the response message for success
      if (responseOnChangePassword.data.message === 'Password reset successfully.') {
        return { success: true, message: responseOnChangePassword.data.message };
      } else {
        return { success: false, message: responseOnChangePassword.data.message || 'An error occurred' };
      }
    } catch (err) {
      console.error("Change Password Error:", err);
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };
  
  

export const loginWithGoogle = (data) => {
  window.location.href = `${process.env.REACT_APP_OAUTH_URL}/google/redirect?role=${data}`;
};

export const loginWithLinkedIn = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_OAUTH_URL}linkedin/callback`,
      { data }
    );
    console.log(response.data.token);
    // Store the token and redirect
  } catch (error) {
    console.error("LinkedIn login failed", error);
  }
};

// Logout
export const logout = async () => {
    try {
        let data = cookieMethods.getCookies();
        console.log("Tokens before logout:", data);
        
        if (data.refreshToken) {
            let responseOnLogout = await axios.post(
                `${process.env.REACT_APP_BASE_URL}logout`, 
                { refresh_token: data.refreshToken },  // Send refresh token
                { headers: { Authorization: `Bearer ${data.accessToken}` } }  // Send access token in headers
            );

            if (responseOnLogout.status === 200) {
                sessionStorage.removeItem("authToken")
                cookieMethods.deleteCookies();  // Clear cookies after successful logout
                return responseOnLogout.data;
            } else {
                console.log("Logout response not 200:", responseOnLogout);
                return false;
            }
        } else {
            console.log("No refresh token available");
            return false;
        }
    } catch (err) {
        console.error("Logout error:", err);
    }
};

  




