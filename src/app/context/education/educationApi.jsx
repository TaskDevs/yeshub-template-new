// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import { SUCCESS_STATUS, REACT_BASE_URL } from "../../../globals/constants";

// ADD Education
export const addEducation = async (data) => {
  try {
    let responseOnAddEducation = await axios.post(
      
      `${REACT_BASE_URL}create-education-profile`,
      data
    );
    // if (responseOnAddEducation.status === SUCCESS_STATUS) {
    //   return responseOnAddEducation.data;
    // } else {
    //   return false;
    // }
    return responseOnAddEducation;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Education
export const searchEducation = async () => {
  try {
    let responseOnSearchEducation = await axios.get({
      /**Add Search Category API URL here like /searchEducation?keyword=${data}**/
    });
    if (responseOnSearchEducation.status === SUCCESS_STATUS) {
      return responseOnSearchEducation.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Education
export const educationList = async () => {
  try {
    let responseOnEducationList = await axios.get({
      /**Add Get Category API URL here like /api/getEducation?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnEducationList.status === SUCCESS_STATUS) {
      return responseOnEducationList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Education
export const educationProfile = async (id) => {
  try {
    let responseOnEducationProfile = await axios.get(
			
			`${REACT_BASE_URL}get-education-profile/${id}`
    );
    return responseOnEducationProfile;

    // if (responseOnEducationProfile.status === SUCCESS_STATUS) {
    //   return responseOnEducationProfile.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE EDUCATION
export const updateEducation = async (id, data) => {
  try {
    let responseOnUpdateEducation = await axios.put(
			
      `${REACT_BASE_URL}update-education-profile/${id}`,
      data
    );
    return responseOnUpdateEducation;
    // if (responseOnUpdateEducation.status === SUCCESS_STATUS) {
    //   return responseOnUpdateEducation.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
  }
};

// DELETE EDUCATION
export const deleteEducation = async (id) => {
  try {
    let responseOnDeleteEducation = await axios.delete(
    `${REACT_BASE_URL}delete-education-profile/${id}`
    );
    return responseOnDeleteEducation;
    
  } catch (err) {
    console.error(err);
  }
};
