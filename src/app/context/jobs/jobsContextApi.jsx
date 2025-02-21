import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addJob,
  searchJob,
  jobList,
  jobProfile,
  updateJob,
  employerJobList,
  deleteJob,
} from "./jobsApi";

export const JobApiData = createContext();

const JobApiDataProvider = (props) => {
  const [jobListData, setJobListData] = useState([]);
  const [statusAlert, setStatusAlert] = useState({
    status: true,
    msg: null,
  });

  const processAddJob = async (data) => {
    let response = await addJob(data);
    if (response) {
      data.status === 1
        ? notify(200, "Job added successfully")
        : notify(200, "Draft added successfully");
    } else {
      notify(null, 400, "Oops Something went wrong");
    }
  };

  const processGetAllJob = async () => {
    let response = await jobList();
    if (response) {
      console.log("get-all-jobs",response);
      setJobListData(response);
    }
  };

  const processJobProfile = async (id) => {
    let response = await employerJobList(id);
		if (response) {
			console.log("get-single-jobs", response);
			setJobListData(response);
		}

  };

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
        statusAlert,
        setStatusAlert,
        jobListData,
        setJobListData,
      }}
    >
      {props.children}
    </JobApiData.Provider>
  );
};

export default JobApiDataProvider;
