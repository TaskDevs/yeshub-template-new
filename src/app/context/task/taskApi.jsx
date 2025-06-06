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

export const getContractOfUser = async () => {
  try {
    let responseOnGetContractOfUser = await axios.get(
      `${REACT_BASE_URL}get-all-contract`
    );
    //console.log(responseOnGetContractOfUser);
    if (responseOnGetContractOfUser.status == 200) {
      return responseOnGetContractOfUser.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const submitWork = async (data) => {
  try {
    let responseOnSubmitWork = await axios.post(
      `${REACT_BASE_URL}submit-work`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(responseOnSubmitWork);
    if (responseOnSubmitWork.status == 200) {
      return responseOnSubmitWork.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
