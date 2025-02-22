// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import {
	SUCCESS_STATUS,
	LIST_ON_PAGES,
	baseURL,
} from "../../../globals/constants";

// ADD Milestone
export const addMilestone = async (data) => {
  try {
    let responseOnAddMilestone = await axios.post(
			`${baseURL}create-milestone`,
			data
		);
    return responseOnAddMilestone;
    // if (responseOnAddMilestone.status === SUCCESS_STATUS) {
    //   return responseOnAddMilestone.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Milestone
export const searchMilestone = async (data) => {
  try {
    let responseOnSearchMilestone = await axios.get({
      /**Add Search Milestone API URL here like /searchEmployer?keyword=${data}**/
    });
     return responseOnSearchMilestone;
  } catch (err) {
    console.log(err);
  }
};

// LIST Milestone
export const milestoneList = async (pageNo) => {
  try {
    let responseOnMilestoneList = await axios.get({
      /**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });
     return responseOnMilestoneList;
    // if (responseOnMilestoneList.status === SUCCESS_STATUS) {
    //   return responseOnMilestoneList.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Milestone
export const milestoneProfile = async (id) => {
  try {
    let responseOnMilestoneProfile = await axios.get(`${baseURL}get-milestone/${id}`);

    return responseOnMilestoneProfile
    // if (responseOnMilestoneProfile.status === SUCCESS_STATUS) {
    //   return responseOnMilestoneProfile.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Milestone
export const updateMilestone = async (id, data) => {
  try {
    let responseOnUpdateMilestone = await axios.put(
			`${baseURL}update-milestone/${id}`,
      data
		);
    return responseOnUpdateMilestone;
    // if (responseOnUpdateMilestone.status === SUCCESS_STATUS) {
    //   return responseOnUpdateMilestone.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Milestone
export const deleteMilestone = async (id) => {
  try {
    let responseOnDeleteMilestone = await axios.delete(
			`${baseURL}delete-milestone/${id}`
		);
    return responseOnDeleteMilestone;
    // if (responseOnDeleteMilestone.status === SUCCESS_STATUS) {
    //   return responseOnDeleteMilestone.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.error(err);
  }
};
