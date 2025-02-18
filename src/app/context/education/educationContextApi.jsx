import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addEducation,
  searchEducation,
  eductionList,
  educationProfile,
  updateEducation,
  deleteEducation,
} from "./educationApi";
import { EDUCATIONFIELD } from "../../../globals/education-data";
import { toast } from "react-toastify";

export const EducationApiData = createContext();

const EducationApiDataProvider = (props) => {
  
	 const [formData, setFormData] = useState(
			EDUCATIONFIELD.fieldDetail.reduce((acc, field) => {
				acc[field.name] = "";
				return acc;
			}, {})
		);

	
  

  const processAddEducation = async (data) => {
	  try {
		const res = await addEducation(data);
    console.log("add-education", res);
    
    notify(res.status, "Education added successfully", "Failed to add education");
	  } catch (e) {
		  throw new Error("Error adding education", e)
		  toast.error("")
	}
    

  };

  const processGetAllEducation = async (id) => {};
  const processSearchEducation = async (data) => {};

  const processEducationEducation = async (id) => {

    const res = await educationProfile(id);
		console.log("get-education", res);

		notify(
			res.status,
			"Education added successfully",
			"Failed to add education"
		);
  };



  const processUpdateEducation = async (id,data) => {
    const res = await updateEducation(id,data);
		console.log("update-education", res);

		notify(
			res.status,
			"Education updated successfully",
			"Failed to add education"
		);
  };

  const processDeleteEducation = async (id) => {
    const res = await deleteEducation(id);
		console.log("delete-education", res);

		notify(
			res.status,
			"Education added successfully",
			"Failed to add education"
		);
  };

	const handleAddEducation = async (e) => {
		e.preventDefault();
		const res = await processAddEducation(formData);
		console.log("add-edu",res);
	}

	const handleUpdateEducation = async (e) => {
		e.preventDefault();
		const res = await processUpdateEducation(formData);
		console.log("update-edu", res);
	};



  return (
		<EducationApiData.Provider
			value={{
				processAddEducation,
				processGetAllEducation,
				processEducationEducation,
				processSearchEducation,
				processUpdateEducation,
				processDeleteEducation,
				handleAddEducation,
			  handleUpdateEducation,
			  formData,
			  setFormData
			}}
		>
			{props.children}
		</EducationApiData.Provider>
	);
};

export default EducationApiDataProvider;
