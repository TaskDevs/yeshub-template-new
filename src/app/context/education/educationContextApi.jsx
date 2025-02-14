import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addEducation,
  searchEducation,
  eductionList,
  // educationEducation,
  educationProfile,
  updateEducation,
  deleteEducation,
} from "./educationApi";

export const EducationApiData = createContext();

const EducationApiDataProvider = (props) => {
  

  const processAddEducation = async (data) => {
    const res = await addEducation(data);
    console.log("add-education", res);
    
       notify(res.status, "Education added successfully", "Failed to add education");

  };

  const processGetAllEducation = async (id) => {};
  const processSearchEducation = async (data) => {};

  const processEducationEducation = async (id) => {

    const res = await educationProfile(id);
		console.log("get-education", res);

		notify(
			res.status,
			"Education added successfully",
			"Failed to add education"
		);
  };



  const processUpdateEducation = async (data) => {
    const res = await updateEducation(data);
		console.log("update-education", res);

		notify(
			res.status,
			"Education updated successfully",
			"Failed to add education"
		);
  };

  const processDeleteEducation = async (id) => {
    const res = await deleteEducation(id);
		console.log("delete-education", res);

		notify(
			res.status,
			"Education added successfully",
			"Failed to add education"
		);
  };

  return (
    <EducationApiData.Provider
      value={{
        processAddEducation,
        processGetAllEducation,
        processEducationEducation,
        processSearchEducation,
        processUpdateEducation,
        processDeleteEducation,
      }}
    >
      {props.children}
    </EducationApiData.Provider>
  );
};

export default EducationApiDataProvider;
