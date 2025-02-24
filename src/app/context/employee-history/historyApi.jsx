// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS } from "../../../globals/constants";

// ADD History
export const addHistory = async (data) => {
  try {
    let responseOnAddHistory = await axios.post(
      {
        /**Add Create Education API URL here**/
      },
      data
    );
    if (responseOnAddHistory.status === SUCCESS_STATUS) {
      return responseOnAddHistory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH History
export const searchHistory = async () => {
  try {
    let responseOnSearchHistory = await axios.get({
      /**Add Search History API URL here like /searchHistory?keyword=${data}**/
    });
    if (responseOnSearchHistory.status === SUCCESS_STATUS) {
      return responseOnSearchHistory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST History
export const historyList = async () => {
  try {
    let responseOnHistoryList = await axios.get(
      `${REACT_BASE_URL}get-history`
    );

    if (responseOnHistoryList.status === SUCCESS_STATUS) {
      return responseOnHistoryList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW History
export const historyProfile = async () => {
  try {
    let responseOnHistoryProfile = await axios.get({
      /**Add View History API URL here like ${URL}api/getHistoryProfile/${id}**/
    });

    if (responseOnHistoryProfile.status === SUCCESS_STATUS) {
      return responseOnHistoryProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE History
export const updateHistory = async () => {
  try {
    let responseOnUpdateHistory = await axios.put({
      /**Add Update History API URL here like  `${URL}api/updateHistory/${data.id}` **/
    });
    if (responseOnUpdateHistory.status === SUCCESS_STATUS) {
      return responseOnUpdateHistory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE History
export const deleteHistory = async () => {
  try {
    let responseOnDeleteHistory = await axios.delete({
      /**Add Delete History API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeleteHistory.status === SUCCESS_STATUS) {
      return responseOnDeleteHistory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
