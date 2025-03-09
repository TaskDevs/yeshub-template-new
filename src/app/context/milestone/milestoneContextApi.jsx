import React, { createContext, useState, useContext, useEffect, } from "react";

import {
  addMilestone,
  milestoneProfile,
  updateMilestone,
  deleteMilestone,
} from "./milestoneApi";
import { MILESTONEFIELD } from "../../../globals/milestone-data";
// import { ApplicationApiData } from "../application/applicationContextApi";
import { freelancerId,  userId, getJobId } from "../../../globals/constants";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GlobalApiData } from "../global/globalContextApi";
import { JobApiData } from "../jobs/jobsContextApi";



const initialData = MILESTONEFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});



const initialMilestone =  MILESTONEFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});

export const MilestoneApiData = createContext();

const MilestoneApiDataProvider = (props) => {
  
  const [selectedOption, setSelectedOption] = useState("milestone");
  const [formData, setFormData] = useState(initialData)
  const { processAJobProfile } = useContext(JobApiData)
  const [appliedMilestones, setAppliedMilestones] = useState([]);
  const { setIsSubmitting, setIsLoading } = useContext(GlobalApiData)
  const currentpath = useLocation().pathname;
  const navigate = useNavigate();


  const job_Id =  currentpath.split("/")[2];
  const job_id = getJobId();
  const jobId =  sessionStorage.getItem("job_id");
 
  console.log("job_Id-milestone-location", job_Id)
  console.log("jobId-global", jobId)
  console.log("job_id-constants-milestonectx", job_id)

  const completeInitialMilestone = {
    ...initialMilestone,
    user_id: userId,
    job_id: jobId,
    freelance_id: freelancerId,
    employer_status: "pending",
    freelancer_status: "pending",
    pay_status: "pending"
};

const [milestones, setMilestones] = useState([completeInitialMilestone])

console.log("appliedMilestones-milestonectx", appliedMilestones)
console.log("milestones-milestonectx", milestones)

const fetchProfileMilestones = async () => {
  if (!jobId) return;

  try {
    const res = await processMilestoneProfile(jobId);
    const data = res.data.data;
    console.log("data-milestones-ctx", data);

    // const uniqueJobsMap = data.reduce((acc, current) => {
    //   const existingJob = acc.get(current.job_id);
    //   if (
    //     !existingJob ||
    //     new Date(current.created_at) > new Date(existingJob.created_at)
    //   ) {
    //     acc.set(current.job_id, current);
    //   }
    //   return acc;
    // }, new Map());

    // const filteredJobs = Array.from(uniqueJobsMap.values());


    // console.log("uniqueJobsMap-appctx", uniqueJobsMap)

    // const uniqueJobIds = [
    //   ...new Set(filteredJobs.map((job) => job.job_id)),
    // ];
    
    

    const jobDetailsResponses = await Promise.all(
      data?.map((job) => processAJobProfile(job.job_id))
    );

    console.log("uniqueJobIds-appctx", jobDetailsResponses)

    const jobsWithDetails = data.map((appliedJob, index) => {
      const jobDetails = jobDetailsResponses[index]?.data || null; // Ensure safe access
      return {
        ...appliedJob,
        jobDetails,
      };
    });

    console.log("jobsWithDetails", jobsWithDetails)
    setAppliedMilestones(jobsWithDetails);
  } catch (error) {
    console.error("Failed to fetch jobs data", error);
  }
};

useEffect(() => {
  fetchProfileMilestones();
}, [jobId]);


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
            console.log("add milestone", res);
            return res;
          } catch (e) {
            throw new Error("Failed to delete milestone", e);
          }
  };

  const processGetAllMilestone = async () => {};

  const processMilestoneProfile = async (id) => {
    try {
            const res = await milestoneProfile(id);
            console.log("milestone profile", res);
            return res;
          } catch (e) {
            throw new Error("Failed to get milestone profile", e);
          }
  };

  const processSearchMilestone = async () => {};

  const processUpdateMilestone = async (id, data) => {
    try {
            const res = await updateMilestone(id, data);
            console.log("delete milestone", res);
            return res;
          } catch (e) {
            throw new Error("Failed to delete milestone", e);
          }
  };

  const processDeleteMilestone = async (id) => {
      try {
              const res = await deleteMilestone(id);
              console.log("delete milestone", res);
              return res;
            } catch (e) {
              throw new Error("Failed to delete milestone", e);
            }
};


const addMilestones = () => {
  setMilestones((prevMilestones) => [...prevMilestones, completeInitialMilestone]);
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


const handleSubmitMilestoneApplication = async (e) => {
    e.preventDefault();
    
    if (selectedOption === "project") {
      toast.error("Sorry, we're still working on this project")
      return;
    }

    
    if (appliedMilestones?.some((job) => job.job_id === Number(jobId))) {
      toast.error("You have already applied for this job");
      return;
    }
    
    setIsSubmitting(true)
    setTimeout(() => {
      setIsLoading(true)
    }, 200)

    try {
      const res =  await processAddMilestone({     
        milestones: milestones,
			});
      console.log("res-milestone", res)
      if (res) {
        await fetchProfileMilestones();
        navigate(`/dashboard-candidate/applied-jobs`)
        setTimeout(() => {
          toast.success("Job applied successfully")
        }, 3000)
      }
     
    } catch {
      setTimeout(() => {
        toast.error("Failed to apply")
      }, 3100)
      return false;
    } finally {
      setIsSubmitting(false);
      setMilestones([{
        ...initialMilestone,
        user_id: userId,
        job_id: jobId,
        freelance_id: freelancerId,
        employer_status: "pending",
        freelancer_status: "pending",
        pay_status: "pending"
      }]);
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
}
  

const handleUpdateMilestone = async () => {};




  return (
		<MilestoneApiData.Provider
			value={{
				formData,
        selectedOption,
        milestones, 
        appliedMilestones,
        setMilestones,
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
				handleUpdateMilestone,
			}}
		>
			{props.children}
		</MilestoneApiData.Provider>
	);
};

export default MilestoneApiDataProvider;
