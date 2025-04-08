// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import { SUCCESS_STATUS, REACT_BASE_URL } from "../../../globals/constants";

// ADD Profile
export const addProfile = async (data) => {
  try {
    let responseOnAddProfile = await axios.post(
      `${REACT_BASE_URL}create-profile`,
      data
    );

    return responseOnAddProfile;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const addCv = async (data) => {
  try {
    let responseOnAddCv = await axios.post(
      `${REACT_BASE_URL}user-cvs`,
      data
    );

    return responseOnAddCv;
  } catch (err) {
    console.log(err);
  }
};

// SEARCH Profile
export const searchProfile = async () => {
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

export const updateUserLogo = async (id, data) => {
  try {
    let responseOnUpdateUser = await axios.put(
      `${REACT_BASE_URL}upload/user-logo/${id}`,
      data
    );
    console.log(responseOnUpdateUser);
    return responseOnUpdateUser.data;
    // if (responseOnUpdateUser.status == 200) {
    //   return responseOnUpdateUser.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
  }
};

// LIST Profile
/**Add Get Profile API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
export const profileList = async () => {
  try {
    let responseOnProfileList = await axios.get(
      `${REACT_BASE_URL}get-all-users`
    );

    return responseOnProfileList.data;
    // if (responseOnProfileList.status === SUCCESS_STATUS) {
    //   return responseOnProfileList.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Profile  get-profile  `user-full-info/1`
/**Add View History API URL here like ${URL}api/getEmployerProfile/${id}**/
export const profileProfile = async (id) => {
  try {
    let responseOnProfile = await axios.get(
      `${REACT_BASE_URL}get-profile/${id}`
    );
    return responseOnProfile;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fullProfileProfile = async (id) => {
  try {
    let responseOnProfile = await axios.get(
      `${REACT_BASE_URL}user-full-info/${id}`
    );
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
      `${REACT_BASE_URL}update-profile/${id}`,
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
      `${REACT_BASE_URL}delete-profile/${id}`
    );
    return responseOnDeleteProfile;
  } catch (err) {
    console.error(err);
  }
};

// /user-full-info/1
