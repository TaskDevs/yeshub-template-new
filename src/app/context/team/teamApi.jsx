import axios from "axios";
import { REACT_BASE_URL } from "../../../globals/constants";

// Add A Team
export const addTeam = async (data) => {
  try {
    let responseOnAddTeam = await axios.post(`${REACT_BASE_URL}add-team`, data);
    return responseOnAddTeam;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addStaff = async (data) => {
  try {
    let responseOnAddStaff = await axios.post(
      `${REACT_BASE_URL}add-staff-to-team`,
      data
    );
    return responseOnAddStaff;
  } catch (err) {
    console.log(err);
    return false;
  }
};
