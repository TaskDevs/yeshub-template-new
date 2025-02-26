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


export const ApplicationApiData = createContext();


const ApplicationApiDataProvider = (props) => {
  
   const [selectedOption, setSelectedOption] = useState("milestone");
  const { setIsSubmitting } = useContext(GlobalApiData)
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
				console.log("get all applications", res);
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
    setIsSubmitting(true)
   
    try {
      await processAddApplication({
				user_id: userId,
				job_id: jobId,
				status: "pending",
				freelance_id: "",
			});
     
      toast.success("Job applied successfully")
      navigate(`/dashboard-candidate/applied-jobs`)
    } catch {
      toast.error("Failed to apply job");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
		<ApplicationApiData.Provider
      value={{
        formData,
        selectedOption,
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
