// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD APPLICATION
export const addApplication = async (data) => {
  try {
    let responseOnAddApplication = await axios.post(
      {
        /**Add Create Application API URL here**/
      },
      data
    );
    if (responseOnAddApplication.status === SUCCESS_STATUS) {
      return responseOnAddApplication.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH APPLICATION
export const searchApplication = async (data) => {
  try {
    let responseOnSearchApplication = await axios.get({
      /**Add Search Application API URL here like /searchApplication?keyword=${data}**/
    });
    if (responseOnSearchApplication.status === SUCCESS_STATUS) {
      return responseOnSearchApplication.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST APPLICATION
export const applicationList = async (pageNo) => {
  try {
    let responseOnApplicationList = await axios.get({
      /**Add Get Application API URL here like /api/getApplication?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnApplicationList.status === SUCCESS_STATUS) {
      return responseOnApplicationList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW AN APLLICATION
export const applicationProfile = async (id) => {
  try {
    let responseOnApplicationProfile = await axios
      .get
      /**Add View Application API URL here like ${URL}api/getClassesForSchool/${id}**/
      ();

    if (responseOnApplicationProfile.status === SUCCESS_STATUS) {
      return responseOnApplicationProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE APPLICATION
export const updateApplication = async (data) => {
  try {
    let responseOnUpdateApplication = await axios.put({
      /**Add Update Application API URL here like  `${URL}api/updateApplication/${data.id}` **/
    });
    if (responseOnUpdateApplication.status === SUCCESS_STATUS) {
      return responseOnUpdateApplication.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE APPLICATION
export const deleteApplication = async (data) => {
  try {
    let responseOnDeleteApplication = await axios.delete({
      /**Add Delete Application API URL here like  `/api/deleteBook/${data}` **/
    });
    if (responseOnDeleteApplication.status === SUCCESS_STATUS) {
      return responseOnDeleteApplication.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
