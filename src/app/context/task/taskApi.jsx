import axios from "axios";
import { SUCCESS_STATUS, REACT_BASE_URL } from "../../../globals/constants";

// Add Task
export const addTask = async (data) => {
  try {
    let responseOnAddTask = await axios.post(
      `${REACT_BASE_URL}create-task`,
      data
    );
    if (responseOnAddTask.status === SUCCESS_STATUS) {
      return responseOnAddTask.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
