// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import {
  REACT_BASE_URL,
  SUCCESS_STATUS,
  LIST_ON_PAGES,
} from "../../../globals/constants";

// ADD Job
export const addJob = async (data) => {
  try {
    let responseOnAddJob = await axios.post(
      `${REACT_BASE_URL}posted-jobs`,
      data
    );
    if (responseOnAddJob.status == SUCCESS_STATUS) {
      return responseOnAddJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// LIST Job
export const jobList = async (pageNo) => {
  try {
    let responseOnJobList = await axios.get(
      `${REACT_BASE_URL}get-posted-jobs?pageNo=${
        pageNo ? pageNo : 1
      }&perPage=${LIST_ON_PAGES}`
    );
    if (responseOnJobList.status == 200) {
      console.log(responseOnJobList);
      return responseOnJobList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const searchJob = async (data, pageNo) => {
  try {
    //console.log(keywords);
    let response = await axios.get(
      `${REACT_BASE_URL}jobs-search?pageNo=${
        pageNo ? pageNo : 1
      }&perPage=${LIST_ON_PAGES}&job-category=${data.job_category}&job-type=${
        data.job_type
      }&location=${data.location}`
    );
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return false;
  }
};

export const searchJobByTitle = async (data, pageNo) => {
  try {
    let response = await axios.get(
      `${REACT_BASE_URL}jobs-search-by-title?jobTitle=${data}&pageNo=${
        pageNo ? pageNo : 1
      }&perPage=${LIST_ON_PAGES}`
    );
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return false;
  }
};

// LIST Employer Jobs Posted
export const employerJobList = async (id) => {
  try {
    let responseOnEmployerJobList = await axios.get(
      `${REACT_BASE_URL}employers-posted-jobs/${id}`
    );

    if (responseOnEmployerJobList.status == 200) {
      return responseOnEmployerJobList.data.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Count the employer
export const countEmployerJobsPosted = async (id) => {
  try {
    let responseOnCountEmployerJobsPosted = await axios.get(
      `${REACT_BASE_URL}count-posted-jobs/${id}`
    );

    if (responseOnCountEmployerJobsPosted.status == 200) {
      return responseOnCountEmployerJobsPosted.data.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const countApplications = async (id) => {
  try {
    let responseOnCountApplications = await axios.get(
      `${REACT_BASE_URL}applications/count/${id}`
    );

    if (responseOnCountApplications.status == 200) {
      return responseOnCountApplications.data.total_applications;
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
    let responseOnJobProfile = await axios.get(
      `${REACT_BASE_URL}posted-jobs/${id}`
    );

    return responseOnJobProfile.data;
    // if (responseOnJobProfile.status === SUCCESS_STATUS) {
    //   return responseOnJobProfile.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Job
export const updateJob = async () => {
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
export const deleteJob = async (id) => {
  try {
    let responseOnDeleteJob = await axios.delete(
      `${REACT_BASE_URL}posted-jobs/${id}`
    );
    if (responseOnDeleteJob.status === SUCCESS_STATUS) {
      return responseOnDeleteJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
