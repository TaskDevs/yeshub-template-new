// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import { SUCCESS_STATUS, LIST_ON_PAGES, baseURL } from "../../../globals/constants";

// ADD Education
export const addEducation = async (data) => {
  try {
    let responseOnAddEducation = await axios.post(
      
      `${baseURL}create-education-profile`,
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
export const searchEducation = async (data) => {
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
export const educationList = async (pageNo) => {
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
			
			`${baseURL}get-education-profile/${id}`
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
			
      `${baseURL}update-education-profile/${id}`,
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
    `${baseURL}delete-education-profile/${id}`
    );
    return responseOnDeleteEducation;
    // if (responseOnDeleteEducation.status === SUCCESS_STATUS) {
    //   return responseOnDeleteEducation.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.error(err);
  }
};
