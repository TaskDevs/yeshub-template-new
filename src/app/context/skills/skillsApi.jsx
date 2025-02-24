
import axios from "axios";
import {
	REACT_BASE_URL,
} from "../../../globals/constants";


export const addSkills = async (data) => {
  try {
    let responseOnAddSkills = await axios.post(`${REACT_BASE_URL}skills`, data);
    return responseOnAddSkills;
    
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Skills
export const searchSkills = async (keyword) => {
  try {
    const responseOnSearchSkills = await axios.get(
			`${REACT_BASE_URL}skills?keyword=${keyword}`
		);

    return responseOnSearchSkills.data || [];
  } catch (err) {
    console.error("search skills error:", err);
    return [];
  }
};

// LIST Skills
export const skillsList = async () => {
  try {
    const responseOnSkillsList = await axios.get(`${REACT_BASE_URL}skills`);
  
    return responseOnSkillsList.data || [];
  } catch (err) {
    console.error("failed to get all skills", err);
    return false;
  }
};

// VIEW Skills
/**Add View History API URL here like ${URL}api/getSkillsProfile/${id}**/
export const skillsProfile = async (id) => {
  try {
    let responseOnSkillsProfile = await axios.get(
			`${REACT_BASE_URL}skills/${id}`
		);

    return responseOnSkillsProfile.data || null;
  } catch (err) {
    console.error(`Skills Profile Error for ID ${id}`, err);
    return false;
  }
};

// UPDATE Skills
export const updateSkills = async (id, data) => {
  try {
    let responseOnUpdateSkills = await axios.put(
			`${REACT_BASE_URL}skills/${id}`,
			data
		);
    
    return responseOnUpdateSkills.data || [];
  } catch (err) {
    console.error(`failed to update skills for ID ${id}`, err);
    return false;
  }
};

// DELETE Skills
export const deleteSkills = async (id) => {
  try {
    let responseOnDeleteSkills = await axios.delete(
			`${REACT_BASE_URL}skills/${id}`
		);
    
    return responseOnDeleteSkills.data || [];
  } catch (err) {
    console.error(`failed to delete skills for ID ${id}`, err);
    return false;
  }
};




