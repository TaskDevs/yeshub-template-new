import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addJob,
  searchJob,
  jobList,
  countEmployerJobsPosted,
  jobProfile,
  updateJob,
  employerJobList,
  deleteJob,
} from "./jobsApi";

export const JobApiData = createContext();

const JobApiDataProvider = (props) => {
  const [jobListData, setJobListData] = useState([]);
  const [empJobListData, setEmpJobListData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [empPaginationData, setEmpPaginationData] = useState({});
  const [totalPost, setTotalPost] = useState(0);
  const [totalAppliedJob, setTotalAppliedJob] = useState(0);
  const [searchJobInfo, setSearchJobInfo] = useState({});
  const [searchJobListData, setSearchJobListData] = useState([]);

  console.log("jobListData", jobListData);

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
      
      setJobListData(response);
      console.log("get-all-jobs",response);
      setJobListData(response.data);
      setPaginationData({
        total: response.total,
      });
    }
  };

  const processCountJobsPostedByEmp = async (id) => {
    let response = await countEmployerJobsPosted(id);
    if (response) {
      setTotalPost(response);
      // setJobListData(response.data);
      // setPaginationData({
      //   total: response.total,
      // });
    }
  };

  const processGetAllJobPostByEmployer = async (id) => {
    let response = await employerJobList(id);
    if (response) {
      console.log(response);
      setEmpJobListData(response.data);
      setEmpPaginationData({
        total: response.total,
      });
    }
  };

  const processJobProfile = async (id) => {
    let response = await employerJobList(id);
		if (response) {
			console.log("get-single-jobs", response);
			setJobListData(response);
		}

  };

  const processSearchJob = async (data) => {
    let response = await searchJob(data);
    if (response) {
      //console.log(response);
      setSearchJobListData(response.data);
      setEmpPaginationData({
        total: response.total,
      });
    }
  };

  const processUpdateJob = async (data) => {};

  const processDeleteJob = async (id) => {};

  return (
    <JobApiData.Provider
      value={{
        processAddJob,
        processGetAllJob,
        paginationData,
        processCountJobsPostedByEmp,
        processGetAllJobPostByEmployer,
        processJobProfile,
        processSearchJob,
        processUpdateJob,
        processDeleteJob,
        jobListData,
        setJobListData,
        empJobListData,
        empPaginationData,
        totalPost,
        totalAppliedJob,
        searchJobInfo,
        setSearchJobInfo,
      }}
    >
      {props.children}
    </JobApiData.Provider>
  );
};

export default JobApiDataProvider;
