import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";
import {
  addEmployer,
  addCertification,
  getInterviewInfo,
  addExperience,
  addJobPost,
  manageProject,
  createProject,
  changeCandidateStatus,
  getClientDashboardStats,
  getProjects,
  getClientProjects,
  getProjectChat,
  getJobAppliedToCompany,
  getApplicantsOfJobPosted,
  getCompanyInfoForInvoice,
  getHiredApplicants,
  getCompanyPostedJobs,
  projectInfoData,
  checkIfCompanyExist,
  setInterview,
  sendGroupChat,
  companyInfo,
  updateEmployerLogo,
  employerProfile,
  updateEmployer,
  updateJobStatus,
  updateJob,
  updateOfficeImage,
  deleteEmployer,
  deleteJob,
  updateEmployerBanner,
} from "./employerApi";
import { formatDate } from "../../../utils/dateUtils";
import { userId } from "../../../globals/constants";

export const EmployerApiData = createContext();

const EmployerApiDataProvider = (props) => {
  const [employerProfiles, setEmployerProfiles] = useState([]);
  const [companyInfoData, setCompanyInfoData] = useState([]);
  const [appliedJobList, setAppliedJobList] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);
  const [hiredApplicants, setHiredApplicants] = useState([]);
  const [processHiredApplicants, setProcessHiredApplicants] = useState([]);
  const [postedJobList, setPostedJobList] = useState([]);
  const [rawPostedJobs, setRawPostedJobs] = useState([]);
  const [jobPaginationData, setJobPaginationData] = useState({});
  const [employerStats, setEmployerStats] = useState({});
  const [interviewInfo, setInterviewInfo] = useState({});
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [notifyMessage, setNotifyMessage] = useState(0);
  const [projectChats, setProjectChats] = useState([]);

  const processGetUserProjects = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      let responseOnGetUserProjects = await getProjects(userId);
      setUserProjects(responseOnGetUserProjects.projects);
    } catch (err) {
      console.log(err);
    }
  };

  const processGetProjectChat = async (id) => {
    let response = await getProjectChat(id);
    console.log(response);
    setProjectChats(response.messages.data);
  };

  const processSendGroupChat = async (data) => {
    let response = await sendGroupChat(data);
    if (response) {
      return true;
    } else {
      false;
    }
  };

  const processAddEmployer = async (data) => {
    const userId = sessionStorage.getItem("userId"); // Get logged-in user ID=
    if (!userId) {
      notify(400, "User ID not found. Please log in again.");
      return;
    }

    // Ensure the user ID is included in the request data
    const requestData = {
      ...data,
      user_id: userId, // Use the logged-in user ID
    };

    let response = await addEmployer(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      notify(200, "Company Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Company, API Response:", response);
      notify(400, "Failed to Add Company");
    }
  };

  const processCreateProjects = async (data) => {
    const userId = sessionStorage.getItem("userId");

    const requestData = {
      ...data,
      user_id: userId,
    };
    console.log(requestData);
    let response = await createProject(requestData);
    if (response) {
      return true;
    } else {
      return false;
    }
  };

  const processProjectInfoData = async (id) => {
    let response = await projectInfoData(id);
    if (response) {
      setProjectInfo(response.project_info);
    }
  };

  const processGetClientProjects = async () => {
    try {
      let response = await getClientProjects(userId);
      console.log(response);
      if (response) {
        sessionStorage.setItem("chat_id", response.chat_id);
        sessionStorage.setItem(
          "project_ids",
          JSON.stringify(response.project_ids)
        );
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const processAddCertification = async (data) => {
    const userId = sessionStorage.getItem("userId"); // Get logged-in user ID=

    // Ensure the user ID is included in the request data
    const requestData = {
      ...data,
      user_id: userId, // Use the logged-in user ID
    };

    let response = await addCertification(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      processEmployerProfile();
      notify(200, "Certification Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Company, API Response:", response);
      notify(400, "Failed to Add Company");
    }
  };

  const processAddExperience = async (data) => {
    const userId = sessionStorage.getItem("userId"); // Get logged-in user ID=

    // Ensure the user ID is included in the request data
    const requestData = {
      ...data,
      user_id: userId, // Use the logged-in user ID
    };

    let response = await addExperience(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      processEmployerProfile();
      notify(200, "Experience Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Company, API Response:", response);
      notify(400, "Failed to Add Company");
    }
  };

  const processAddJobPost = async (data) => {
    const userId = sessionStorage.getItem("userId");
    data.company_id = userId;
    let response = await addJobPost(data);
    if (response) {
      processGetEmployerStats(userId);
      processGetCompanyPostedJobs();
      return true;
    } else {
      return false;
    }
  };

  const processSetInterview = async (data) => {
    let response = await setInterview(data);

    if (response === true) {
      // Update the stage of the selected applicant
      setApplicants((prev) =>
        prev.map((item) =>
          item.id === data.proposal_id ? { ...item, stage: "interview" } : item
        )
      );
      return true;
    } else {
      return false;
    }
  };

  const processGetInterviewInfo = async (id) => {
    let response = await getInterviewInfo(id);
    if (response) {
      setInterviewInfo(response.data);
    }
  };

  const processGetHiredApplicants = async () => {
    let response = await getHiredApplicants();
    if (response) {
      let newData = [];
      response.data.map((item) => newData.push(item.user));
      setProcessHiredApplicants(newData);
      setHiredApplicants(newData);
    }
  };

  const processChangeCandidateStatus = async (data, id) => {
    let response = await changeCandidateStatus(data, id);
    if (response) {
      setApplicants((prev) =>
        prev.map((item) =>
          item.id == id ? { ...item, stage: data.status } : item
        )
      );
      return true;
    } else {
      return false;
    }
  };

  const processCheckIfCompanyExist = async (data) => {
    let response = await checkIfCompanyExist(data);
    return response;
  };

  const processGetCompanyInfoForInvoice = async (data) => {
    let response = await getCompanyInfoForInvoice(data);
    return response;
  };

  const processGetJobAppliedToCompany = async (pageNo) => {
    const userId = sessionStorage.getItem("userId");
    let response = await getJobAppliedToCompany(userId, pageNo);
    if (response) {
      setAppliedJobList(response.data.data);
      setJobPaginationData({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
      });
    } else {
      return false;
    }
  };

  const processGetApplicantsOfJobPosted = async (id) => {
    let response = await getApplicantsOfJobPosted(id);
    if (response) {
      //console.log(response);
      setTotalApplicants(response.data.total);
      setApplicants(response.data.data);
    } else {
      return false;
    }
  };

  const processEmployerProfile = async (id) => {
    const userId = sessionStorage.getItem("userId");

    let response = await employerProfile(id || userId);
    console.log(response);

    if (response) {
      setEmployerProfiles(response.data);
    } else {
      return false;
    }
  };

  const processGetCompanyInfo = async (id) => {
    let response = await companyInfo(id);
    if (response) {
      console.log(response.data);
      setCompanyInfoData(response.data);
    } else {
      return false;
    }
  };

  const processGetCompanyPostedJobs = async () => {
    const userId = sessionStorage.getItem("userId");
    let response = await getCompanyPostedJobs(userId);
    if (response) {
      console.log(response.data);
      let newData = [];
      response.data.map((item) =>
        newData.push({
          id: item.id,
          title: item.title,
          location: item.job_type,
          description: item.description,
          proposal_count: item.proposals_count,
          date: formatDate(item.created_at),
          status:
            item.status &&
            item.status.charAt(0).toUpperCase() + item.status.slice(1),
          tags: item.skills?.split(","),
          applicants: 0,
        })
      );
      setRawPostedJobs(response.data);
      setPostedJobList(newData);
    } else {
      return false;
    }
  };

  const processGetEmployerStats = async () => {
    const userId = sessionStorage.getItem("userId");
    let response = await getClientDashboardStats(userId);
    if (response) {
      setEmployerStats(response);
    } else {
      return false;
    }
  };

  const processUpdateEmployerLogo = async (id, data) => {
    let response = await updateEmployerLogo(id, data);
    if (response) {
      notify(200, "Company Added Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      notify(400, "Failed to Add Company");
    }
  };

  const processUpdateEmployerBanner = async (id, data) => {
    let response = await updateEmployerBanner(id, data);
    if (response) {
      processEmployerProfile();
      notify(200, "Company Added Successfully");
    } else {
      notify(400, "Failed to Add Company");
    }
  };

  const processManageProject = async (data) => {
    let response = await manageProject(data);
    //console.log
    if (response) {
      processProjectInfoData(data.project_id);
      return true;
    } else {
      return false;
    }
  };

  //updateJobStatus
  const processUpdateJobStatus = async (data) => {
    let response = await updateJobStatus(data);
    if (response) {
      processGetJobAppliedToCompany();
      notify(200, "Application Status updated Successfully");
    } else {
      notify(400, "Failed to change status");
    }
  };

  const processSearchEmployer = async () => {};

  const processUpdateEmployer = async (id, data) => {
    //const userId = sessionStorage.getItem("user_id");
    console.log(data);
    let response = await updateEmployer(id, data);
    // console.log(userId);
    console.log(response);
    if (response) {
      processEmployerProfile();
      notify(200, "Profile updated successfully");
    } else {
      notify(400, "Failed to update profile");
    }
  };

  const processUpdateJob = async (id, data) => {
    let response = await updateJob(id, data);
    // console.log(userId);
    //console.log(response);
    if (response) {
      processGetEmployerStats();
      processGetCompanyPostedJobs();
      return true;
    } else {
      return false;
    }
  };

  //updateOfficeImage;
  const processUpdateOfficeImage = async (id, data) => {
    //const userId = sessionStorage.getItem("user_id");
    let response = await updateOfficeImage(id, data);
    // console.log(userId);
    console.log(response);
    if (response) {
      processEmployerProfile();
      notify(200, "Profile updated successfully");
    } else {
      notify(400, "Failed to update profile");
    }
  };

  const processDeleteEmployer = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      notify(400, "User ID not found");
      return;
    }
    let response = await deleteEmployer(userId);
    if (response) {
      notify(200, "Profile deleted successfully");
    } else {
      notify(400, "Failed to delete profile");
    }
  };

  //deleteJob
  const processDeleteJob = async (id) => {
    let response = await deleteJob(id);
    if (response) {
      processGetEmployerStats();
      processGetCompanyPostedJobs();
      notify(200, "Job deleted successfully");
    } else {
      notify(400, "Failed to delete job");
    }
  };

  return (
    <EmployerApiData.Provider
      value={{
        processAddEmployer,
        processAddCertification,
        processAddExperience,
        processGetCompanyInfoForInvoice,
        processGetInterviewInfo,
        processEmployerProfile,
        processChangeCandidateStatus,
        processGetJobAppliedToCompany,
        processGetCompanyInfo,
        processGetUserProjects,
        processCheckIfCompanyExist,
        processSearchEmployer,
        processAddJobPost,
        processCreateProjects,
        processGetHiredApplicants,
        processUpdateEmployer,
        processUpdateJob,
        processUpdateJobStatus,
        processUpdateOfficeImage,
        processUpdateEmployerLogo,
        processUpdateEmployerBanner,
        processDeleteEmployer,
        processGetEmployerStats,
        processDeleteJob,
        appliedJobList,
        companyInfoData,
        employerStats,
        employerProfiles,
        processGetCompanyPostedJobs,
        postedJobList,
        rawPostedJobs,
        jobPaginationData,
        processGetApplicantsOfJobPosted,
        hiredApplicants,
        setHiredApplicants,
        applicants,
        totalApplicants,
        processSetInterview,
        interviewInfo,
        userProjects,
        processHiredApplicants,
        setProcessHiredApplicants,
        processManageProject,
        processProjectInfoData,
        projectInfo,
        notifyMessage,
        setNotifyMessage,
        projectChats,
        setProjectChats,
        processGetProjectChat,
        processSendGroupChat,
        processGetClientProjects,
      }}
    >
      {props.children}
    </EmployerApiData.Provider>
  );
};

export default EmployerApiDataProvider;
