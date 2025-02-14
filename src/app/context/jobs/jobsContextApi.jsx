import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addJob,
  searchJob,
  JobList,
  JobProfile,
  updateJob,
  deleteJob,
} from "./jobsApi";

export const JobApiData = createContext();

const JobApiDataProvider = (props) => {
  const processAddJob = async (data) => {};

  const processGetAllJob = async (id) => {};

  const processJobProfile = async (id) => {};

  const processSearchJob = async (data) => {};

  const processUpdateJob = async (data) => {};

  const processDeleteJob = async (id) => {};

  return (
    <JobApiData.Provider
      value={{
        processAddJob,
        processGetAllJob,
        processJobProfile,
        processSearchJob,
        processUpdateJob,
        processDeleteJob,
      }}
    >
      {props.children}
    </JobApiData.Provider>
  );
};

export default JobApiDataProvider;
