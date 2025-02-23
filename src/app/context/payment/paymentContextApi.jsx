import React, { createContext } from "react";
// import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
// import { notify } from "../../../utils/responseUtils";

// import {
//   addPayment,
//   searchPayment,
//   paymentList,
//   paymentProfile,
//   updatePayment,
//   deletePayment,
// } from "./paymentApi";

export const PaymentApiData = createContext();

const PaymentApiDataProvider = (props) => {
  const processAddPayment = async () => {};

  const processGetAllPayment = async () => {};

  const processPaymentProfile = async () => {};

  const processSearchPayment = async () => {};

  const processUpdatePayment = async () => {};

  const processDeletePayment = async () => {};

  return (
    <PaymentApiData.Provider
      value={{
        processAddPayment,
        processGetAllPayment,
        processPaymentProfile,
        processSearchPayment,
        processUpdatePayment,
        processDeletePayment,
      }}
    >
      {props.children}
    </PaymentApiData.Provider>
  );
};

export default PaymentApiDataProvider;
