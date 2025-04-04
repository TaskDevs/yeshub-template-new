// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, REACT_BASE_URL } from "../../../globals/constants";

// ADD Freelance
export const addFreelance = async (data) => {
  try {
    let responseOnAddFreelance = await axios.post(
     `${REACT_BASE_URL}create-freelance`,
      data
    );
    return responseOnAddFreelance;
    // if (responseOnAddFreelance.status === SUCCESS_STATUS) {
    //   return responseOnAddFreelance.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Freelance
export const searchFreelance = async () => {
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
export const freelanceList = async () => {
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
    let responseOnFreelanceProfile = await axios.get(`${REACT_BASE_URL}get-freelance/${id}`);

    return responseOnFreelanceProfile;
    // if (responseOnFreelanceProfile.status === SUCCESS_STATUS) {
    //   return responseOnFreelanceProfile.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Freelance
export const updateFreelance = async (id, data) => {
  try {
    let responseOnUpdateFreelance = await axios.put(`${REACT_BASE_URL}update-freelance/${id}`, data);
    return responseOnUpdateFreelance;
    // if (responseOnUpdateFreelance.status === SUCCESS_STATUS) {
    //   return responseOnUpdateFreelance.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Freelance
export const deleteFreelance = async (id) => {
  try {
    let responseOnDeleteFreelance = await axios.delete(`${REACT_BASE_URL}delete-freelance/${id}`);
    if (responseOnDeleteFreelance.status === SUCCESS_STATUS) {
      return responseOnDeleteFreelance.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};



export const freelanceResponse = async (formData) => {
  try {
    let responseFreelance = await axios.post(`${REACT_BASE_URL}freelancer-responses`, formData);

    if (responseFreelance?.data) {
      return responseFreelance.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error in freelanceResponse:", err);
    return false;
  }
};
