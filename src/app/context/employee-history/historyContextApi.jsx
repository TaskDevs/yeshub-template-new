import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addHistory,
  searchHistory,
  historyList,
  historyProfile,
  updateHistory,
  deleteHistory,
} from "./historyApi";

export const HistoryApiData = createContext();

const HistoryApiDataProvider = (props) => {
  const processAddHistory = async (data) => {};

  const processGetAllHistory = async (id) => {};

  const processHistoryProfile = async (id) => {};

  const processSearchHistory = async (data) => {};

  const processUpdateHistory = async (data) => {};

  const processDeleteHistory = async (id) => {};

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
