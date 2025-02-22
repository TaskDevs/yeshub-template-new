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


export const ApplicationApiData = createContext();


const ApplicationApiDataProvider = (props) => {
   const [selectedOption, setSelectedOption] = useState("milestone");
   const { setIsSubmitting } = useContext(GlobalApiData)

     
  
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
      console.log("add application", res);
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
				console.log("get application", res);
				return res;
			} catch (e) {
				throw new Error("Failed to get application", e);
			}
  };

  const processSearchApplication = async (data) => {};

  const processUpdateApplication = async (id, data) => {
     try {
				const res = await updateApplication(id, data);
				console.log("update application", res);
				return res;
			} catch (e) {
				throw new Error("Failed to update application", e);
			}
  };

  const processDeleteApplication = async (id) => {
     try {
				const res = await deleteApplication(id);
				console.log("delete application", res);
				return res;
			} catch (e) {
				throw new Error("Failed to delete application", e);
			}
  };

  const handleSubmmitApplication = async () => {
    setIsSubmitting(true)
    console.log("submitting applicatication")
    try {
      const res = await processAddApplication({
				user_id: "3",
				job_id: "1",
				status: "pending",
				freelance_id: "",
			});
      console.log("application added", res);
    } catch (e) {
      throw new Error ("Couldn't add application", e);
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
