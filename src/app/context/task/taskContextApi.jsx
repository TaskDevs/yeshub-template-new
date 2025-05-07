import React, { createContext, useState } from "react";
import { notify } from "../../../utils/responseUtils";
import { addTask } from "./taskApi";

export const TaskApiData = createContext();

const TaskApiDataProvider = (props) => {
  const [taskData, setTaskData] = useState([]);
  const [taskProfile, setTaskProfile] = useState({});

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
