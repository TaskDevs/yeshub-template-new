import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addProfile,
  searchProfile,
  profileList,
  profileProfile,
  updateProfile,
  deleteProfile,
} from "./profileApi";

export const ProfileApiData = createContext();

// status, (success_mssg = "Operation Successful"), fail_mssg;
const ProfileApiDataProvider = (props) => {

  const processAddProfile = async (data) => {
    const res = await addProfile(data);
    console.log("add-profile", res);

   notify(res.status, "Profile added successfully", "Failed to add profile");
    
  };

  const processGetAllProfile = async (id) => {
    const res = await profileList(id);
    console.log("profile-list", res);
    notify(res.status, "Profile fetched successfully", "Failed to fetch profile");
	};

  const processProfileProfile = async (id) => {
     const res = await profileProfile(id);
			console.log("profile", res);
			notify(
				res.status,
				"Profile fetched successfully",
				"Failed to fetch profile"
			);
  };

  const processSearchProfile = async (data) => {
   
  };

  const processUpdateProfile = async (id) => {
     const res = await updateProfile(id);
			console.log("profile", res);
			notify(
				res.status,
				"Profile fetched successfully",
				"Failed to fetch profile"
			);
  };

  const processDeleteProfile = async (id) => {
    const res = await deleteProfile(id);
		console.log("profile", res);
		notify(
			res.status,
			"Profile fetched successfully",
			"Failed to fetch profile"
		);
  };

  return (
    <ProfileApiData.Provider
      value={{
        processAddProfile,
        processGetAllProfile,
        processProfileProfile,
        processSearchProfile,
        processUpdateProfile,
        processDeleteProfile,
      }}
    >
      {props.children}
    </ProfileApiData.Provider>
  );
};

export default ProfileApiDataProvider;
