import React, { createContext, useState, useContext } from "react";


import {
	addEducation,
	educationProfile,
	updateEducation,
	deleteEducation,
} from "./educationApi";
import { EDUCATIONFIELD } from "../../../globals/education-data";
import { toast } from "react-toastify";
import { GlobalApiData } from "../global/globalContextApi";
import { userId } from "../../../globals/constants";


export const EducationApiData = createContext();

const EducationApiDataProvider = (props) => {
	const { setIsSubmitting, selectedId } = useContext(GlobalApiData);

	const initialFormData = EDUCATIONFIELD.fieldDetail.reduce((acc, field) => {
		acc[field.name] = "";
		return acc;
	}, {});

	const [formData, setFormData] = useState(initialFormData);

	const processAddEducation = async (data) => {
		try {
			const res = await addEducation(data);
			toast.success("Education added successfully");
			// console.log("add-education", res);
			return res;
		} catch (e) {
			toast.error("Failed to add education");
			throw new Error("Error adding education", e);
		}
	};

	const processGetAllEducation = async () => {};
	const processSearchEducation = async () => {};

	const processEducationEducation = async (id) => {
		try {
			const res = await educationProfile(id);
			// console.log("get-education", res);
			
			return res;
		} catch (e) {
			toast.error("Failed to get education");
			throw new Error("Error getting education", e);
		}
	};

	const processUpdateEducation = async (id, data) => {
		try {
			const res = await updateEducation(id, data);
			console.log("update-education", res);
			toast.success("Education updated successfully");
			return res;
		} catch (e) {
			toast.error("Failed to update education");
			throw new Error("Failed to update education");
		}
	};

	const processDeleteEducation = async (id) => {
		try {
			const res = await deleteEducation(id);
			// console.log("delete-education", res);
			
			return res;
		} catch (e) {
			
			throw new Error("Failed to delete education");
		}
	};

	const handleAddEducation = async (e) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			
			const res = await processAddEducation({...formData, user_id: userId});
			console.log("add-edu", res);
			return res;
		} catch (e) {
			throw new Error("Failed to add education");
		} finally {
			setIsSubmitting(false);
			setFormData(initialFormData);
		}
	};

	const handleUpdateEducation = async (e) => {
		e.preventDefault();
		
		try {
			setIsSubmitting(true);
			const res = await processUpdateEducation(selectedId, formData);
			console.log("update-edu", res);
			return res;
		} catch (e) {
			throw new Error("Failed to update education");
		} finally {
			setIsSubmitting(false);
			setFormData(initialFormData);
		}
	};

	return (
		<EducationApiData.Provider
			value={{
				initialFormData,
				formData,
				setFormData,
				processAddEducation,
				processGetAllEducation,
				processEducationEducation,
				processSearchEducation,
				processUpdateEducation,
				processDeleteEducation,
				handleAddEducation,
				handleUpdateEducation,
			}}
		>
			{props.children}
		</EducationApiData.Provider>
	);
};

export default EducationApiDataProvider;
