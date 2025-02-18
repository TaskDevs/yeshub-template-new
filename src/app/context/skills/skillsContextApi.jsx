import React, { createContext, useState, useEffect, useContext } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addSkills,
  searchSkills,
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

	useEffect(() => {
		if (!selectedId) {
			return;
		}
		const fetchSkill = async () => {
			try {
				const res = await skillsProfile(selectedId);

				console.log("get-skill", res);
				const data = res.data.data;
				console.log("skill", data.skill);
				setSkill(data);

				setFormData({
					skill: data.skill || "",
				});
			} catch (err) {
				console.error("failed to get skill", err);
			}
		};
		fetchSkill();
	}, [selectedId]);

	useEffect(() => {
		const fetchAllSkills = async () => {
			try {
				const res = await processGetAllSkills();

				console.log("get-all-skills", res);
				const data = res?.data.data;
				setSkills(data);
			} catch (error) {
				console.error("get-all-skills-failed", error);
			}
		};
		fetchAllSkills();
	}, []);

	

	const handleChange = (field, data) => {
		setFormData((prev) => ({ ...prev, [field]: data }));
	};

	const processAddSkills = async (data) => {
		try {
			const res = await addSkills(data);
			console.log("processAddSkills", res);
			return res;
			
		} catch (error) {
			console.error("", error);
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

			console.log("get-skill", res);
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
			return res;
		} catch (e) {
			console.error("failed to add skills", e);
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
