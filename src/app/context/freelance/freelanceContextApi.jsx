import React, { createContext } from "react";
// import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
// import { notify } from "../../../utils/responseUtils";

// import {
//   addFreelance,
//   searchFreelance,
//   freelanceList,
//   freelanceProfile,
//   updateFreelance,
//   deleteFreelance,
// } from "./freelanceApi";

export const FreelanceApiData = createContext();

const FreelanceApiDataProvider = (props) => {
  const processAddFreelance = async () => {};

  const processGetAllFreelance = async () => {};

  const processFreelanceProfile = async () => {};

  const processSearchFreelance = async () => {};

  const processUpdateFreelance = async () => {};

  const processDeleteFreelance = async () => {};

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
