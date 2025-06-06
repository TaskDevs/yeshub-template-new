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
    console.log(responseOnAddCertification);
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
    console.log(responseOnAddExperience);
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
    console.log(responseOnAddJobPost);
    if (responseOnAddJobPost.status === SUCCESS_STATUS) {
      return responseOnAddJobPost.data;
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
    console.log(responseOnCompanyInfoForInvoice);
    return responseOnCompanyInfoForInvoice;
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
