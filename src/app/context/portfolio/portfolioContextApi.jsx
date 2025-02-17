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
import { PORTFOLIOFIELD } from "../../../globals/portfolio-data";

export const PortfolioApiData = createContext();

const PortfolioApiDataProvider = (props) => {


   const [formData, setFormData] = useState(
       PORTFOLIOFIELD.fieldDetail.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {})
  );
  
   const handleChange = (field, data) => {
			setFormData({
				...formData,
				[field]: data,
			});
		};



  const processAddPortfolio = async (data) => {
    try{
      const res = await addPortfolio(data);
      console.log("add-portfolio", res);
      
    }catch(err) {
      console.error("failed to add-portfolio", err)
    }
  };

  const processGetAllPortfolio = async (userid) => {
    try {
			const res = await portfolioList(userid);
			console.log("get-portfolio", res);
		} catch (err) {
			console.error("failed to get-portfolio", err);
		}
  };

  const processPortfolioProfile = async (id) => {};

  const processSearchPortfolio = async (data) => {};

  const processUpdatePortfolio = async (userid, data) => {
     try {
			const res = await updatePortfolio(userid, data);
			console.log("update-portfolio", res);
		} catch (err) {
			console.error("failed to update-portfolio", err);
		}
  };

  const processDeletePortfolio = async (id) => {
     try {
			const res = await deletePortfolio(id);
			console.log("delete-portfolio", res);
		} catch (err) {
			console.error("failed to delete-portfolio", err);
		}
  };

  return (
    <PortfolioApiData.Provider
      value={{
        processAddPortfolio,
        processGetAllPortfolio,
        processPortfolioProfile,
        processSearchPortfolio,
        processUpdatePortfolio,
        processDeletePortfolio,
        formData,
        handleChange
      }}
    >
      {props.children}
    </PortfolioApiData.Provider>
  );
};

export default PortfolioApiDataProvider;
