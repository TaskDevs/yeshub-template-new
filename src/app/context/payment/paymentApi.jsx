// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import {
  SUCCESS_STATUS,
  REACT_BASE_URL,
  userId,
} from "../../../globals/constants";

export const getFinanceSettingInfo = async () => {
  try {
    let responseOnGetFinanceSettingInfo = await axios.get(
      `${REACT_BASE_URL}get-finance-setting?user_id=${userId}`
    );
    if (responseOnGetFinanceSettingInfo.status == SUCCESS_STATUS) {
      return responseOnGetFinanceSettingInfo.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getTotalInvoice = async () => {
  try {
    let responseOnGetTotalInvoice = await axios.get(
      `${REACT_BASE_URL}count-invoice`
    );
    if (responseOnGetTotalInvoice.status == SUCCESS_STATUS) {
      return responseOnGetTotalInvoice.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPaymentsOnFreelancer = async () => {
  try {
    let responseOnGetPaymentsOfFreelance = await axios.get(
      `${REACT_BASE_URL}invoices-of-freelance/${userId}`
    );
    //console.log(responseOnGetPaymentsOfFreelance);
    if (responseOnGetPaymentsOfFreelance.status == 200) {
      return responseOnGetPaymentsOfFreelance.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPaymentsOnClient = async () => {
  try {
    let responseOnGetPaymentsOfClient = await axios.get(
      `${REACT_BASE_URL}invoices-of-client/${userId}`
    );
    if (responseOnGetPaymentsOfClient.status == 200) {
      return responseOnGetPaymentsOfClient.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getInvoiceDetails = async (id) => {
  try {
    let responseOnGetInvoiceDetails = await axios.get(
      `${REACT_BASE_URL}get-invoice-of-details?id=${id}`
    );
    if (responseOnGetInvoiceDetails.status == 200) {
      return responseOnGetInvoiceDetails;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const editInvoice = async (id, data) => {
  console.log(data);
  try {
    let responseOnEditInvoice = await axios.put(
      `${REACT_BASE_URL}edit-invoice?invoiceId=${id}`,
      data
    );
    if (responseOnEditInvoice.status == 200) {
      return responseOnEditInvoice;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteInvoice = async (id) => {
  try {
    let responseOnDeleteInvoice = await axios.delete(
      `${REACT_BASE_URL}delete-invoice?id=${id}`
    );
    if (responseOnDeleteInvoice.status == 200) {
      return responseOnDeleteInvoice;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getInvoiceOfUser = async () => {
  try {
    let responseOnGetInvoiceOfUser = await axios.get(
      `${REACT_BASE_URL}get-invoice-of-user?user_id=${userId}`
    );
    if (responseOnGetInvoiceOfUser.status == 200) {
      return responseOnGetInvoiceOfUser.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createInvoice = async (data) => {
  try {
    let responseOnCreateInvoice = await axios.post(
      `${REACT_BASE_URL}invoices`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (
      responseOnCreateInvoice.status == SUCCESS_STATUS ||
      responseOnCreateInvoice.status == 200
    ) {
      return {
        status: "success",
        message: responseOnCreateInvoice.data.message,
      };
    } else {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }
  } catch (err) {
    if (err.status == 409 || err.status == 400) {
      console.log(err);
      return {
        status: "error",
        message: err.response.data.message,
      };
    }
  }
};

// ADD Payment
export const addPaymentMethod = async (data) => {
  try {
    let responseOnAddPayment = await axios.post(
      `${REACT_BASE_URL}store-pay-method`,
      data
    );
    if (responseOnAddPayment.status === SUCCESS_STATUS) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const storeFinanceSettingInfo = async (data) => {
  try {
    let responseOnStoreFinanceSettingInfo = await axios.post(
      `${REACT_BASE_URL}store-finance-info`,
      data
    );
    if (responseOnStoreFinanceSettingInfo.status === SUCCESS_STATUS) {
      return true;
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
