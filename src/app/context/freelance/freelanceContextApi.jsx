import React, { createContext, useState, useEffect, useContext } from "react";
// import { notify } from "../../../utils/responseUtils";

import {
  addFreelance,
  jobsAppliedTo,
  // searchFreelance,
  getFreelanceList,
  getProjectSubmissions,
  freelanceProfile,
  updateFreelance,
  deleteFreelance,
  getFreelanceProjects,
  getFreelanceStats,
} from "./freelanceApi";
import { userId } from "../../../globals/constants";
import toast from "react-hot-toast";
import { FREELANCERFIELD } from "../../../globals/freelancer-data";
import { GlobalApiData } from "../global/globalContextApi";
import { PortfolioApiData } from "../portfolio/portfolioContextApi";

export const FreelanceApiData = createContext();

const initialFormData = FREELANCERFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});

const FreelanceApiDataProvider = (props) => {
  const [freelanceProfileData, setFreelanceProfileData] = useState([]);
  const [freelanceProjectList, setFreelanceProjectList] = useState();
  const [freelanceList, setFreelanceList] = useState([]);
  const [projectSubmissionsList, setProjectSubmissionList] = useState([]);
  const [freelanceSkillInfo, setFreelanceSkillInfo] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [employmentHistoryInfo, setEmploymentHistoryInfo] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const { setIsSubmitting } = useContext(GlobalApiData);
  const [selectedItems, setSelectedItems] = useState([]);
  const { portfolios } = useContext(PortfolioApiData);
  const [viewFreelanceProfile, setViewFreelanceProfile] = useState({});
  const [freelanceProjectStatus, setFreelanceProjectStatus] = useState(false);
  const [freelanceStats, setFreelanceStats] = useState({
    total_projects: 0,
    saved_jobs: 0,
    wallet_balance: 0,
  });

  //  console.log("freelanceProfileData", freelanceProfileData)

  const fetchProfile = async () => {
    const res = await processFreelanceProfile(userId);
    if (res) {
      setFreelanceProfileData(res.data);

      sessionStorage.setItem("freelancer_id", res?.data[0]?.id || "");
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const processAddFreelance = async (data) => {
    const res = await addFreelance(data);
    if (res) {
      return res.data;
    } else {
      return false;
    }
  };

  const processGetFreelanceStats = async () => {
    const res = await getFreelanceStats(userId);
    if (res) {
      console.log(res.data);
      setFreelanceStats(res.data);
    } else {
      return false;
    }
  };

  const processGetProjectSubmissions = async (data) => {
    //console.log(userId);
    const res = await getProjectSubmissions(userId, data);
    if (res) {
      console.log(res.data);
      setProjectSubmissionList(res.data);
    }
  };

  const processGetAllFreelance = async () => {
    let response = await getFreelanceList();
    console.log("freelancers: ",response.data.data);
    if (response) {
      let newList = [];
      response.data.data.map((item) =>
        newList.push({
          id: item.id,
          user_id: item.user_id,
          avatar: item.profile_image,
          name: item.firstname + " " + item.lastname,
          bio: item.bio,
          skills: item.skills_id?.split(","),
          hourlyRate: item.hourly_rate,
          location: item.address,
          availableNow: true,
          rating: 7.5,
          language: item.languages,
          profession: item.profession,
          region:item.region,
          experience:item.experience,
        })
      );
      setFreelanceList(newList);
    } else {
      return false;
    }
  };

  const processFreelanceProfile = async (id) => {
    const res = await freelanceProfile(id);
    if (res) {
      let newData = [];
      let employmentData = [];
      res.freelance_info?.[0]?.skills_id?.split(",").map((item) =>
        newData.push({
          name: item,
          level: "Advanced (6+ years)",
          percentage: 80,
        })
      );

      res?.employment_history_info.map((item) =>
        employmentData.push({
          title: item.job_title + " at " + item.company_name,
          date: item.start_date + " " + item.end_date,
          description: item.duty,
          price: 0,
          ratings: 0,
          tags: [],
        })
      );

      setLanguagesData(JSON.parse(res?.freelance_info?.[0]?.languages));
      setEmploymentHistoryInfo(employmentData);
      setFreelanceSkillInfo(newData);
      setViewFreelanceProfile(res);
      //return res.data;
    } else {
      return false;
    }
  };

  const processGetJobsAppliedTo = async () => {
    try {
      //let new_user_id = sessionStorage.getItem("userId") || 625;
      let new_user_id = userId;
      let response = await jobsAppliedTo(new_user_id, 1);
      console.log(response.data);
      if (response) {
        setAppliedJobs(response.data);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const processGetFreelanceProjects = async () => {
    try {
      let response = await getFreelanceProjects(userId);
      console.log(response);
      if (response) {
        setFreelanceProjectList(response.projects);
        sessionStorage.setItem("chat_id", response.chat_id);
        sessionStorage.setItem(
          "project_ids",
          JSON.stringify(response.project_ids)
        );
        setFreelanceProjectStatus(true);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const processSearchFreelance = async () => {};

  const processUpdateFreelance = async (id, data) => {
    setIsSubmitting(true);
    try {
      const res = await updateFreelance(id, data);
      if (res) {
        return res.data;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFormData(initialFormData);
      setIsSubmitting(false);
    }
  };

  const processDeleteFreelance = async (id) => {
    const res = await deleteFreelance(id);
    if (res) {
      console.log("delete-freelancer", res);
      return res.data;
    } else {
      return false;
    }
  };

  const handleAddClick = () => {
    if (portfolios.length === 0) {
      toast.error("Please add a portfolio before proceeding.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (freelanceProfileData.length > 1 && freelanceProfileData[0].id) {
      toast.error(
        "A freelance profile already exists. Please edit the existing profile instead."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await processAddFreelance({ ...formData, user_id: userId });

      if (res) {
        await fetchProfile();
        toast.success("Freelance profile added successfully");
      }
    } catch (error) {
      console.error("Failed to add freelance profile", error);
      toast.error("Failed to add freelance profile");
    } finally {
      setIsSubmitting(false);
      setFormData(initialFormData);
    }
  };

  const handleUpdateFreelanceProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await processUpdateFreelance(freelanceProfileData[0]?.id, {
        ...formData,
        user_id: userId,
      });
      if (res) {
        await fetchProfile();
        toast.success("Freelance profile updated successfully");
      }
    } catch (e) {
      console.error();
      toast.error("Failed to update freelance profile");
    }
  };

  const handleEditFreelance = () => {
    console.log("freelanceProfileData[0]", freelanceProfileData[0]);
    if (!portfolios || portfolios.length === 0) {
      console.error("Portfolio options not loaded yet.");
      return;
    }

    const portfolioArray = Array.isArray(freelanceProfileData[0]?.portfolio_id)
      ? freelanceProfileData[0]?.portfolio_id.map(String)
      : typeof freelanceProfileData[0]?.portfolio_id === "string"
      ? freelanceProfileData[0]?.portfolio_id.startsWith("[") &&
        freelanceProfileData[0]?.portfolio_id.endsWith("]")
        ? JSON.parse(freelanceProfileData[0]?.portfolio_id).map(String)
        : freelanceProfileData[0]?.portfolio_id
            .split(",")
            .map((id) => id.trim())
      : [];

    console.log("portfolioArray", portfolioArray);

    const selectedPortfolioObjects = portfolioArray.map((id) => {
      const portfolio = portfolios?.find(
        (portfolio) => String(portfolio.id) === String(id)
      );
      if (portfolio) {
        return { value: portfolio.id, label: portfolio.project_title };
      } else {
        console.log("portfolio id: " + id + " not found in portfolios.");
        return null;
      }
    });

    console.log("selectedPortfolioObjects", selectedPortfolioObjects);

    setFormData({
      rate: freelanceProfileData[0]?.rate,
      experience: freelanceProfileData[0]?.experience,
      portfolio_id: selectedPortfolioObjects.map(
        (portfolio) => portfolio.value
      ),
    });

    setSelectedItems(selectedPortfolioObjects);
  };

  return (
    <FreelanceApiData.Provider
      value={{
        freelanceProfileData,
        formData,
        appliedJobs,
        selectedItems,
        setSelectedItems,
        setFormData,
        handleSubmit,
        handleAddClick,
        handleUpdateFreelanceProfile,
        handleEditFreelance,
        processAddFreelance,
        processGetFreelanceStats,
        processGetProjectSubmissions,
        processGetAllFreelance,
        processGetJobsAppliedTo,
        processFreelanceProfile,
        processSearchFreelance,
        processUpdateFreelance,
        processDeleteFreelance,
        freelanceList,
        projectSubmissionsList,
        languagesData,
        freelanceStats,
        employmentHistoryInfo,
        freelanceSkillInfo,
        viewFreelanceProfile,
        processGetFreelanceProjects,
        freelanceProjectList,
        freelanceProjectStatus,
      }}
    >
      {props.children}
    </FreelanceApiData.Provider>
  );
};

export default FreelanceApiDataProvider;
