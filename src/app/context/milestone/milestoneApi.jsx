// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Milestone
export const addMilestone = async (data) => {
  try {
    let responseOnAddMilestone = await axios.post(
      {
        /**Add Create Milestone API URL here**/
      },
      data
    );
    if (responseOnAddMilestone.status === SUCCESS_STATUS) {
      return responseOnAddMilestone.data;
    } else {
      return false;
    }
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
    if (responseOnSearchMilestone.status === SUCCESS_STATUS) {
      return responseOnSearchMilestone.data;
    } else {
      return false;
    }
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

    if (responseOnMilestoneList.status === SUCCESS_STATUS) {
      return responseOnMilestoneList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Milestone
export const milestoneProfile = async (id) => {
  try {
    let responseOnMilestoneProfile = await axios.get({
      /**Add View History API URL here like ${URL}api/getMilestoneProfile/${id}**/
    });

    if (responseOnMilestoneProfile.status === SUCCESS_STATUS) {
      return responseOnMilestoneProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Milestone
export const updateMilestone = async (data) => {
  try {
    let responseOnUpdateMilestone = await axios.put({
      /**Add Update Milestone API URL here like  `${URL}api/updateMilestone/${data.id}` **/
    });
    if (responseOnUpdateMilestone.status === SUCCESS_STATUS) {
      return responseOnUpdateMilestone.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Milestone
export const deleteMilestone = async (data) => {
  try {
    let responseOnDeleteMilestone = await axios.delete({
      /**Add Delete Milestone API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeleteMilestone.status === SUCCESS_STATUS) {
      return responseOnDeleteMilestone.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
