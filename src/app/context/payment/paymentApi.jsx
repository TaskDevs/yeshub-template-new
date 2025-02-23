// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS } from "../../../globals/constants";

// ADD Payment
export const addPayment = async (data) => {
  try {
    let responseOnAddPayment = await axios.post(
      {
        /**Add Create Education API URL here**/
      },
      data
    );
    if (responseOnAddPayment.status === SUCCESS_STATUS) {
      return responseOnAddPayment.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Payment
export const searchPayment = async () => {
  try {
    let responseOnSearchPayment = await axios.get({
      /**Add Search Payment API URL here like /searchEmployer?keyword=${data}**/
    });
    if (responseOnSearchPayment.status === SUCCESS_STATUS) {
      return responseOnSearchPayment.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Payment
export const paymentList = async () => {
  try {
    let responseOnPaymentList = await axios.get({
      /**Add Get Payment API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnPaymentList.status === SUCCESS_STATUS) {
      return responseOnPaymentList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Payment
export const paymentProfile = async () => {
  try {
    let responseOnPaymentProfile = await axios.get({
      /**Add View History API URL here like ${URL}api/getPaymentProfile/${id}**/
    });

    if (responseOnPaymentProfile.status === SUCCESS_STATUS) {
      return responseOnPaymentProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Payment
export const updatePayment = async () => {
  try {
    let responseOnUpdatePayment = await axios.put({
      /**Add Update History API URL here like  `${URL}api/updateEmployer/${data.id}` **/
    });
    if (responseOnUpdatePayment.status === SUCCESS_STATUS) {
      return responseOnUpdatePayment.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Payment
export const deletePayment = async () => {
  try {
    let responseOnDeletePayment = await axios.delete({
      /**Add Delete Payment API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeletePayment.status === SUCCESS_STATUS) {
      return responseOnDeletePayment.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
