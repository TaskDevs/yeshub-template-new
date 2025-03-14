import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";
import {
  addEmployer,
  updateEmployerLogo,
  employerProfile,
  updateEmployer,
  deleteEmployer,
  updateEmployerBanner,
} from "./employerApi";

export const EmployerApiData = createContext();

const EmployerApiDataProvider = (props) => {
  const [employerProfiles, setEmployerProfiles] = useState([]);

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
  
  

  const processGetAllEmployer = async () => {};

  const processEmployerProfile = async () => {
    const userId = sessionStorage.getItem("user_id");
    console.log("Retrieved User ID:", userId); // Debugging step
  
    if (!userId) {
      notify(400, "User ID not found");
      return;
    }
  
    let response = await employerProfile(userId);
    if (response) {
      setEmployerProfiles(response.data);
    } else {
      return false
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
      notify(200, "Company Added Successfully");
    } else {
      notify(400, "Failed to Add Company");
    }
  };

  const processSearchEmployer = async () => {};

  const processUpdateEmployer = async (id, data) => {
    let response = await updateEmployer(id, data);
    if (response) {
      notify(200, "Profile updated successfully");
      processEmployerProfile();
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
        processGetAllEmployer,
        processEmployerProfile,
        processSearchEmployer,
        processUpdateEmployer,
        processUpdateEmployerLogo,
        processUpdateEmployerBanner,
        processDeleteEmployer,
        employerProfiles,
      }}
    >
      {props.children}
    </EmployerApiData.Provider>
  );
};

export default EmployerApiDataProvider;
