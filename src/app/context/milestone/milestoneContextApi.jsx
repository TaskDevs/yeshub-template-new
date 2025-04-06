import React, { createContext, useState, useContext, useEffect } from "react";

import {
  addMilestone,
  milestoneProfile,
  updateMilestone,
  deleteMilestone,
  milestoneList,
} from "./milestoneApi";
import { MILESTONEFIELD } from "../../../globals/milestone-data";
// import { ApplicationApiData } from "../application/applicationContextApi";
import { freelancerId, userId } from "../../../globals/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GlobalApiData } from "../global/globalContextApi";
// import { JobApiData } from "../jobs/jobsContextApi";

const initialData = MILESTONEFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});

const initialMilestone = MILESTONEFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});

export const MilestoneApiData = createContext();

const MilestoneApiDataProvider = (props) => {
  const [selectedOption, setSelectedOption] = useState("milestone");
  const [formData, setFormData] = useState(initialData);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(null);
  const [appliedMilestones, setAppliedMilestones] = useState([]);
  const [appliedAllMilestones, setAppliedAllMilestones] = useState([]);
  const { setIsSubmitting } = useContext(GlobalApiData);
  const [isLoading, setIsLoading ] = useState(false);
  const [jobMilestones, setJobMilestones] = useState([])
  const [jobId, setJobId] = useState(
    () => sessionStorage.getItem("job_id") || ""
  );
  const [sessionStorageUpdated, setSessionStorageUpdated] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const interval = setInterval(() => {
      const newJobId = sessionStorage.getItem("job_id") || "";
      if (newJobId !== jobId) {
        setJobId(newJobId);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [jobId]); 

  const completeInitialMilestone = {
    ...initialMilestone,
    user_id: userId,
    job_id: jobId,
    freelance_id: freelancerId,
    employer_status: "pending",
    freelancer_status: "pending",
    pay_status: "pending",
  };

  const [milestones, setMilestones] = useState([completeInitialMilestone]);

  useEffect(() => {
    if (jobId) {
      const currentCompleteInitialMilestone = {
        ...initialMilestone,
        user_id: userId,
        job_id: jobId,
        freelance_id: freelancerId,
        employer_status: "pending",
        freelancer_status: "pending",
        pay_status: "pending",
      };
      setMilestones([currentCompleteInitialMilestone]);
    }
  }, [jobId, userId, freelancerId, initialMilestone]);

  useEffect(() => {
    if (sessionStorageUpdated) {
      setSessionStorageUpdated(false); 
    }
  }, [sessionStorageUpdated]);

 

  const fetchMilestones = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const res = await processGetAllMilestone(userId);
      const data = res.data.data;
      // console.log("all-milestones-mctx", data);

      const uniqueJobsMap = data.reduce((acc, current) => {
        const existingJob = acc.get(current.job_id);
        if (
          !existingJob ||
          new Date(current.created_at) > new Date(existingJob.created_at)
        ) {
          acc.set(current.job_id, current);
        }
        return acc;
      }, new Map());

      const filteredJobs = Array.from(uniqueJobsMap.values());
      

      setAppliedMilestones(filteredJobs);
      setAppliedAllMilestones(data);
      setJobMilestones(data)
    } catch (error) {
      console.error("Failed to fetch jobs data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);
// userId


  const handleChange = (index, data, field) => {
    setMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [field.name]: data,
      };
      return updatedMilestones;
    });
  };

  const processAddMilestone = async (data) => {
    try {
      const res = await addMilestone(data);
      // console.log("add milestone", res);
      return res;
    } catch (e) {
      throw new Error("Failed to add milestone", e);
    }
  };

  const processGetAllMilestone = async (id) => {
    try {
      const res = await milestoneList(id);
      // console.log("res", res);
      return res;
    } catch (e) {
      throw new Error("Failed to get milestone", e);
    }
  };

  const processMilestoneProfile = async (id) => {
    try {
      const res = await milestoneProfile(id);
      // console.log("milestone profile", res);
      return res;
    } catch (e) {
      throw new Error("Failed to get milestone profile", e);
    }
  };

  const processSearchMilestone = async () => {};

  const processUpdateMilestone = async (id, data) => {
    try {
      const res = await updateMilestone(id, data);
      // console.log("delete milestone", res);
      return res;
    } catch (e) {
      throw new Error("Failed to update milestone", e);
    }
  };

  const processDeleteMilestone = async (id) => {
    try {
      const res = await deleteMilestone(id);
      // console.log("delete milestone", res);
      return res;
    } catch (e) {
      throw new Error("Failed to delete milestone", e);
    }
  };

  const addMilestones = () => {
    setMilestones((prevMilestones) => [
      ...prevMilestones,
      completeInitialMilestone,
    ]);
  };

  const removeMilestone = () => {
    setMilestones((prevMilestones) => {
      if (prevMilestones.length > 1) {
        return prevMilestones.slice(0, prevMilestones.length - 1);
      } else {
        return prevMilestones;
      }
    });
  };

  const handleSubmitMilestoneApplication = async (id) => {
   console.log("handleSubmitMilestoneApplication-id", id)
    if (selectedOption === "project") {
      toast.error("Sorry, we're still working on this project");
      return;
    }

    if (appliedMilestones?.some((job) => job.job_id === Number(id))) {
      toast.error("You have already applied for this job");
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const res = await processAddMilestone({
        milestones: milestones,
      });
      // console.log("res-milestone", res)
      if (res) {     
        navigate(`/dashboard-candidate/applied-jobs`);
        await fetchMilestones();
        setTimeout(() => {
          toast.success("Job applied successfully");
        }, 3000);
      }
    } catch {
      setTimeout(() => {
        toast.error("Failed to apply");
      }, 3100);
      return false;
    } finally {
      setIsSubmitting(false);
      setMilestones([
        {
          ...initialMilestone,
          user_id: userId,
          job_id: id,
          freelance_id: freelancerId,
          employer_status: "pending",
          freelancer_status: "pending",
          pay_status: "pending",
        },
      ]);
      setIsLoading(false);
    }
  };



  const handleDeleteteMilestone = async () => {
    if (!selectedMilestoneId) {
      toast.error("Please select the milestone to delete");
      return;
    }
    setIsSubmitting(true);
    try {
      await processDeleteMilestone(selectedMilestoneId);
      await fetchMilestones();
      toast.success("Portfolio deleted successfully");
    } catch {
      toast.error("Failed to delete portfolio");
      return false;
    } finally {
      setIsSubmitting(false);
      setSelectedMilestoneId(null);
    }
  };

  return (
    <MilestoneApiData.Provider
      value={{
        formData,
        selectedOption,
        milestones,
        jobMilestones, 
        isLoading,
        appliedMilestones,
        selectedMilestoneId,
        setJobMilestones,
        appliedAllMilestones,
        setAppliedAllMilestones,
        setSelectedMilestoneId,
        setMilestones,
        fetchMilestones,
        handleChange,
        setSelectedOption,
        setFormData,
        processAddMilestone,
        processGetAllMilestone,
        processMilestoneProfile,
        processSearchMilestone,
        processUpdateMilestone,
        processDeleteMilestone,
        addMilestones,
        removeMilestone,
        handleSubmitMilestoneApplication,
        handleDeleteteMilestone,
      }}
    >
      {props.children}
    </MilestoneApiData.Provider>
  );
};

export default MilestoneApiDataProvider;
