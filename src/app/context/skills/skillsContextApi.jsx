import React, { createContext, useState,  useContext } from "react";

import {
  addSkills,
  skillsList,
  skillsProfile,
  updateSkills,
  deleteSkills,
} from "./skillsApi";
import { SKILLSFIELD } from "../../../globals/skills-data";
import { GlobalApiData } from "../global/globalContextApi";
import { toast } from "react-toastify";


export const SkillsApiData = createContext();

const SkillsApiDataProvider = (props) => {

	const initialData = SKILLSFIELD.fieldDetail.reduce((acc, field) => {
		acc[field.name] = "";
		return acc;
	}, {});
	const [formData, setFormData] = useState(initialData);
	

	

	const { selectedId } = useContext(GlobalApiData);

	const [skills, setSkills] = useState([]);

	const [skill, setSkill] = useState({});

	
	const handleChange = (field, data) => {
		setFormData((prev) => ({ ...prev, [field]: data }));
	};


	const processAddSkills = async (data) => {
		try {
			const res = await addSkills(data);
			console.log("processAddSkills", res);

			if (res && res.data) {
				setSkills((prevSkills) => [...prevSkills, res.data]);
				return res;
				
			} 
		} catch (error) {
			console.error("Add Skills Error:", error);
			
		}
	};

	


	
	
	const processGetAllSkills = async () => {
		try {
			const res = await skillsList();

			return res;
		} catch (error) {
			console.error("get-all-skills-failed", error);
		}
	};

	const processSkillsProfile = async (id) => {
		try {
			const res = await skillsProfile(id);

			// console.log("get-skill", res);
			return res;
		} catch (err) {
			console.error("failed to get skill", err);
		}
	};

	const processSearchSkills = async (data) => {};

	const processUpdateSkills = async (id, data) => {
		try {
			const res = await updateSkills(id, data);
  
			console.log("update-skill", res);
			return res;
		} catch (e) {
			console.error("Error updating skill", e);
		}
	};

	const processDeleteSkills = async (id) => {
		try {
			const res = await deleteSkills(id);

			console.log("delete-skill", res);
			return res;
		} catch (e) {
			console.error("Failed to delete skill", e);
		}
  };
  
	const handleAddSkills = async (e) => {
	   console.log("submitting skills", formData);
		e.preventDefault();
		try {
			const res = await processAddSkills(formData);
			console.log("add-skills", res);
			toast.success("Skills added successfully")
			return res;
		} catch (e) {
			console.error("failed to add skills", e);
			toast.error("Failed to add skills");
		} finally {			
			setFormData(initialData);
		}
  };
  
	
		const handleUpdateSkills = async (e) => {
			e.preventDefault();
			try {
				const res = await processUpdateSkills(selectedId, formData);
				toast.success("Skills updated successfully");
				return res;
			} catch (e) {
				console.error("error updating skill", e);
				toast.error("Failed to updat skill");
			} finally {
				setFormData(initialData);
			}
		};



	return (
		<SkillsApiData.Provider
			value={{
				skill,
				skills,
				formData,
				setSkill,
				setSkills,
				processAddSkills,
				processGetAllSkills,
				processSkillsProfile,
				processSearchSkills,
				processUpdateSkills,
				processDeleteSkills,
				setFormData,
				handleChange,
				handleAddSkills,
				handleUpdateSkills,
			}}
		>
			{props.children}
		</SkillsApiData.Provider>
	);
};

export default SkillsApiDataProvider;
