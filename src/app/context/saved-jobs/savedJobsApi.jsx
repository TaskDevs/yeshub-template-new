import axios from "axios";
import {
	REACT_BASE_URL,
} from "../../../globals/constants";


// export const savedJobs = async (data) => {
//   try {
//     let responseOnSavedJobs = await axios.post(`${REACT_BASE_URL}saved-jobs`, data);
//     return responseOnSavedJobs;
    
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };



// LIST Skills
export const savedJobs = async (data, token) => {
    try {
      const responseOnSavedJobs = await axios.post(
        `${REACT_BASE_URL}saved-jobs`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return responseOnSavedJobs;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  




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
export const skillsProfile = async () => {
  try {
    let responseOnSkillsProfile = await axios.get(
			// `${REACT_BASE_URL}skills/${id}`
		);

    return responseOnSkillsProfile.data || null;
  } catch {
    // console.error(`Skills Profile Error for ID ${id}`, err);
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




