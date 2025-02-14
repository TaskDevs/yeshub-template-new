// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Job
export const addJob = async (data) => {
  try {
    let responseOnAddJob = await axios.post(
      {
        /**Add Create Education API URL here**/
      },
      data
    );
    if (responseOnAddJob.status === SUCCESS_STATUS) {
      return responseOnAddJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Job
export const searchJob = async (data) => {
  try {
    let responseOnSearchJob = await axios.get({
      /**Add Search Employer API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchJob.status === SUCCESS_STATUS) {
      return responseOnSearchJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Job
export const jobList = async (pageNo) => {
  try {
    let responseOnJobList = await axios.get({
      /**Add Get Job API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnJobList.status === SUCCESS_STATUS) {
      return responseOnJobList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Job
export const jobProfile = async (id) => {
  try {
    let responseOnJobProfile = await axios.get({
      /**Add View Job API URL here like ${URL}api/getEmployerProfile/${id}**/
    });

    if (responseOnJobProfile.status === SUCCESS_STATUS) {
      return responseOnJobProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Job
export const updateJob = async (data) => {
  try {
    let responseOnUpdateJob = await axios.put({
      /**Add Update History API URL here like  `${URL}api/updateEmployer/${data.id}` **/
    });
    if (responseOnUpdateJob.status === SUCCESS_STATUS) {
      return responseOnUpdateJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Job
export const deleteJob = async (data) => {
  try {
    let responseOnDeleteJob = await axios.delete({
      /**Add Delete Employer API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeleteJob.status === SUCCESS_STATUS) {
      return responseOnDeleteJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
