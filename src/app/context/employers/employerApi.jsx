// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Employer
export const addEmployer = async (data) => {
  try {
    let responseOnAddEmployer = await axios.post(
      {
        /**Add Create Education API URL here**/
      },
      data
    );
    if (responseOnAddEmployer.status === SUCCESS_STATUS) {
      return responseOnAddEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Employer
export const searchEmployer = async (data) => {
  try {
    let responseOnSearchEmployer = await axios.get({
      /**Add Search Employer API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchEmployer.status === SUCCESS_STATUS) {
      return responseOnSearchEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Employer
export const employerList = async (pageNo) => {
  try {
    let responseOnEmployerList = await axios.get({
      /**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnEmployerList.status === SUCCESS_STATUS) {
      return responseOnEmployerList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Employer
export const employerProfile = async (id) => {
  try {
    let responseOnEmployerProfile = await axios.get({
      /**Add View History API URL here like ${URL}api/getEmployerProfile/${id}**/
    });

    if (responseOnEmployerProfile.status === SUCCESS_STATUS) {
      return responseOnEmployerProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Employer
export const updateEmployer = async (data) => {
  try {
    let responseOnUpdateEmployer = await axios.put({
      /**Add Update History API URL here like  `${URL}api/updateEmployer/${data.id}` **/
    });
    if (responseOnUpdateEmployer.status === SUCCESS_STATUS) {
      return responseOnUpdateEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Employer
export const deleteEmployer = async (data) => {
  try {
    let responseOnDeleteEmployer = await axios.delete({
      /**Add Delete Employer API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeleteEmployer.status === SUCCESS_STATUS) {
      return responseOnDeleteEmployer.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
