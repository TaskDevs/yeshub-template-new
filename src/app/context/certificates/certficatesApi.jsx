import axios from "axios";
import cookieMethods from "../../../utils/cookieUtils";

import {
	REACT_BASE_URL,
} from "../../../globals/constants";

// ADD Certificate
export const addCertificate = async (data) => {
  try {
    console.log('cert data: ',data)


    let authenticator = cookieMethods.getCookies();
    //console.log('auth: ',authenticator)

    if (authenticator.refreshToken) {
        let responseOnAddCertificate = await axios.post(
          `${REACT_BASE_URL}certificates`,
          data,
        );
  
        return responseOnAddCertificate;
      }


    
  } catch (err) {
    console.log(err);
    return false;
  }
};


// LIST Certificates
export const certificateList = async () => {
  try {
    let responseOnCertificateList = await axios.get(
			`${REACT_BASE_URL}certificates`
		);

    return responseOnCertificateList;
   
  } catch {
    
    return false;
  }
};


// VIEW Certificate
export const certificateView = async (id) => {
    try {
      let responseOnCertificateFind = await axios.get(
              `${REACT_BASE_URL}certificates/${id}`
          );
  
      return responseOnCertificateFind;
     
    } catch {
      
      return false;
    }
};


// UPDATE Certificate
export const updateCertificate = async (id, data) => {
  try {
    let responseOnUpdateCertificate = await axios.put(
			`${REACT_BASE_URL}certificates/${id}`,
			data
		);
    return responseOnUpdateCertificate;
   
  } catch  {
    return false;
  }
};


// DELETE Certificate
export const deleteCertificate = async (id) => {
  try {
    let responseOnDeleteCertificate = await axios.delete(
			`${REACT_BASE_URL}certificates/${id}`
		);
    return responseOnDeleteCertificate;
   
  } catch (err) {
    return false;
  }
};
