// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import { SUCCESS_STATUS, LIST_ON_PAGES, baseURL, baseUrl } from "../../../globals/constants";

// ADD Profile
export const addProfile = async (data) => {
  console.log("p-data", data)
  try {
    let responseOnAddProfile = await axios.post(
			`${baseURL}create-profile`,
			data
		);
  
    return responseOnAddProfile;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// SEARCH Profile
export const searchProfile = async (data) => {
  try {
    let responseOnSearchProfile = await axios.get({
      /**Add Search Profile API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchProfile.status === SUCCESS_STATUS) {
      return responseOnSearchProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Profile
export const profileList = async (id) => {
  try {
    let responseOnProfileList = await axios.get({
      /**Add Get Profile API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnProfileList.status === SUCCESS_STATUS) {
      return responseOnProfileList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};


// VIEW Profile
 /**Add View History API URL here like ${URL}api/getEmployerProfile/${id}**/
export const profileProfile = async (id) => {
  try {
    let responseOnProfile = await axios.get(
      `${baseURL}get-profile/${id}`
      
    );
    console.log(responseOnProfile)
    return responseOnProfile;
  
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Profile
/**Add Update Profile API URL here like  `${URL}api/updateProfile/${data.id}` **/
export const updateProfile = async (id, data) => {
  try {
    let responseOnUpdateProfile = await axios.put(
			
      `${baseURL}update-profile/${id}`,
      data
		);
   return responseOnUpdateProfile;
  } catch (err) {
    console.log(err);
  }
};

// DELETE Profile
export const deleteProfile = async (id) => {
  try {
    let responseOnDeleteProfile = await axios.delete(	
			`${baseURL}delete-profile/${id}`
		);
   return responseOnDeleteProfile;
  } catch (err) {
    console.error(err);
  }
};
