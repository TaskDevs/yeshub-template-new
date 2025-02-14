// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Profile
export const addProfile = async (data) => {
  try {
    let responseOnAddProfile = await axios.post(
      {
        /**Add Create Profile API URL here**/
      },
      data
    );
    if (responseOnAddProfile.status === SUCCESS_STATUS) {
      return responseOnAddProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
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
export const profileList = async (pageNo) => {
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
export const profileProfile = async (id) => {
  try {
    let responseOnProfile = await axios.get({
      /**Add View History API URL here like ${URL}api/getEmployerProfile/${id}**/
    });

    if (responseOnProfile.status === SUCCESS_STATUS) {
      return responseOnProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Profile
export const updateProfile = async (data) => {
  try {
    let responseOnUpdateProfile = await axios.put({
      /**Add Update Profile API URL here like  `${URL}api/updateProfile/${data.id}` **/
    });
    if (responseOnUpdateProfile.status === SUCCESS_STATUS) {
      return responseOnUpdateProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Profile
export const deleteProfile = async (data) => {
  try {
    let responseOnDeleteProfile = await axios.delete({
      /**Add Delete Profile API URL here like  `/api/deleteProfile/${data}` **/
    });
    if (responseOnDeleteProfile.status === SUCCESS_STATUS) {
      return responseOnDeleteProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
