import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addEmployer,
  searchEmployer,
  employerList,
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

  const processEmployerProfile = async () => {
    let response = await employerProfile();

    if (response) {
      setEmployerProfiles(response.data);
    }
  };

  const processSearchEmployer = async (data) => {};

  const processUpdateEmployer = async (data) => {};

  const processDeleteEmployer = async (id) => {};

  return (
    <EmployerApiData.Provider
      value={{
        processAddEmployer,
        processGetAllEmployer,
        processEmployerProfile,
        processSearchEmployer,
        processUpdateEmployer,
        processDeleteEmployer,
        employerProfiles,
      }}
    >
      {props.children}
    </EmployerApiData.Provider>
  );
};

export default EmployerApiDataProvider;
