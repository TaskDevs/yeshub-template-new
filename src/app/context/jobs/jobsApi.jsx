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

// Apply for job
export const applyForJob = async (data) => {
  try {
    let responseOnApplyForJob = await axios.post(
      `${REACT_BASE_URL}apply-for-job`,
      data
    );
    if (responseOnApplyForJob.status == SUCCESS_STATUS) {
      return responseOnApplyForJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const AllJoblist = async (data = {}) => {
  try {
    const response = await axios.get(`${REACT_BASE_URL}get-posted-jobs`, {
      params: data,
    });
    return response?.data ?? {};
  } catch (error) {
    console.error("Error fetching job list:", error);
    return {
      data: [],
      current_page: 1,
      last_page: 1,
      total: 0,
    };
  }
};

// export const AllJoblist = async (data = {}) => {
//   try {
//     const response = await axios.get(`${REACT_BASE_URL}get-posted-jobs`, {
//       params: data,
//     });
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// };

// job by id
export const JobById = async (id) => {
  try {
    const response = await axios.get(`${REACT_BASE_URL}posted-jobs/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
// LIST Job
export const jobList = async (pageNo, userId) => {
  try {
    let responseOnJobList = await axios.get(
      `${REACT_BASE_URL}get-new-jobs?pageNo=${
        pageNo ? pageNo : 1
      }&perPage=${LIST_ON_PAGES}&user_id=${userId}`
    );
    if (responseOnJobList.status == 200) {
      console.log("job data", responseOnJobList);
      return responseOnJobList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const changeJobStatus = async (id, data) => {
  try {
    let responseOnJobStatus = await axios.put(
      `${REACT_BASE_URL}change-post-job-status/${id}`,
      data
    );
    if (responseOnJobStatus.status == 200) {
      return responseOnJobStatus.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const jobCompanyInfo = async (id) => {
  try {
    let responseOnJobInfo = await axios.get(
      `${REACT_BASE_URL}get-posted-jobs-info/${id} `
    );
    console.log(responseOnJobInfo);
    return responseOnJobInfo;
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
      return responseOnEmployerJobList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const employerJobById = async (id) => {
  try {
    const response = await axios.get(`${REACT_BASE_URL}posted-user-jobs/${id}`);
    return response.data;
  } catch (err) {
    console.log("API error:", err);
    return false;
  }
};

export const JobInvitation = async (data) => {
  try {
    const response = await axios.post(`${REACT_BASE_URL}post-invitation`, data);
    return response.data;
  } catch (err) {
    console.log("API error:", err);
    return false;
  }
};

// services/invitationApi.js
export const fetchFreelancerInvitations = async (userId) => {
  try {
    const response = await axios.get(
      `${REACT_BASE_URL}get-freelancer-invites`,
      {
        params: { id: userId },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching invitations:", err);
    return { status: "error", data: [] };
  }
};

export const updateInvitationStatus = async (invitation_id, status) => {
  try {
    const response = await axios.post(
      `${REACT_BASE_URL}update-invitation-status`,
      {
        invitation_id,
        status,
      }
    );
    return response.data;
  } catch (err) {
    console.error("Status update error:", err);
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
    console.log(responseOnJobProfile.data);
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
