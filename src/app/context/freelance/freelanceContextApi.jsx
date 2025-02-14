import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addFreelance,
  searchFreelance,
  freelanceList,
  freelanceProfile,
  updateFreelance,
  deleteFreelance,
} from "./freelanceApi";

export const FreelanceApiData = createContext();

const FreelanceApiDataProvider = (props) => {
  const processAddFreelance = async (data) => {};

  const processGetAllFreelance = async (id) => {};

  const processFreelanceProfile = async (id) => {};

  const processSearchFreelance = async (data) => {};

  const processUpdateFreelance = async (data) => {};

  const processDeleteFreelance = async (id) => {};

  return (
    <FreelanceApiData.Provider
      value={{
        processAddFreelance,
        processGetAllFreelance,
        processFreelanceProfile,
        processSearchFreelance,
        processUpdateFreelance,
        processDeleteFreelance,
      }}
    >
      {props.children}
    </FreelanceApiData.Provider>
  );
};

export default FreelanceApiDataProvider;
