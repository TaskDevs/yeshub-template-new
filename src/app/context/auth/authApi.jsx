import axios from "../../../utils/axios.config"
import {SUCCESS_STATUS, BAD_REQUEST_STATUS} from '../../../globals/constants'


// Manual Login
export const login = async (data) => {
    try {
        let responseOnLogin = await axios.post("login", data)
        if(responseOnLogin.status === SUCCESS_STATUS){
            return responseOnLogin.data
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

//Manual Register
export const register = async (data) => {
    try {
        let responseOnRegister = await axios.post("register", data)
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

//Retrieve Info
export const retrieve = async () => {
    try {
        let responseOnRetrieve = await axios.get("/retrieve")
            if(responseOnRetrieve.status === SUCCESS_STATUS){
                return responseOnRetrieve.data
            } else {
                return false
            }
    } catch (err){
        console.log(err)
    }
}


// Change Password Info 
export const changePassword = async () => console.log("Not yet implemented")


// Logout 
export const logout = async () => {
    try {
        if("responseOnLogout.status" === SUCCESS_STATUS){
            return "responseOnLogout.data"
        } else {
            return false
        }
    } catch (err){
        console.log(err)
    }
}


