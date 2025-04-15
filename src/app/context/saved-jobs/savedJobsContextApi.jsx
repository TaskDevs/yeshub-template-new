import React, { createContext, useContext, useEffect, useState } from "react";

import { savedJobs, savedjobsList, deleteSavedJobs } from "./savedJobsApi";
import toast from "react-hot-toast";
import { GlobalApiData } from "../global/globalContextApi";
import { userId } from "../../../globals/constants";

export const SavedJobsApiData = createContext();

const SavedJobsApiDataProvider = (props) => {
  const [savedjobsData, setSavedJobsData] = useState([]);
  const { setIsSubmitting } = useContext(GlobalApiData);

  const getAllSavedJobs = async () => {
    try {
      const res = await processGetAllSavedJobs();
    
      setSavedJobsData(res.data);
    } catch (error) {
      console.error("get-all-savedjobs-failed", error);
      setSavedJobsData([]);
    }
  };

  useEffect(() => {
    getAllSavedJobs();
  }, []);


  const processAddSavedJobs = async (data) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const res = await savedJobs(data, token);
      await getAllSavedJobs();
     
      if (res && res.data) {
        toast.success("Job saved successfully");
      }
    } catch (error) {
      toast.error("Failed to save job");
    }
  };

  const processGetAllSavedJobs = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      const res = await savedjobsList(token, userId);
      return res;
    } catch (error) {
      return false;
    }
  };

  const processDeleteSavedJobs = async (job_id, id) => {
    const res = await deleteSavedJobs(job_id, id);
    return res;
  };

  const handleDeleteSavedJobs = async (job_id, id) => {
    
    setIsSubmitting(true);
    try {
      await processDeleteSavedJobs(job_id, id);
      await getAllSavedJobs();
      toast.success("savedjobs deleted successfully");
    } catch (error) {
      toast.error("Failed to delete savedjobs");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SavedJobsApiData.Provider
      value={{
        savedjobsData,
        setSavedJobsData,
        processAddSavedJobs,
        processGetAllSavedJobs,
        processDeleteSavedJobs,
        handleDeleteSavedJobs,
      }}
    >
      {props.children}
    </SavedJobsApiData.Provider>
  );
};

export default SavedJobsApiDataProvider;
