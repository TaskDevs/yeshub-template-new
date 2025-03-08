import React, { createContext, useState, useContext, } from "react";

import {
  addMilestone,
  milestoneProfile,
  updateMilestone,
  deleteMilestone,
} from "./milestoneApi";
import { MILESTONEFIELD } from "../../../globals/milestone-data";
import { ApplicationApiData } from "../application/applicationContextApi";
import { freelancerId, userId } from "../../../globals/constants";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GlobalApiData } from "../global/globalContextApi";


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
  const {  fetchProfileAndMatchJobs, appliedJobs } = useContext(ApplicationApiData)
  const { setIsSubmitting, setIsLoading } = useContext(GlobalApiData)
  const currentpath = useLocation().pathname;
  const jobId = currentpath.split("/")[2];
  const navigate = useNavigate();

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
            console.log("delete milestone", res);
            return res;
          } catch (e) {
            throw new Error("Failed to delete milestone", e);
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
  setMilestones((prevMilestones) => [...prevMilestones, initialMilestone]);
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

    
    if (appliedJobs.some((job) => job.job_id === Number(jobId))) {
      toast.error("You have already applied for this job");
      return;
    }
    
    setIsSubmitting(true)
    setTimeout(() => {
      setIsLoading(true)
    }, 200)

    console.log("payload-milestones", milestones);

   console.log("payload-milestone", {
    milestones,
    user_id: userId,
    job_id: jobId,
    title: "testmilestone1",
    employer_status: "pending",
    freelancer_status: "pending",
    pay_status: "pending"
    
  })
    try {
      const res =  await processAddMilestone({     
        milestones: milestones,
			});
      if (res) {
        await fetchProfileAndMatchJobs();
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
      setMilestones([completeInitialMilestone]);
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
