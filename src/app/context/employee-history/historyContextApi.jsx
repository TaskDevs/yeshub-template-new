import React, { createContext } from "react";
// import { REACT_BASE_URL } from "../../../globals/constants";
// import { notify } from "../../../utils/responseUtils";

// import {
//   addHistory,
//   searchHistory,
//   historyList,
//   historyProfile,
//   updateHistory,
//   deleteHistory,
// } from "./historyApi";

export const HistoryApiData = createContext();

const HistoryApiDataProvider = (props) => {
  const processAddHistory = async () => {};

  const processGetAllHistory = async () => {};

  const processHistoryProfile = async () => {};

  const processSearchHistory = async () => {};

  const processUpdateHistory = async () => {};

  const processDeleteHistory = async () => {};

  return (
    <HistoryApiData.Provider
      value={{
        processAddHistory,
        processGetAllHistory,
        processHistoryProfile,
        processSearchHistory,
        processUpdateHistory,
        processDeleteHistory,
      }}
    >
      {props.children}
    </HistoryApiData.Provider>
  );
};

export default HistoryApiDataProvider;
