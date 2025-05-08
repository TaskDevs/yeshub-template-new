import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";
import {
  addEmployer,
  addCertification,
  addExperience,
  addJobPost,
  getClientDashboardStats,
  getJobAppliedToCompany,
  companyInfo,
  updateEmployerLogo,
  employerProfile,
  updateEmployer,
  updateJobStatus,
  updateJob,
  updateOfficeImage,
  deleteEmployer,
  deleteJob,
  updateEmployerBanner,
} from "./employerApi";

export const EmployerApiData = createContext();

const EmployerApiDataProvider = (props) => {
  const [employerProfiles, setEmployerProfiles] = useState([]);
  const [companyInfoData, setCompanyInfoData] = useState([]);
  const [appliedJobList, setAppliedJobList] = useState([]);
  const [employerStats, setEmployerStats] = useState({});

  const processAddEmployer = async (data) => {
    const userId = sessionStorage.getItem("userId"); // Get logged-in user ID=
    if (!userId) {
      notify(400, "User ID not found. Please log in again.");
      return;
    }

    // Ensure the user ID is included in the request data
    const requestData = {
      ...data,
      user_id: userId, // Use the logged-in user ID
    };

    let response = await addEmployer(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      notify(200, "Company Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Company, API Response:", response);
      notify(400, "Failed to Add Company");
    }
  };

  const processAddCertification = async (data) => {
    const userId = sessionStorage.getItem("userId"); // Get logged-in user ID=

    // Ensure the user ID is included in the request data
    const requestData = {
      ...data,
      user_id: userId, // Use the logged-in user ID
    };

    let response = await addCertification(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      processEmployerProfile();
      notify(200, "Certification Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Company, API Response:", response);
      notify(400, "Failed to Add Company");
    }
  };

  const processAddExperience = async (data) => {
    const userId = sessionStorage.getItem("userId"); // Get logged-in user ID=

    // Ensure the user ID is included in the request data
    const requestData = {
      ...data,
      user_id: userId, // Use the logged-in user ID
    };

    let response = await addExperience(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      processEmployerProfile();
      notify(200, "Experience Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Company, API Response:", response);
      notify(400, "Failed to Add Company");
    }
  };

  const processAddJobPost = async (data) => {
    const userId = sessionStorage.getItem("userId");
    data.company_id = userId;
    console.log(data);
    let response = await addJobPost(data);
    if (response) {
      processGetEmployerStats(userId);
      notify(200, "Job posted successfully");
    } else {
      return false;
    }
  };

  const processGetJobAppliedToCompany = async (pageNo) => {
    const userId = sessionStorage.getItem("userId");
    let response = await getJobAppliedToCompany(userId, pageNo);
    if (response) {
      setAppliedJobList(response.data.data);
    } else {
      return false;
    }
  };

  const processEmployerProfile = async (id) => {
    const userId = sessionStorage.getItem("userId");

    let response = await employerProfile(id || userId);
    console.log(response);

    if (response) {
      setEmployerProfiles(response.data);
    } else {
      return false;
    }
  };

  const processGetCompanyInfo = async (id) => {
    let response = await companyInfo(id);
    if (response) {
      console.log(response.data);
      setCompanyInfoData(response.data);
    } else {
      return false;
    }
  };

  const processGetEmployerStats = async () => {
    const userId = sessionStorage.getItem("userId");
    let response = await getClientDashboardStats(userId);
    if (response) {
      setEmployerStats(response);
    } else {
      return false;
    }
  };

  const processUpdateEmployerLogo = async (id, data) => {
    let response = await updateEmployerLogo(id, data);
    if (response) {
      notify(200, "Company Added Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      notify(400, "Failed to Add Company");
    }
  };

  const processUpdateEmployerBanner = async (id, data) => {
    let response = await updateEmployerBanner(id, data);
    if (response) {
      processEmployerProfile();
      notify(200, "Company Added Successfully");
    } else {
      notify(400, "Failed to Add Company");
    }
  };

  //updateJobStatus
  const processUpdateJobStatus = async (data) => {
    let response = await updateJobStatus(data);
    if (response) {
      processGetJobAppliedToCompany();
      notify(200, "Application Status updated Successfully");
    } else {
      notify(400, "Failed to change status");
    }
  };

  const processSearchEmployer = async () => {};

  const processUpdateEmployer = async (id, data) => {
    //const userId = sessionStorage.getItem("user_id");
    console.log(data);
    let response = await updateEmployer(id, data);
    // console.log(userId);
    console.log(response);
    if (response) {
      processEmployerProfile();
      notify(200, "Profile updated successfully");
    } else {
      notify(400, "Failed to update profile");
    }
  };

  const processUpdateJob = async (id, data) => {
    let response = await updateJob(id, data);
    // console.log(userId);
    //console.log(response);
    if (response) {
      processGetEmployerStats();
      notify(200, "Job updated successfully");
    } else {
      notify(400, "Failed to update profile");
    }
  };

  //updateOfficeImage;
  const processUpdateOfficeImage = async (id, data) => {
    //const userId = sessionStorage.getItem("user_id");
    let response = await updateOfficeImage(id, data);
    // console.log(userId);
    console.log(response);
    if (response) {
      processEmployerProfile();
      notify(200, "Profile updated successfully");
    } else {
      notify(400, "Failed to update profile");
    }
  };

  const processDeleteEmployer = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      notify(400, "User ID not found");
      return;
    }
    let response = await deleteEmployer(userId);
    if (response) {
      notify(200, "Profile deleted successfully");
    } else {
      notify(400, "Failed to delete profile");
    }
  };

  //deleteJob
  const processDeleteJob = async (id) => {
    let response = await deleteJob(id);
    if (response) {
      processGetEmployerStats();
      notify(200, "Job deleted successfully");
    } else {
      notify(400, "Failed to delete job");
    }
  };

  return (
    <EmployerApiData.Provider
      value={{
        processAddEmployer,
        processAddCertification,
        processAddExperience,
        processEmployerProfile,
        processGetJobAppliedToCompany,
        processGetCompanyInfo,
        processSearchEmployer,
        processAddJobPost,
        processUpdateEmployer,
        processUpdateJob,
        processUpdateJobStatus,
        processUpdateOfficeImage,
        processUpdateEmployerLogo,
        processUpdateEmployerBanner,
        processDeleteEmployer,
        processGetEmployerStats,
        processDeleteJob,
        appliedJobList,
        companyInfoData,
        employerStats,
        employerProfiles,
      }}
    >
      {props.children}
    </EmployerApiData.Provider>
  );
};

export default EmployerApiDataProvider;
