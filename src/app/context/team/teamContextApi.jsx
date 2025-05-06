import React, { createContext } from "react";
import { notify } from "../../../utils/responseUtils";
import { addTeam, addStaff } from "./teamApi";

export const TeamApiData = createContext();

const TeamApiDataProvider = (props) => {
  //   const [teamData, setTeamData] = useState([]);
  //   const [teamProfile, setTeamProfile] = useState({});

  const processAddTeam = async (data) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      notify(400, "User ID not found. Please log in again.");
      return;
    }

    const requestData = {
      ...data,
      user_id: userId,
    };

    let response = await addTeam(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      notify(200, "Team Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Team, API Response:", response);
      notify(400, "Failed to Add Team");
    }
  };

  const processAddStaff = async (data) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      notify(400, "User ID not found. Please log in again");
      return;
    }

    const requestData = {
      ...data,
      user_id: userId,
    };

    let response = await addStaff(requestData);

    if (response) {
      console.log("API Response:", response); // Log the API response
      notify(200, "Team Added Successfully");
      // Reload the page after a short delay (optional)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Failed to Add Team, API Response:", response);
      notify(400, "Failed to Add Team");
    }
  };

  return (
    <TeamApiData.Provider
      value={{
        processAddTeam,
        processAddStaff,
      }}
    >
      {props.children}
    </TeamApiData.Provider>
  );
};

export default TeamApiDataProvider;
