// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Portfolio
export const addPortfolio = async (data) => {
  try {
    let responseOnAddPortfolio = await axios.post(
      {
        /**Add Create Education API URL here**/
      },
      data
    );
    if (responseOnAddPortfolio.status === SUCCESS_STATUS) {
      return responseOnAddPortfolio.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Portfolio
export const searchPortfolio = async (data) => {
  try {
    let responseOnSearchPortfolio = await axios.get({
      /**Add Search Employer API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchPortfolio.status === SUCCESS_STATUS) {
      return responseOnSearchPortfolio.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Portfolio
export const portfolioList = async (pageNo) => {
  try {
    let responseOnPortfolioList = await axios.get({
      /**Add Get Portfolio API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnPortfolioList.status === SUCCESS_STATUS) {
      return responseOnPortfolioList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Portfolio
export const portfolioProfile = async (id) => {
  try {
    let responseOnPortfolioProfile = await axios.get({
      /**Add View Portfolio API URL here like ${URL}api/getEmployerProfile/${id}**/
    });

    if (responseOnPortfolioProfile.status === SUCCESS_STATUS) {
      return responseOnPortfolioProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Portfolio
export const updatePortfolio = async (data) => {
  try {
    let responseOnUpdatePortfolio = await axios.put({
      /**Add Update History API URL here like  `${URL}api/updateEmployer/${data.id}` **/
    });
    if (responseOnUpdatePortfolio.status === SUCCESS_STATUS) {
      return responseOnUpdatePortfolio.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Portfolio
export const deletePortfolio = async (data) => {
  try {
    let responseOnDeletePortfolio = await axios.delete({
      /**Add Delete Employer API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeletePortfolio.status === SUCCESS_STATUS) {
      return responseOnDeletePortfolio.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
