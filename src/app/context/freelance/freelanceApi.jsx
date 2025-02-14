// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Freelance
export const addFreelance = async (data) => {
  try {
    let responseOnAddFreelance = await axios.post(
      {
        /**Add Create Freelance API URL here**/
      },
      data
    );
    if (responseOnAddFreelance.status === SUCCESS_STATUS) {
      return responseOnAddFreelance.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Freelance
export const searchFreelance = async (data) => {
  try {
    let responseOnSearchFreelance = await axios.get({
      /**Add Search Employer API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchFreelance.status === SUCCESS_STATUS) {
      return responseOnSearchFreelance.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Freelance
export const freelanceList = async (pageNo) => {
  try {
    let responseOnFreelanceList = await axios.get({
      /**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnFreelanceList.status === SUCCESS_STATUS) {
      return responseOnFreelanceList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Freelance
export const freelanceProfile = async (id) => {
  try {
    let responseOnFreelanceProfile = await axios.get({
      /**Add View History API URL here like ${URL}api/getEmployerProfile/${id}**/
    });

    if (responseOnFreelanceProfile.status === SUCCESS_STATUS) {
      return responseOnFreelanceProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Freelance
export const updateFreelance = async (data) => {
  try {
    let responseOnUpdateFreelance = await axios.put({
      /**Add Update History API URL here like  `${URL}api/updateEmployer/${data.id}` **/
    });
    if (responseOnUpdateFreelance.status === SUCCESS_STATUS) {
      return responseOnUpdateFreelance.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Freelance
export const deleteFreelance = async (data) => {
  try {
    let responseOnDeleteFreelance = await axios.delete({
      /**Add Delete Employer API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeleteFreelance.status === SUCCESS_STATUS) {
      return responseOnDeleteFreelance.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
