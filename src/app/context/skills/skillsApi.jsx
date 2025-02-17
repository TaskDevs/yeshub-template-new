// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import { SUCCESS_STATUS, LIST_ON_PAGES, baseURL } from "../../../globals/constants";

console.log("baseURL", baseURL);
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
export const searchSkills = async (data) => {
  try {
    let responseOnSearchSkills = await axios.get({
      /**Add Search Skills API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchSkills.status === SUCCESS_STATUS) {
      return responseOnSearchSkills.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Skills
export const skillsList = async () => {
  try {
    let responseOnSkillsList = await axios.get(
		
			`${baseURL}skills`
		);
    return responseOnSkillsList;
    // if (responseOnSkillsList.status === SUCCESS_STATUS) {
    //   return responseOnSkillsList.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
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

    // if (responseOnSkillsProfile.status === SUCCESS_STATUS) {
    //   return responseOnSkillsProfile.data;
    // } else {
    //   return false;
    // }
    return responseOnSkillsProfile;
  } catch (err) {
    console.log(err);
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
    // if (responseOnUpdateSkills.status === SUCCESS_STATUS) {
    //   return responseOnUpdateSkills.data;
    // } else {
    //   return false;
    // }
    return responseOnUpdateSkills;
  } catch (err) {
    console.log(err);
  }
};

// DELETE Skills
export const deleteSkills = async (id) => {
  try {
    let responseOnDeleteSkills = await axios.delete(
			`${baseURL}skills/${id}`
		);
    if (responseOnDeleteSkills.status === SUCCESS_STATUS) {
      return responseOnDeleteSkills.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};




