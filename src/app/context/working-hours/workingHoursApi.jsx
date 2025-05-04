import axios from "axios";
import cookieMethods from "../../../utils/cookieUtils";

import {
	REACT_BASE_URL,
} from "../../../globals/constants";

// ADD working hours
export const addWorkingHours = async (data) => {
  try {
    let authenticator = cookieMethods.getCookies();

    if (authenticator.refreshToken) {
        let responseOnAddWorkingHours = await axios.post(
          `${REACT_BASE_URL}work-hours`,
          data,
        );
  
        return responseOnAddWorkingHours;
      }


    
  } catch (err) {
    console.log(err);
    return false;
  }
};


// LIST Working Hours
export const workingHoursList = async () => {
  try {
    let responseOnWorkingHoursList = await axios.get(
			`${REACT_BASE_URL}work-hours`
		);

    return responseOnWorkingHoursList;
   
  } catch {
    
    return false;
  }
};



// UPDATE working hours
export const updateWorkingHours = async (id, data) => {
  try {
    let responseOnUpdateWorkingHours = await axios.put(
			`${REACT_BASE_URL}work-hours/${id}`,
			data
		);
    return responseOnUpdateWorkingHours;
   
  } catch  {
    return false;
  }
};


// DELETE working hours
export const deleteWorkingHours = async (id) => {
  try {
    let responseOnDeleteWorkingHours = await axios.delete(
			`${REACT_BASE_URL}work-hours/${id}`
		);
    return responseOnDeleteWorkingHours;
   
  } catch (err) {
    return false;
  }
};
