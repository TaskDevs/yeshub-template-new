import axios from "axios";
import {
  REACT_BASE_URL,
  userId,
  //SUCCESS_STATUS,
} from "../../../globals/constants";

export const createWalletForUser = async () => {
  try {
    let responseOnCreateWalletForUser = await axios.post(
      `${REACT_BASE_URL}wallet/create`,
      {
        user_id: userId,
      }
    );
    if (responseOnCreateWalletForUser.status == 200) {
      return responseOnCreateWalletForUser.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getTransactionOfClient = async () => {
  try {
    let responseOnGetTransactionOfUser = await axios.get(
      `${REACT_BASE_URL}client/wallet/transactions?user_id=${userId}`
    );
    // console.log(responseOnGetTransactionOfUser);
    return responseOnGetTransactionOfUser;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getTransactionFreelancer = async () => {
  try {
    let responseOnGetTransactionOfFreelance = await axios.get(
      `${REACT_BASE_URL}freelance/wallet/transactions?user_id=${userId}`
    );
    return responseOnGetTransactionOfFreelance;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const makeWithdrawal = async (data) => {
  try {
    let responseOnMakeWithdrawal = await axios.post(
      `${REACT_BASE_URL}wallet/subtract`,
      data
    );
    if (responseOnMakeWithdrawal.status == 200) {
      return responseOnMakeWithdrawal.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
