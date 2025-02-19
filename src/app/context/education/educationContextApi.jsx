import React, { createContext, useState, useEffect, useContext } from "react";
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
import { GlobalApiData } from "../global/globalContextApi";
import { userId } from "../../../globals/dummy-users";

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
			console.log("add-education", res);
			return res;
		} catch (e) {
			toast.error("Failed to add education");
			throw new Error("Error adding education", e);
		}
	};

	const processGetAllEducation = async (id) => {};
	const processSearchEducation = async (data) => {};

	const processEducationEducation = async (id) => {
		try {
			const res = await educationProfile(id);
			console.log("get-education", res);
			// toast.success("education ")
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
			console.log("delete-education", res);
			toast.success("Eduacation deleted successfully");
			return res;
		} catch (e) {
			toast.error("Failed to delete education");
			throw new Error("Failed to delete education");
		}
	};

	const handleAddEducation = async (e) => {
		e.preventDefault();
		try {
            console.log("ed-form", { ...formData, user_id: userId });
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
