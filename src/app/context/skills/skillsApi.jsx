// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Skills
export const addSkills = async (data) => {
  try {
    let responseOnAddSkills = await axios.post(
      {
        /**Add Create Education API URL here**/
      },
      data
    );
    if (responseOnAddSkills.status === SUCCESS_STATUS) {
      return responseOnAddSkills.data;
    } else {
      return false;
    }
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
export const skillsList = async (pageNo) => {
  try {
    let responseOnSkillsList = await axios.get({
      /**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnSkillsList.status === SUCCESS_STATUS) {
      return responseOnSkillsList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Skills
export const skillsProfile = async (id) => {
  try {
    let responseOnSkillsProfile = await axios.get({
      /**Add View History API URL here like ${URL}api/getSkillsProfile/${id}**/
    });

    if (responseOnSkillsProfile.status === SUCCESS_STATUS) {
      return responseOnSkillsProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Skills
export const updateSkills = async (data) => {
  try {
    let responseOnUpdateSkills = await axios.put({
      /**Add Update History API URL here like  `${URL}api/updateEmployer/${data.id}` **/
    });
    if (responseOnUpdateSkills.status === SUCCESS_STATUS) {
      return responseOnUpdateSkills.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Skills
export const deleteSkills = async (data) => {
  try {
    let responseOnDeleteSkills = await axios.delete({
      /**Add Delete Employer API URL here like  `/api/deleteSkills/${data}` **/
    });
    if (responseOnDeleteSkills.status === SUCCESS_STATUS) {
      return responseOnDeleteSkills.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
