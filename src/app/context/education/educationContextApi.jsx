import React, { createContext, useState, useContext, useEffect } from "react";


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
	const { setIsSubmitting, selectedId, setSelectedId, setIsLoading } = useContext(GlobalApiData);

	const initialFormData = EDUCATIONFIELD.fieldDetail.reduce((acc, field) => {
		acc[field.name] = "";
		return acc;
	}, {});

	const [formData, setFormData] = useState(initialFormData);

	const [educationData, setEducationData] = useState([]);

	
	const fetchEducationData = async () => {
		setIsLoading(true)
		try {
			const res = await processEducationEducation(userId);
		
			const data = res.data.data;
			setEducationData(data);
		} catch (err) {
			console.error("Failed to get education", err);
		}finally {
			setIsLoading(false)
		}
		
	};

	useEffect(() => {
		
		fetchEducationData();
	}, []);
	
	
	
	
	
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
			await fetchEducationData();
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
			await fetchEducationData();
			console.log("update-edu", res);
			return res;
		} catch (e) {
			throw new Error("Failed to update education");
		} finally {
			setIsSubmitting(false);
			setFormData(initialFormData);
			setSelectedId(null)
		}
	};

	const handleDeleteEducation = async () => {
		if (!selectedId) {
			toast.error("Please select the education profile to delete");
			return;
		}
		setIsSubmitting(true);
		try {
			const res =await processDeleteEducation(selectedId);
			await fetchEducationData();
			if (res) {
				toast.success("Education profile deleted successfully");
			}
		} catch {
			toast.error("Failed to delete education");
			return false;
		} finally {
			setIsSubmitting(false);
			setSelectedId("");
		}
	};

	return (
		<EducationApiData.Provider
			value={{
				initialFormData,
				formData,
				educationData,
				fetchEducationData,
				setFormData,
				processAddEducation,
				processGetAllEducation,
				processEducationEducation,
				processSearchEducation,
				processUpdateEducation,
				processDeleteEducation,
				handleAddEducation,
				handleUpdateEducation,
				handleDeleteEducation
			}}
		>
			{props.children}
		</EducationApiData.Provider>
	);
};

export default EducationApiDataProvider;
