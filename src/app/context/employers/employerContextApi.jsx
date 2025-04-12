import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";
import {
  addEmployer,
  addCertification,
  addExperience,
  getClientDashboardStats,
  updateEmployerLogo,
  employerProfile,
  updateEmployer,
  updateOfficeImage,
  deleteEmployer,
  updateEmployerBanner,
} from "./employerApi";

export const EmployerApiData = createContext();

const EmployerApiDataProvider = (props) => {
  const [employerProfiles, setEmployerProfiles] = useState([]);
  const [employerStats, setEmployerStats] = useState({});

  const processAddEmployer = async (data) => {
    const userId = sessionStorage.getItem("user_id"); // Get logged-in user ID=
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
    const userId = sessionStorage.getItem("user_id"); // Get logged-in user ID=

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
    const userId = sessionStorage.getItem("user_id"); // Get logged-in user ID=

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

  const processEmployerProfile = async () => {
    const userId = sessionStorage.getItem("user_id");
    // console.log("Retrieved User ID:", id || userId); // Debugging step

    // if (!userId) {
    //   notify(400, "User ID not found");
    //   return;
    // }

    //console.log("Hi after returning esponds");
    let response = await employerProfile(userId || 3);
    console.log(response);

    if (response) {
      setEmployerProfiles(response.data);
    } else {
      return false;
    }
  };

  const processGetEmployerStats = async () => {
    const userId = sessionStorage.getItem("user_id");
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
    const userId = sessionStorage.getItem("user_id");
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

  return (
    <EmployerApiData.Provider
      value={{
        processAddEmployer,
        processAddCertification,
        processAddExperience,
        processEmployerProfile,
        processSearchEmployer,
        processUpdateEmployer,
        processUpdateOfficeImage,
        processUpdateEmployerLogo,
        processUpdateEmployerBanner,
        processDeleteEmployer,
        processGetEmployerStats,
        employerStats,
        employerProfiles,
      }}
    >
      {props.children}
    </EmployerApiData.Provider>
  );
};

export default EmployerApiDataProvider;
