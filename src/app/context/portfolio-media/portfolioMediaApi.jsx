import axios from "axios";
import {
	SUCCESS_STATUS,
	REACT_BASE_URL,
} from "../../../globals/constants";

// ADD Portfolio
export const addPortfolioMedia = async (data) => {
  try {
    let responseOnAddPortfolio = await axios.post(
			`${REACT_BASE_URL}create-portfolio-media`,
			data
		);
    return responseOnAddPortfolio;
    
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Portfolio
export const searchPortfolio = async () => {
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
/**Add Get Portfolio API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
export const portfolioMediaList = async (id) => {
  try {
    let responseOnPortfolioList = await axios.get(
			`${REACT_BASE_URL}get-portfolio-media/${id}`
		);

    return responseOnPortfolioList;
   
  } catch {
    
    return false;
  }
};

// VIEW Portfolio
export const portfolioMediaProfile = async (id) => {
  try {
    let responseOnPortfolioProfile = await axios.get(`${REACT_BASE_URL}get-portfolio-media/${id}`);
    return responseOnPortfolioProfile;

  } catch (err) {
   
    return false;
  }
};

// UPDATE Portfolio
export const updatePortfolioMedia = async (id, data) => {
  try {
    let responseOnUpdatePortfolio = await axios.put(
			`${REACT_BASE_URL}update-portfolio-media/${id}`,
			data
		);
    return responseOnUpdatePortfolio;
   
  } catch  {
    return false;
  }
};

// DELETE Portfolio
export const deletePortfolioMedia = async (id) => {
  try {
    let responseOnDeletePortfolio = await axios.delete(
			`${REACT_BASE_URL}delete-portfolio-media/${id}`
		);
    return responseOnDeletePortfolio;
   
  } catch (err) {
    return false;
  }
};
