import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";

import {
  addJob,
  searchJob,
  searchJobByTitle,
  jobList,
  changeJobStatus,
  countEmployerJobsPosted,
  employerJobList,
  jobProfile,
  countApplications,
  deleteJob,
  applyForJob,
  jobCompanyInfo,
} from "./jobsApi";
import { useNavigate } from "react-router-dom";

export const JobApiData = createContext();

const JobApiDataProvider = (props) => {
  const [jobListData, setJobListData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [empJobListData, setEmpJobListData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [searchPaginationData, setSearchPaginationData] = useState([]);
  const [empPaginationData, setEmpPaginationData] = useState({});
  const [totalPost, setTotalPost] = useState(0);
  const [totalAppliedJob, setTotalAppliedJob] = useState(0);
  const [searchFullInfo, setSearchFullInfo] = useState({});
  const [searchJobInfo, setSearchJobInfo] = useState({});
  const [searchJobListData, setSearchJobListData] = useState([]);
  const [searchLoad, setSearchLoad] = useState(false);
  const [jobProfileData, setJobProfileData] = useState({});
  // const [clientDashboardData, setClientDashboardData] = useState({});
  const [jobLoad, setJobLoad] = useState(false);
  const [searchData, setSearchData] = useState({
    job_category: null,
    job_type: null,
    location: null,
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const processAddJob = async (data) => {
    let response = await addJob(data);
    if (response) {
      data.status === 1
        ? notify(200, "Job added successfully")
        : notify(200, "Draft added successfully");
      navigate("/dashboard-employer/manage-jobs");
    } else {
      notify(null, 400, "Oops Something went wrong");
    }
  };

  const processApplyForJob = async (data) => {
    let response = await applyForJob(data);
    if (response) {
      processGetAllJob(1, data.user_id);
      notify(200, "Job applied successfully");
    } else {
      notify(null, 400, "Oops Something went wrong");
    }
  };

  const processGetAllJob = async (pageNo, userId) => {
    setJobLoad(false);
    let response = await jobList(pageNo, userId);
    if (response) {
      console.log(response);
      setJobListData(response.data);
      setPaginationData({
        // total: response.pagination.total,
        // link: response.pagination.links,
        // current: response.pagination.current_page,
        total: response?.total,
        link: response?.links,
        current: response?.current_page,
      });
    }
    setJobLoad(true);
  };

  const processJobCompanyInfo = async (id) => {
    setCompanyInfo({});
    let response = await jobCompanyInfo(id);
    console.log(response);
    setCompanyInfo(response.data.data);
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

  const processCountApplications = async (id) => {
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
        // console.log("jobs emp", response);
        setEmpJobListData(response);
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
    console.log(response);
    setJobProfileData(response.job);
  };

  // jobProfile

  const processSearchJob = async (data, pageNo) => {
    setSearchLoad(false);
    setSearchJobListData([]);

    let newSearchData;

    if (pageNo == 1) {
      newSearchData = {
        job_category: data.category,
        job_type: data.type,
        location: data.location,
      };

      setSearchData(newSearchData);
    } else {
      newSearchData = searchData;
    }

    //console.log("Search Params:", newSearchData);

    let response = await searchJob(newSearchData, pageNo);

    if (response && response.data) {
      console.log("Raw Response:", response);
      setSearchFullInfo(response);
      setSearchJobListData(response.data);
      setSearchPaginationData({
        total: response.pagination.total,
        link: response.pagination.links,
        current: response.pagination.current_page,
      });

      setSearchLoad(true);
    }
  };

  const processSearchJobByTitle = async (data, pageNo) => {
    setSearchLoad(false);
    setSearchJobListData([]);

    let response = await searchJobByTitle(data, pageNo);

    if (response && response.data) {
      console.log("Raw Response:", response);
      setSearchJobListData(response.data);
      setSearchPaginationData({
        total: response.pagination.total,
        link: response.pagination.links,
        current: response.pagination.current_page,
      });

      setSearchLoad(true);
    }
  };

  const processChangeJobStatus = async (id, data) => {
    let response = await changeJobStatus(id, data);
    if (response) {
      return true;
    } else {
      return false;
    }
  };

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
        processJobCompanyInfo,
        processSearchJob,
        processDeleteJob,
        processAJobProfile,
        processApplyForJob,
        jobListData,
        setJobListData,
        modalOpen,
        setModalOpen,
        handleCloseModal,
        searchJobListData,
        searchFullInfo,
        empJobListData,
        empPaginationData,
        totalPost,
        totalAppliedJob,
        searchJobInfo,
        searchLoad,
        jobLoad,
        searchData,
        processChangeJobStatus,
        searchPaginationData,
        setSearchJobInfo,
        processSearchJobByTitle,
        loading,
        processCountApplications,
        companyInfo,
        jobProfileData,
      }}
    >
      {props.children}
    </JobApiData.Provider>
  );
};

export default JobApiDataProvider;
