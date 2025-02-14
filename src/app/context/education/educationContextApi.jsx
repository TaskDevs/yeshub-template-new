import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addEducation,
  searchEducation,
  eductionList,
  educationProfile,
  updateEducation,
  deleteEducation,
} from "./educationApi";

export const EducationApiData = createContext();

const EducationApiDataProvider = (props) => {
  const processAddEducation = async (data) => {};

  const processGetAllEducation = async (id) => {};

  const processEducationProfile = async (id) => {};

  const processSearchEducation = async (data) => {};

  const processUpdateEducation = async (data) => {};

  const processDeleteEducation = async (id) => {};

  return (
    <EducationApiData.Provider
      value={{
        processAddEducation,
        processGetAllEducation,
        processEducationProfile,
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
