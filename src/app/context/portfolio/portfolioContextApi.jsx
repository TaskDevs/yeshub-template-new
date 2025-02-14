import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addPortfolio,
  searchPortfolio,
  portfolioList,
  portfolioProfile,
  updatePortfolio,
  deletePortfolio,
} from "./portfolioApi";

export const PortfolioApiData = createContext();

const PortfolioApiDataProvider = (props) => {
  const processAddPortfolio = async (data) => {};

  const processGetAllPortfolio = async (id) => {};

  const processPortfolioProfile = async (id) => {};

  const processSearchPortfolio = async (data) => {};

  const processUpdatePortfolio = async (data) => {};

  const processDeletePortfolio = async (id) => {};

  return (
    <PortfolioApiData.Provider
      value={{
        processAddPortfolio,
        processGetAllPortfolio,
        processPortfolioProfile,
        processSearchPortfolio,
        processUpdatePortfolio,
        processDeletePortfolio,
      }}
    >
      {props.children}
    </PortfolioApiData.Provider>
  );
};

export default PortfolioApiDataProvider;
