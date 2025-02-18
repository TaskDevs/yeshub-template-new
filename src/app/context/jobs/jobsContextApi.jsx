import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addJob,
  searchJob,
  jobList,
  jobProfile,
  updateJob,
  deleteJob,
} from "./jobsApi";

export const JobApiData = createContext();

const JobApiDataProvider = (props) => {
  const [jobListData, setJobListData] = useState([]);

  const processAddJob = async (data) => {
    let response = await addJob(data);
    console.log(response);
    if (response) {
      notify(SUCCESS_STATUS, "Job Added Successfully");
    }
  };

  const processGetAllJob = async () => {
    let response = await jobList();
    if (response) {
      //console.log(response);
      setJobListData(response);
    }
  };

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
        jobListData,
        setJobListData,
      }}
    >
      {props.children}
    </JobApiData.Provider>
  );
};

export default JobApiDataProvider;
