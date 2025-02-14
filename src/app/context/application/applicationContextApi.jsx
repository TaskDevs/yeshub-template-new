import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addApplication,
  searchApplication,
  applicationList,
  applicationProfile,
  updateApplication,
  deleteApplication,
} from "./applicationApi";

export const ApplicationApiData = createContext();

const ApplicationApiDataProvider = (props) => {
  const processAddApplication = async (data) => {};

  const processGetAllApplication = async (id) => {};

  const processApplicationProfile = async (id) => {};

  const processSearchApplication = async (data) => {};

  const processUpdateApplication = async (data) => {};

  const processDeleteApplication = async (id) => {};

  return (
    <ApplicationApiData.Provider
      value={{
        processAddApplication,
        processGetAllApplication,
        processApplicationProfile,
        processSearchApplication,
        processUpdateApplication,
        processDeleteApplication,
      }}
    >
      {props.children}
    </ApplicationApiData.Provider>
  );
};

export default ApplicationApiDataProvider;
