import React, { createContext, useState, useContext } from "react";
import { notify } from "../../../utils/responseUtils";

import {
	addSkills,
	skillsList,
	updateSkills,
	deleteSkills,
} from "./skillsApi";
import { SKILLSFIELD } from "../../../globals/skills-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";

export const SkillsApiData = createContext();

const initialData = SKILLSFIELD.fieldDetail.reduce((acc, field) => {
	acc[field.name] = "";
	return acc;
}, {});
const SkillsApiDataProvider = (props) => {
	const [skillOptions, setSkillOptions] = useState(null);
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

			// Safely add new skill
			if (res && res.data) {
				setSkills((prevSkills) => [...prevSkills, res.data]);
				notify("Skill added successfully", "success");
			} else {
				notify("Failed to add skill", "error");
			}
		} catch (error) {
			console.error("Add Skills Error:", error);
			notify("Error adding skill", "error");
		}
	};

	const processGetAllSkills = async () => {
		try {
			const res = await skillsList();
           
			const skills = res.data;

			return skills;
		} catch (error) {
			setSkills([]);
		}
	};

	// const processSkillsProfile = async (id) => {
	// 	try {
	// 		const res = await skillsProfile(id);

	// 		return res;
	// 	} catch (err) {
	// 		throw new Error("failed to get skill", err);
	// 	}
	// };

	

	const processUpdateSkills = async (id, data) => {
		const res = await updateSkills(id, data);

		return res;
	};

	const processDeleteSkills = async (id) => {
		const res = await deleteSkills(id);
		return res;
	};

	const handleAddSkills = async (e) => {
		e.preventDefault();
		try {
			await processAddSkills(formData);
			toast.success("Skills added successfully");
		} catch (e) {
			toast.error("Failed to add Skills ");
		} finally {
			setFormData({
				skill: "",
			});
		}
	};

	const handleUpdateSkills = async (e) => {
		e.preventDefault();
		try {
			const res = await processUpdateSkills(selectedId, formData);

			toast.success("Skills updated successfully");
			return res;
		} catch (e) {
			toast.error("Failed to update Skills");
			throw new Error("failed to update skills", e);
		} finally {
			setFormData({
				skill: "",
			});
		}
	};

	return (
		<SkillsApiData.Provider
			value={{
				skill,
				skills,
				setSkill,
				setSkills,
				skillOptions,
				formData,
				setSkillOptions,
				processAddSkills,
				processGetAllSkills,
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
