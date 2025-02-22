import React, { createContext, useState, useEffect } from "react";
import {
  SUCCESS_STATUS,
  LIST_ON_PAGES,
  BACKEND_HOST,
} from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addEmployer,
  searchEmployer,
  employerList,
  updateEmployerLogo,
  employerProfile,
  updateEmployer,
  deleteEmployer,
} from "./employerApi";

export const EmployerApiData = createContext();

const EmployerApiDataProvider = (props) => {
  const [employerProfiles, setEmployerProfiles] = useState([]);

  const processAddEmployer = async (data) => {
    let response = await addEmployer(data);
    if (response) {
      notify(200, "Company Added Successfully");
    } else {
      notify(400, "Failed to Add Company");
    }
  };

  const processGetAllEmployer = async () => {};
  console.log(BACKEND_HOST);
  const processEmployerProfile = async (id) => {
    let response = await employerProfile(id || 3);
    if (response) {
      console.log(response.data);
      setEmployerProfiles(response.data);
    }
  };

  const processUpdateEmployerLogo = async (id, data) => {
    let response = await updateEmployerLogo(id, data);
    if (response) {
      notify(200, "Company Added Successfully");
    } else {
      notify(400, "Failed to Add Company");
    }
  };

  const processSearchEmployer = async (id, data) => {};

  const processUpdateEmployer = async (id, data) => {
    let response = await updateEmployer(id, data);
    if (response) {
      notify(200, "Profile updated successfully");
      processEmployerProfile();
    } else {
      notify(400, "Failed to update profile");
    }
  };

  const processDeleteEmployer = async (id) => {
    let response = await deleteEmployer(id);
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
        processDeleteEmployer,
        employerProfiles,
      }}
    >
      {props.children}
    </EmployerApiData.Provider>
  );
};

export default EmployerApiDataProvider;
