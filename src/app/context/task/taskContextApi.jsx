import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";
import { addTask, getContractOfUser, submitWork } from "./taskApi";

export const TaskApiData = createContext();

const TaskApiDataProvider = (props) => {
  const [taskData, setTaskData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [taskProfile, setTaskProfile] = useState({});

  const processGetContractOfUser = async () => {
    try {
      const response = await getContractOfUser();
      if (response) {
        let newData = [];
        response.data.map((item) =>
          newData.push({
            id: item.id,
            contractName: item.contract_name,
            completionDate: "Dec 31, 2024",
            status: item.status,
            totalValue: item.total_amount,
            actions: ["Submit Work", "Message"],
          })
        );
        setContractData(newData);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const processSubmitWork = async (data) => {
    try {
      const response = await submitWork(data);
      if (response) {
        return {
          success: true,
          message: "Work submitted successfully",
        };
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const processAddTask = async (data) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      notify(400, "User ID not found. Please log in again.");
      return;
    }

    const requestData = {
      ...data,
      user_id: userId,
    };

    let response = await addTask(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      notify(200, "Task Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Company, API Response:", response);
      notify(400, "Failed to Add Company");
    }
  };

  return (
    <TaskApiData.Provider
      value={{
        processAddTask,
        processGetContractOfUser,
        processSubmitWork,
        contractData,
        taskData,
        setTaskData,
        taskProfile,
        setTaskProfile,
      }}
    >
      {props.children}
    </TaskApiData.Provider>
  );
};

export default TaskApiDataProvider;
