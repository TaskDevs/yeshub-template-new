import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";

import {
  addJob,
  searchJob,
  jobList,
  countEmployerJobsPosted,
  employerJobList,
  jobProfile,
  countApplications,
  deleteJob
} from "./jobsApi";
import { useNavigate } from "react-router-dom";

export const JobApiData = createContext();

const JobApiDataProvider = (props) => {
  const [jobListData, setJobListData] = useState([]);
  const [empJobListData, setEmpJobListData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [empPaginationData, setEmpPaginationData] = useState({});
  const [totalPost, setTotalPost] = useState(0);
  const [totalAppliedJob, setTotalAppliedJob] = useState(0);
  const [searchJobInfo, setSearchJobInfo] = useState({});
  const [ setSearchJobListData] = useState([]);
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const processAddJob = async (data) => {
    let response = await addJob(data);
    if (response) {
      data.status === 1
        ? notify(200, "Job added successfully")
        : notify(200, "Draft added successfully");
      navigate('/dashboard-employer/manage-jobs')
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

  const processCountApplications= async (id) => {
    let response = await countApplications(id);
    if (response) {
      setTotalAppliedJob(response);
    }
  };


  const processGetAllJobPostByEmployer = async (id) => {
    setLoading(true); // ✅ Set loading to true before fetching

    try {
      let response = await employerJobList(id);
      if (response) {
        setEmpJobListData(response.data);
        setEmpPaginationData({
          total: response.total,
        });
        return response;
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false); // ✅ Ensure loading is false after the request
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
    // console.log("response-job-profile", response)
    return response;
   
		// if (response) {
      
		// 	return response;
      
		// }

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

  const processDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      // console.log("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error);
    }
  };
  
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
        loading,
        processCountApplications,
     
      }}
    >
      {props.children}
    </JobApiData.Provider>
  );
};

export default JobApiDataProvider;
