import React, { createContext, useState, useContext, useEffect } from "react";


import {
  addApplication,
  applicationList,
  applicationProfile,
  updateApplication,
  deleteApplication,
  getAppliedJbsByEmpid,
} from "./applicationApi";
// import { APPLICATIONFIELD } from "../../../globals/application-data";

import { GlobalApiData } from "../global/globalContextApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { freelancerId, userId } from "../../../globals/constants";
import { JobApiData } from "../jobs/jobsContextApi";
import { calculateDaysLeft } from "../../../utils/readableDate";


export const ApplicationApiData = createContext();


const ApplicationApiDataProvider = (props) => {

  const [appliedJobs, setAppliedJobs] = useState([]);
  const {  selectedId, setSelectedId, setIsSubmitting } = useContext(GlobalApiData)
  const [isLoading, setIsLoading ] = useState(false);
  const { processAJobProfile } = useContext(JobApiData)
  const currentpath = useLocation().pathname;
  const [profile, setProfile] = useState({});
  const jobId = currentpath.split("/")[2];
  const navigate = useNavigate();
 


  // sessionStorage.setItem("Job_id", jobId)


  // console.log("profile-appctx", profile)
 

 
  
  const fetchProfileAndMatchJobs = async () => {
    if (!userId) return;

    setIsLoading(true)

    try {
      const res = await processApplicationProfile(userId);
      const data = res.data.data;
      // console.log("data-applied-ctx", data);

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


      // console.log("uniqueJobsMap-appctx", uniqueJobsMap)

      const uniqueJobIds = [
        ...new Set(filteredJobs.map((job) => job.job_id)),
      ];
      
      // console.log("uniqueJobIds-appctx", uniqueJobIds)

      const jobDetailsResponses = await Promise.all(
        uniqueJobIds.map((id) => processAJobProfile(id))
      );

      const jobsWithDetails = filteredJobs.map((appliedJob, index) => {
        const jobDetails = jobDetailsResponses[index]?.data || null; 
        return {
          ...appliedJob,
          jobDetails,
        };
      });

      // console.log("jobsWithDetails", jobsWithDetails)
      setAppliedJobs(jobsWithDetails);
    } catch (error) {
      console.error("Failed to fetch jobs data", error);
    } finally {
      setIsLoading(false)
    }
  };
  
  useEffect(() => {
    fetchProfileAndMatchJobs();
  }, [userId, jobId]);

  const fetchJobProfile = async () => {
    setIsLoading(true)
    try {
      
      const res = await processAJobProfile(jobId);
    
    setProfile(res?.data)
    } catch (e) {
      throw new Error("Failed to fetch job profile", e)
    }finally {
      setIsLoading(false)
    }
    
  }

  useEffect(() => {
    fetchJobProfile()
  }, [jobId]);






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

  const processGetAppliedJobsByUserId = async (id) => {
    try {
       const res = await getAppliedJbsByEmpid(id);
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

  const handleSubmmitApplication = async (id) => {
    const days_left = calculateDaysLeft(profile?.start_date, profile?.end_date)
    
    if (!userId)
    {
      toast.error("User does not exist, Please sign in");
      return;
    }
    
    if (days_left === 0) {
      toast.error("Can't apply, Job has expired!");
      return;
    }

    if (profile?.job_type === "Freelance") {
      if (!freelancerId) {
        toast.error("Please sign up as freelancer to apply.")
        return;
      }
      navigate(`/apply-job/${id}`)
     return;
    }


    if (profile?.job_type === "Full Time") {
      if (freelancerId)
        {
          toast.error("A freelancer can not apply for this job")
         return;
        }
    }

    
    if (appliedJobs?.some((job) => job.job_id === Number(id))) {
      toast.error("You have already applied for this job");
      return;
    }
    
    if (freelancerId)
      {
        if (currentpath.startsWith("/dashboard-candidate")) {
          navigate(`/dashboard-candidate/apply-job/${id}`)
          return;
        } else {
          navigate(`/apply-job/${id}`)
         return;
        }
       
      }
    

    setIsSubmitting(true)
    setIsLoading(true)
 
    try {
      const res =  await processAddApplication({
				user_id: userId,
				job_id: id,
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
      toast.error("Failed to apply")
      return false;
    } finally {
      setIsSubmitting(false);
      setIsLoading(false)
    }
  }


  const handleDeleteAppliedJob = async () => {
		if (!selectedId) {
			toast.error("Please select the applied job to delete");
			return;
		}
    // console.log("selectedId-del", selectedId)
		setIsSubmitting(true);

		try {
			const res = await processDeleteApplication(selectedId);
       await fetchProfileAndMatchJobs();
			if (res) {
				
				toast.success("Job deleted successfully");
			}
		} catch {
			toast.error("Failed to delete job applied");
			return false;
		} finally {
			setIsSubmitting(false);
      setSelectedId("")
		}
	}

  return (
		<ApplicationApiData.Provider
      value={{
        
        appliedJobs,
        isLoading, 
        setAppliedJobs,
        fetchProfileAndMatchJobs,    
				processAddApplication,
				processGetAllApplication,
				processApplicationProfile,
				processSearchApplication,
				processUpdateApplication,
				processDeleteApplication,
        handleDeleteAppliedJob,
				handleSubmmitApplication,
        processGetAppliedJobsByUserId,
			}}
		>
			{props.children}
		</ApplicationApiData.Provider>
	);
};

export default ApplicationApiDataProvider;
