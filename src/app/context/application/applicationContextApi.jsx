import React, { createContext, useState, useEffect, useContext } from "react";


import {
  addApplication,
  applicationList,
  applicationProfile,
  updateApplication,
  deleteApplication,
} from "./applicationApi";
import { APPLICATIONFIELD } from "../../../globals/application-data";

import { GlobalApiData } from "../global/globalContextApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userId } from "../../../globals/constants";
import { JobApiData } from "../jobs/jobsContextApi";


export const ApplicationApiData = createContext();


const ApplicationApiDataProvider = (props) => {

  const [appliedJobs, setAppliedJobs] = useState([]);
   const [selectedOption, setSelectedOption] = useState("milestone");
  const {  setIsSubmitting, setIsLoading } = useContext(GlobalApiData)
  const { processAJobProfile } = useContext(JobApiData)
  const currentpath = useLocation().pathname;
  const jobId = currentpath.split("/")[2];
  const navigate = useNavigate();
 
     
  
  const initialData = APPLICATIONFIELD.fieldDetail.slice(2).reduce(
		(acc, field) => {
			acc[field.name] = "";
			return acc;
		},
		{ selectedOption }
	);

   const [formData, setFormData] = useState(initialData)

  useEffect(() => {
		setFormData((prev) => ({
			...prev,
			selectedOption, 
		}));
  }, [selectedOption]);
  
  const fetchProfileAndMatchJobs = async () => {
    if (!userId) return;

    try {
      const res = await processApplicationProfile(userId);
      const data = res.data.data;
      // console.log("data", data);

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

      const uniqueJobIds = [
        ...new Set(filteredJobs.map((job) => job.job_id)),
      ];

      const jobDetailsResponses = await Promise.all(
        uniqueJobIds.map((jobId) => processAJobProfile(jobId))
      );

      const jobsWithDetails = filteredJobs.map((appliedJob, index) => {
        const jobDetails = jobDetailsResponses[index]?.data || null; // Ensure safe access
        return {
          ...appliedJob,
          jobDetails,
        };
      });
      setAppliedJobs(jobsWithDetails);
    } catch (error) {
      console.error("Failed to fetch jobs data", error);
    }
  };
  
  useEffect(() => {
    

    fetchProfileAndMatchJobs();
    // const interval = setInterval(fetchProfileAndMatchJobs, 60000);
    // return () => clearInterval(interval); 
  }, [userId]);





  const processAddApplication = async (data) => {
    try {
      const res = await addApplication(data);
     
      return res;
    } catch (e) {
      throw new Error("Failed to add application", e)
    }
  };

  const processGetAllApplication = async (id) => {
     try {
				const res = await applicationList(id);
				// console.log("get all applications", res);
				return res;
			} catch (e) {
				throw new Error("Failed to get all applications", e);
			}
  };

  
  const processApplicationProfile = async (id) => {
     try {
				const res = await applicationProfile(id);
				return res;
			} catch (e) {
				throw new Error("Failed to get application", e);
			}
  };

  const processSearchApplication = async () => {};

  const processUpdateApplication = async (id, data) => {
     try {
				const res = await updateApplication(id, data);
			
				return res;
			} catch (e) {
				throw new Error("Failed to update application", e);
			}
  };

  const processDeleteApplication = async (id) => {
     try {
				const res = await deleteApplication(id);
				
				return res;
			} catch (e) {
				throw new Error("Failed to delete application", e);
			}
  };

  const handleSubmmitApplication = async () => {
    
    if (!userId)
    {
      toast.error("User does not exist, Please sign in");
      return;
    }

    
    if (appliedJobs.some((job) => job.job_id === Number(jobId))) {
      toast.error("You have already applied for this job");
      return;
    }
    
    setIsSubmitting(true)
    setTimeout(() => {
      setIsLoading(true)
    }, 200)
  //  console.log("emp-id-apply", selectedId)
    try {
      const res =  await processAddApplication({
				user_id: userId,
				job_id: jobId,
				status: "pending",
				freelance_id: "",
        
			});
      if (res) {
        // console.log("app-res", res)
        await fetchProfileAndMatchJobs()
        navigate(`/dashboard-candidate/applied-jobs`)
        setTimeout(() => {
          toast.success("Job applied successfully")
        }, 3000)
      }
     
    } catch {
      setTimeout(() => {
        toast.error("Failed to apply job")
      }, 3000)
      return false;
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  }

  return (
		<ApplicationApiData.Provider
      value={{
        formData,
        selectedOption,
        appliedJobs, 
        setAppliedJobs,
        setFormData,
        setSelectedOption,
				processAddApplication,
				processGetAllApplication,
				processApplicationProfile,
				processSearchApplication,
				processUpdateApplication,
				processDeleteApplication,
				handleSubmmitApplication,
			}}
		>
			{props.children}
		</ApplicationApiData.Provider>
	);
};

export default ApplicationApiDataProvider;
