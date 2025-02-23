import React, { createContext, useState } from "react";

import {
  addMilestone,
  milestoneProfile,
  updateMilestone,
  deleteMilestone,
} from "./milestoneApi";

const initialData = {}


export const MilestoneApiData = createContext();

const MilestoneApiDataProvider = (props) => {
  const [formData, setFormData] = useState(initialData)

  const processAddMilestone = async (data) => {
    try {
            const res = await addMilestone(data);
            console.log("delete milestone", res);
            return res;
          } catch (e) {
            throw new Error("Failed to delete milestone", e);
          }
  };

  const processGetAllMilestone = async () => {};

  const processMilestoneProfile = async (id) => {
    try {
            const res = await milestoneProfile(id);
            console.log("delete milestone", res);
            return res;
          } catch (e) {
            throw new Error("Failed to delete milestone", e);
          }
  };

  const processSearchMilestone = async () => {};

  const processUpdateMilestone = async (id, data) => {
    try {
            const res = await updateMilestone(id, data);
            console.log("delete milestone", res);
            return res;
          } catch (e) {
            throw new Error("Failed to delete milestone", e);
          }
  };

  const processDeleteMilestone = async (id) => {
      try {
              const res = await deleteMilestone(id);
              console.log("delete milestone", res);
              return res;
            } catch (e) {
              throw new Error("Failed to delete milestone", e);
            }
  };


  const handleSubmitMilestone = async () => { }
  

  const handleUpdateMilestone = async () => {};

  return (
		<MilestoneApiData.Provider
			value={{
				formData,
				setFormData,
				processAddMilestone,
				processGetAllMilestone,
				processMilestoneProfile,
				processSearchMilestone,
				processUpdateMilestone,
				processDeleteMilestone,
				handleSubmitMilestone,
				handleUpdateMilestone,
			}}
		>
			{props.children}
		</MilestoneApiData.Provider>
	);
};

export default MilestoneApiDataProvider;
