import { formType } from "../../globals/constants";

function processLogin(formData, result) {

    if(isValid(formData.email) && isValid(formData.password)) {
        if(formData.type === formType.LOGIN_CANDIDATE) {
            result(formData.email === "guest@gmail.com" && formData.password === "12345");
        } else if(formData.type === formType.LOGIN_EMPLOYER) {
            result(formData.username === "admin@gmail.com" && formData.password === "12345");
        }
    }
}

function isValid(value) {
    return value !== undefined 
    && value !== null 
    && value !== "";
}

export default processLogin;