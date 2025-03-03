// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import { REACT_BASE_URL } from "../../../globals/constants";

// ADD APPLICATION
export const addApplication = async (data) => {
  try {
    let responseOnAddApplication = await axios.post(
			`${REACT_BASE_URL}create-job-application`,
			data
		);
    return responseOnAddApplication;
    // if (responseOnAddApplication.status === SUCCESS_STATUS) {
    //   return responseOnAddApplication.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};



// LIST APPLICATION
export const applicationList = async (id) => {
  try {
    let responseOnApplicationList = await axios.get(
			`${REACT_BASE_URL}get-job-application-by-job-id/${id}`
		);
    return responseOnApplicationList;

    // if (responseOnApplicationList.status === SUCCESS_STATUS) {
    //   return responseOnApplicationList.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};


export const getAppliedJbsByEmpid = async (id) => {
  try {
    const response = await axios.get(`${REACT_BASE_URL}get-job-applicants-by-emp/${id}`);
    
    // ✅ Return only the data, not the full response object
    return response.data;
  } catch (err) {
    console.error("Error fetching job applications:", err);
    return false; // Return false if the request fails
  }
};


export const getAppliedJbsByJobid = async (id) => {
  try {
    const response = await axios.get(`${REACT_BASE_URL}get-job-application-by-job-id/${id}`);
    
    // ✅ Return only the data, not the full response object
    return response.data;
  } catch (err) {
    console.error("Error fetching job applications:", err);
    return false; // Return false if the request fails
  }
};
// VIEW AN APLLICATION
export const applicationProfile = async (id) => {
  try {
    let responseOnApplicationProfile = await axios.get(
			`${REACT_BASE_URL}get-job-application-by-user-id/${id}`
		);

    return responseOnApplicationProfile;
    // if (responseOnApplicationProfile.status === SUCCESS_STATUS) {
    //   return responseOnApplicationProfile.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE APPLICATION
export const updateApplication = async (id, data) => {
  try {
    let responseOnUpdateApplication = await axios.put(
			`${REACT_BASE_URL}update-job-application/${id}`,
			data
		);
    return responseOnUpdateApplication;
    // if (responseOnUpdateApplication.status === SUCCESS_STATUS) {
    //   return responseOnUpdateApplication.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
  }
};

// DELETE APPLICATION
export const deleteApplication = async (id) => {
  try {
    let responseOnDeleteApplication = await axios.delete(
			`${REACT_BASE_URL}delete-job-application/${id}`
		);
    return responseOnDeleteApplication;
    // if (responseOnDeleteApplication.status === SUCCESS_STATUS) {
    //   return responseOnDeleteApplication.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.error(err);
  }
};



