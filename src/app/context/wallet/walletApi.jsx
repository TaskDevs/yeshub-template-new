// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Wallet
export const addWallet = async (data) => {
  try {
    let responseOnAddWallet = await axios.post(
      {
        /**Add Create Education API URL here**/
      },
      data
    );
    if (responseOnAddWallet.status === SUCCESS_STATUS) {
      return responseOnAddWallet.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Wallet
export const searchWallet = async (data) => {
  try {
    let responseOnSearchWallet = await axios.get({
      /**Add Search Wallet API URL here like /searchWallet?keyword=${data}**/
    });
    if (responseOnSearchWallet.status === SUCCESS_STATUS) {
      return responseOnSearchWallet.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Wallet
export const walletList = async (pageNo) => {
  try {
    let responseOnWalletList = await axios.get({
      /**Add Get Wallet API URL here like /api/getWallet?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnWalletList.status === SUCCESS_STATUS) {
      return responseOnWalletList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Wallet
export const WalletProfile = async (id) => {
  try {
    let responseOnWalletProfile = await axios.get({
      /**Add View Wallet API URL here like ${URL}api/getWalletProfile/${id}**/
    });

    if (responseOnWalletProfile.status === SUCCESS_STATUS) {
      return responseOnWalletProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Wallet
export const updateWallet = async (data) => {
  try {
    let responseOnUpdateWallet = await axios.put({
      /**Add Update Wallet API URL here like  `${URL}api/updateWallet/${data.id}` **/
    });
    if (responseOnUpdateWallet.status === SUCCESS_STATUS) {
      return responseOnUpdateWallet.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Wallet
export const deleteWallet = async (data) => {
  try {
    let responseOnDeleteWallet = await axios.delete({
      /**Add Delete Wallet API URL here like  `/api/deleteWallet/${data}` **/
    });
    if (responseOnDeleteWallet.status === SUCCESS_STATUS) {
      return responseOnDeleteWallet.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
