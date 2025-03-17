import axios from "axios";
import { REACT_BASE_URL } from "../../../globals/constants";

// ADD Milestone
export const addMilestone = async (data) => {
  try {
    let responseOnAddMilestone = await axios.post(
			`${REACT_BASE_URL}create-milestone`,
			data
		);
    return responseOnAddMilestone;
   
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Milestone
export const searchMilestone = async () => {
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
export const milestoneList = async (id) => {
  try {
    let responseOnMilestoneList = await axios.get(`${REACT_BASE_URL}get-milestone/user_id/${id}`);
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
    let responseOnMilestoneProfile = await axios.get(`${REACT_BASE_URL}get-milestone/${id}`);

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
			`${REACT_BASE_URL}update-milestone/${id}`,
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
			`${REACT_BASE_URL}delete-milestone/${id}`
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
