// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import { SUCCESS_STATUS, LIST_ON_PAGES, baseURL } from "../../../globals/constants";

// ADD Skills
/**Add Create Education API URL here**/
export const addSkills = async (data) => {
  try {
    let responseOnAddSkills = await axios.post(
    
      `${baseURL}skills`,
      data
    );
    return responseOnAddSkills;
    // if (responseOnAddSkills.status === SUCCESS_STATUS) {
    //   return responseOnAddSkills.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Skills
export const searchSkills = async (keyword) => {
  try {
    const responseOnSearchSkills = await axios.get(
      `${baseURL}skills?keyword=${keyword}`
    );

    console.log("search-skills", responseOnSearchSkills);

    return responseOnSearchSkills.data || [];
  } catch (err) {
    console.error("search skills error:", err);
    return [];
  }
};

// LIST Skills
export const skillsList = async () => {
  try {
    const responseOnSkillsList = await axios.get(
			`${baseURL}skills`
		);
    console.log("get-all-skills", responseOnSkillsList);
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
			`${baseURL}skills/${id}`
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
      `${baseURL}skills/${id}`,
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
			`${baseURL}skills/${id}`
		);
    
    return responseOnDeleteSkills.data || [];
  } catch (err) {
    console.error(`failed to delete skills for ID ${id}`, err);
    return false;
  }
};




