import axios from "../../../utils/axios.config"
import {SUCCESS_STATUS, BAD_REQUEST_STATUS} from '../../../globals/constants'


// Manual Login
export const login = async (data) => {
    console.log("Login function called with data:", data);
    try {
        let responseOnLogin = await axios.post(`${process.env.REACT_APP_BASE_URL}login`, data);
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
        let responseOnRegister = await axios.post(`${process.env.REACT_APP_BASE_URL}register`,data)
        if(responseOnRegister.status === SUCCESS_STATUS){
            return responseOnRegister.data
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
        return false
    }
}


export const verifyOtp = async (data) => {
    try {
       
        let responseOnVerifyOtp = await axios.post(`${process.env.REACT_APP_BASE_URL}verify-otp`, data);

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
       
        let responseOnResendOtp = await axios.post(`${process.env.REACT_APP_BASE_URL}send-otp`, data);

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
export const retrieve= async () => {
    try {
        let responseOnRetrieve = await axios.get(`${process.env.REACT_APP_BASE_URL}user`);
        
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
        
        if (responseForgottenPass.status === SUCCESS_STATUS) {
            return responseForgottenPass.data;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Forgotten Password Error:", err);
        return false;
    }
};

// Change Password
export const changePassword = async (data) => {
    try {
        let responseOnChangePassword = await axios.post(`${process.env.REACT_APP_BASE_URL}change-password`, data);
        
        if (responseOnChangePassword.status === SUCCESS_STATUS) {
            return responseOnChangePassword.data;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Change Password Error:", err);
        return false;
    }
};

export const loginWithGoogle = (data) => {
    window.location.href = `${process.env.REACT_APP_OAUTH_URL}/google/redirect?role=${data}`;
  };
  
  export const loginWithLinkedIn = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_OAUTH_URL}linkedin/callback`, { data });
      console.log(response.data.token);
      // Store the token and redirect
    } catch (error) {
      console.error("LinkedIn login failed", error);
    }
  };
  


// Logout 
export const logout = async () => {
    try {
        if(responseOnLogout.status === SUCCESS_STATUS){
            return responseOnLogout.data
        } else {
            return false
        }
    } catch (err){
        console.log(err)
    }
}


