// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import {
  SUCCESS_STATUS,
  REACT_BASE_URL,
  LOCALHOST_BACKEND,
  LIST_ON_PAGES,
} from "../../../globals/constants";

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
export const getFreelanceList = async (pageNo) => {
  try {
    let responseOnFreelanceList = await axios.get(
      /**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
      `${REACT_BASE_URL}get-all-users?page=${
        pageNo || "1"
      }&perPage=${LIST_ON_PAGES}`
    );
    if (responseOnFreelanceList.status === 200) {
      console.log("freelancers:", responseOnFreelanceList.data);
      return responseOnFreelanceList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Get freelance stats
export const getFreelanceStats = async (id) => {
  try {
    let response = await axios.get(
      `${REACT_BASE_URL}get-freelance-stats/${id}`
    );
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getFreelanceNotification = async (id) => {
  try {
    let response = await axios.get(
      `${REACT_BASE_URL}get-freelance-notifications/${id}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//Get freelance projects
export const getFreelanceProjects = async (id) => {
  try {
    let response = await axios.get(
      `${REACT_BASE_URL}get-freelance-projects/${id}`
    );
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Get Project submissions
export const getProjectSubmissions = async (id, data) => {
  try {
    let response = await axios.get(
      `${REACT_BASE_URL}get-works-submitted?user_id=${id}&project_id=${data.project_id} `,
      data
    );
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

//Jobs Applied To
export const jobsAppliedTo = async (user_id, page_no) => {
  try {
    let responseOnApplyJob = await axios.get(
      `${LOCALHOST_BACKEND}get-jobs-applied-to?user_id=${user_id}&page_no=${page_no}`
    );
    if (responseOnApplyJob.status == 200) {
      return responseOnApplyJob.data;
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
    const response = await axios.get(`${REACT_BASE_URL}get-freelance/${id}`);
    console.log("API Response:", response);

    if (
      response.status === 200 &&
      response.data &&
      response.data.data
    ) {
      return response.data.data;
    } else {
      console.warn("Unexpected API response structure", response);
      return false;
    }
  } catch (error) {
    console.error("Error fetching freelance profile:", error);
    return false;
  }
};

// UPDATE Freelance
export const updateFreelance = async (id, data) => {
  try {
    let responseOnUpdateFreelance = await axios.put(
      `${REACT_BASE_URL}update-freelance/${id}`,
      data
    );
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
    let responseOnDeleteFreelance = await axios.delete(
      `${REACT_BASE_URL}delete-freelance/${id}`
    );
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
    let responseFreelance = await axios.post(
      `${REACT_BASE_URL}freelancer-responses`,
      formData
    );

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
