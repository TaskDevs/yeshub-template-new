// if issues arise with axios import basic_url and import axios from original source from constant
//import axios from "../../../utils/axios.config";
import axios from "axios";
import { SUCCESS_STATUS, REACT_BASE_URL } from "../../../globals/constants";

// ADD Employer
export const addEmployer = async (data) => {
  try {
    let responseOnAddEmployer = await axios.post(
      `${REACT_BASE_URL}create-employers`,
      data
    );
    if (responseOnAddEmployer.status === SUCCESS_STATUS) {
      return responseOnAddEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addCertification = async (data) => {
  console.log(data);
  try {
    let responseOnAddCertification = await axios.post(
      `${REACT_BASE_URL}store-certification`,
      data
    );

    if (responseOnAddCertification.status === SUCCESS_STATUS) {
      return responseOnAddCertification.data;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addExperience = async (data) => {
  //console.log(data);
  try {
    let responseOnAddExperience = await axios.post(
      `${REACT_BASE_URL}store-experience`,
      data
    );

    if (responseOnAddExperience.status === SUCCESS_STATUS) {
      return responseOnAddExperience.data;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addJobPost = async (data) => {
  try {
    let responseOnAddJobPost = await axios.post(
      `${REACT_BASE_URL}create-job`,
      data
    );
    if (responseOnAddJobPost.status === SUCCESS_STATUS) {
      return responseOnAddJobPost.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProjects = async (id) => {
  try {
    let responseOnGetAllProjects = await axios.get(
      `${REACT_BASE_URL}user-projects/${id}`
    );
    if (responseOnGetAllProjects.status === 200) {
      return responseOnGetAllProjects.data;
    }
  } catch (err) {
    console.log(err);
  }
};

//Getting projectsId to listen
export const getClientProjects = async (id) => {
  //console.log(id);
  try {
    let response = await axios.get(
      `${REACT_BASE_URL}get-client-projects/${id}`
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

export const getProposalInfo = async (id) => {
  try {
    let response = await axios.get(`${REACT_BASE_URL}get-a-proposal/${id}`);
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

export const createProject = async (data) => {
  try {
    let responseOnCreateProject = await axios.post(
      `${REACT_BASE_URL}create-project`,
      data
    );
    if (responseOnCreateProject.status === SUCCESS_STATUS) {
      return responseOnCreateProject.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const manageProject = async (data) => {
  try {
    let responseOnManageProject = await axios.post(
      `${REACT_BASE_URL}manage-project`,
      data
    );
    //console.log(responseOnManageProject);
    if (responseOnManageProject.status === 200) {
      return responseOnManageProject.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const projectInfoData = async (id) => {
  try {
    let responseOnProjectInfo = await axios.get(
      `${REACT_BASE_URL}project-management-info/${id}`
    );
    //console.log(responseOnProjectInfo);
    if (responseOnProjectInfo.status === 200) {
      return responseOnProjectInfo.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProjectChat = async (id) => {
  let response = await axios.get(`${REACT_BASE_URL}get-project-chat/${id}`);
  if (response.status == 200) {
    return response.data;
  } else {
    return false;
  }
};

export const sendGroupChat = async (data) => {
  let response = await axios.post(`${REACT_BASE_URL}project-chat`, data);
  if (response.status == SUCCESS_STATUS) {
    return response.data;
  } else {
    return false;
  }
};

export const setInterview = async (data) => {
  try {
    let responseOnSetInterview = await axios.post(
      `${REACT_BASE_URL}create-interview`,
      data
    );
    if (responseOnSetInterview.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getInterviewInfo = async (id) => {
  try {
    let responseOnGetInterviewInfo = await axios.get(
      `${REACT_BASE_URL}get-interview-info?id=${id}`
    );
    if (responseOnGetInterviewInfo.status == 200) {
      return responseOnGetInterviewInfo.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getHiredApplicants = async (id) => {
  console.log(`hired applicant employerId ${id}`);
  try {
    let responseOngetHiredApplicants = await axios.get(
      `${REACT_BASE_URL}get-hired-applicants/${id}`
    );
    if (responseOngetHiredApplicants.status == 200) {
      return responseOngetHiredApplicants.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const changeCandidateStatus = async (data, id) => {
  try {
    let responseOnChangeStatus = await axios.put(
      `${REACT_BASE_URL}update-candidate-status/${id}`,
      data
    );
    // console.log(responseOnChangeStatus);
    if (responseOnChangeStatus.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const hireCandidate = async (data, id) => {
  try {
    let responseOnHireCandidate = await axios.post(
      `${REACT_BASE_URL}hire-candidate/${id}`,
      data
    );
    if (responseOnHireCandidate.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// SEARCH Employer
export const searchEmployer = async () => {
  try {
    let responseOnSearchEmployer = await axios.get({
      /**Add Search Employer API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchEmployer.status === SUCCESS_STATUS) {
      return responseOnSearchEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// Check if company or employer exist
export const checkIfCompanyExist = async (data) => {
  try {
    let responseCheckIfCompanyExist = await axios.get(
      `${REACT_BASE_URL}check-employer-exist?company-name=${data}`
    );
    return responseCheckIfCompanyExist;
  } catch (err) {
    console.log(err);
  }
};

export const getCompanyInfoForInvoice = async (data) => {
  try {
    let responseOnCompanyInfoForInvoice = await axios.get(
      `${REACT_BASE_URL}company-invoice-details?company-name=${data}`,
      data
    );
    return responseOnCompanyInfoForInvoice;
  } catch (err) {
    console.log(err);
  }
};

export const getCompanyPostedJobs = async (id) => {
  try {
    let responseOnCompanyPostedJobs = await axios.get(
      `${REACT_BASE_URL}get-company-posted-jobs/${id}`
    );
    // console.log(responseOnCompanyPostedJobs);
    return responseOnCompanyPostedJobs.data;
  } catch (err) {
    console.log(err);
  }
};

export const getApplicantsOfJobPosted = async (id) => {
  try {
    let responseOnGetApplicants = await axios.get(
      `${REACT_BASE_URL}get-applicants-for-job/${id}`
    );
    return responseOnGetApplicants;
  } catch (err) {
    console.log(err);
  }
};

// LIST Employer
export const employerList = async () => {
  try {
    let responseOnEmployerList = await axios.get(`${REACT_BASE_URL}employers`);

    if (responseOnEmployerList.data.status === SUCCESS_STATUS) {
      return responseOnEmployerList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// GET Client Dashboard
export const getClientDashboardStats = async (id) => {
  try {
    console.log(`my userId ${id}`);
    let responseOnClientDashboardStats = await axios.get(
      `${REACT_BASE_URL}client-stats/${id}`
    );

    //console.log(responseOnClientDashboardStats);

    if (responseOnClientDashboardStats.status === 200) {
      return responseOnClientDashboardStats.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getJobAppliedToCompany = async (id, page) => {
  try {
    let responseOnJobApplyToCompany = await axios.get(
      `${REACT_BASE_URL}get-applied-job-to-company?user_id=${id}&page=${
        page || 1
      }`
    );
    //console.log(responseOnJobApplyToCompany);
    if (responseOnJobApplyToCompany.status == 201) {
      return responseOnJobApplyToCompany;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Employer
export const employerProfile = async (id) => {
  try {
    let responseOnEmployerProfile = await axios.get(
      `${REACT_BASE_URL}employer-companies/${id}`
      /**Add View History API URL here like ${URL}api/getEmployerProfile/${id}**/
    );
    // console.log(responseOnEmployerProfile);
    if (responseOnEmployerProfile.status == 200) {
      return responseOnEmployerProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const companyInfo = async (id) => {
  try {
    let responseOnCompanyInfo = await axios.get(
      `${REACT_BASE_URL}employers/${id}`
    );
    if (responseOnCompanyInfo.status == 200) {
      return responseOnCompanyInfo.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

//

// UPDATE Employer
export const updateEmployer = async (id, data) => {
  try {
    let responseOnUpdateEmployer = await axios.put(
      `${REACT_BASE_URL}employers/${id}`,
      data
    );
    //console.log(responseOnUpdateEmployer);
    if (responseOnUpdateEmployer.status == 200) {
      return responseOnUpdateEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// UPDATE Job
export const updateJob = async (id, data) => {
  try {
    let responseOnUpdateJob = await axios.put(
      `${REACT_BASE_URL}update-job/${id}`,
      data
    );
    //console.log(responseOnUpdateEmployer);
    if (responseOnUpdateJob.status == 200) {
      return responseOnUpdateJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// Add Or Update Office Info
export const updateOfficeImage = async (id, data) => {
  try {
    let responseOnUpdateOfficeImage = await axios.put(
      `${REACT_BASE_URL}office-image/${id}`,
      data
    );
    console.log(responseOnUpdateOfficeImage);
    if (responseOnUpdateOfficeImage.status == 201) {
      return responseOnUpdateOfficeImage.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// Update Employer Logo
// export const updateEmployerLogo = async (id, data) => {
//   try {
//     let responseOnUpdateEmployer = await axios.put(
//       `${REACT_BASE_URL}employers-logo/${id}`,
//       data
//     );
//     console.log(responseOnUpdateEmployer);
//     if (responseOnUpdateEmployer.status == 200) {
//       return responseOnUpdateEmployer.data;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// Update Employer Logo
export const updateEmployerLogo = async (id, data) => {
  try {
    let responseOnUpdateEmployer = await axios.put(
      `${REACT_BASE_URL}employers-logo/${id}`,
      data
    );
    console.log(responseOnUpdateEmployer);
    if (responseOnUpdateEmployer.status == 200) {
      return responseOnUpdateEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateEmployerBanner = async (id, data) => {
  try {
    let responseOnUpdateEmployer = await axios.put(
      `${REACT_BASE_URL}employers-banner/${id}`,
      data
    );
    if (responseOnUpdateEmployer.status == 200) {
      return responseOnUpdateEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateJobStatus = async (data) => {
  try {
    let responseOnChangeJobStatus = await axios.put(
      `${REACT_BASE_URL}update-application-status/${data.job_apply_id}`,
      data
    );
    if (responseOnChangeJobStatus.status == 200) {
      return responseOnChangeJobStatus;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Employer
export const deleteEmployer = async (id) => {
  try {
    let responseOnDeleteEmployer = await axios.delete(
      `${REACT_BASE_URL}employers/${id}`
    );
    if (responseOnDeleteEmployer.status == 200) {
      return responseOnDeleteEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE Job
export const deleteJob = async (id) => {
  try {
    let responseOnDeleteJob = await axios.delete(
      `${REACT_BASE_URL}delete-job/${id}`
    );
    if (responseOnDeleteJob.status == 200) {
      return responseOnDeleteJob.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

// MAKE PAYOUT
export const makePayout = async (data) => {
  try {
    let responseOnMakePayout = await axios.post(
      `${REACT_BASE_URL}make-payout`,
      data
    );
    if (responseOnMakePayout.status == 200) {
      return responseOnMakePayout.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
