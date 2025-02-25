import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";

import {
  addJob,
  searchJob,
  jobList,
  countEmployerJobsPosted,
  employerJobList,
  jobProfile
} from "./jobsApi";

export const JobApiData = createContext();

const JobApiDataProvider = (props) => {
  const [jobListData, setJobListData] = useState([]);
  const [empJobListData, setEmpJobListData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [empPaginationData, setEmpPaginationData] = useState({});
  const [totalPost, setTotalPost] = useState(0);
  const [totalAppliedJob] = useState(0);
  const [searchJobInfo, setSearchJobInfo] = useState({});
  const [ setSearchJobListData] = useState([]);


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
      setEmpJobListData(response.data);
      setEmpPaginationData({
        total: response.total,
      });
      return response
    }
  };

  const processJobProfile = async (id) => {
    let response = await employerJobList(id);
		if (response) {			
      setJobListData(response);
      
		}

  };

  const processAJobProfile = async (id) => {
    let response = await jobProfile(id);
		if (response) {
			return response;
      
		}

  };

  // jobProfile

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

  const processUpdateJob = async () => {};

  const processDeleteJob = async () => {};

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
        processAJobProfile,
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
