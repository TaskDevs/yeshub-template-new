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



// LIST SavedJobs
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
  


export const savedjobsList = async (token, id) => {
  try {
    const responseOnSavedJobsList = await axios.get(`${REACT_BASE_URL}saved-jobs?user_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseOnSavedJobsList;
  } catch (err) {
    console.error("failed to get all savedjobs", err);
    return false;
  }
};

// saved-jobs/{job_id}

// DELETE SavedJobs
export const deleteSavedJobs = async (job_id, id) => {
  try {
    let responseOnDeleteSavedJobs = await axios.delete(
			`${REACT_BASE_URL}saved-jobs/${job_id}?user_id=${id}`
		);
    console.log("responseOnDeleteSavedJobs", responseOnDeleteSavedJobs)
    return responseOnDeleteSavedJobs;
  } catch (err) {
    console.error(`failed to delete savedjobs for ID ${id}`, err);
    return false;
  }
};




