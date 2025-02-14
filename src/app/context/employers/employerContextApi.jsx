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
  const processAddEmployer = async (data) => {};

  const processGetAllEmployer = async (id) => {};

  const processEmployerProfile = async (id) => {};

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
      }}
    >
      {props.children}
    </EmployerApiData.Provider>
  );
};

export default EmployerApiDataProvider;
