import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addPayment,
  searchPayment,
  paymentList,
  paymentProfile,
  updatePayment,
  deletePayment,
} from "./paymentApi";

export const PaymentApiData = createContext();

const PaymentApiDataProvider = (props) => {
  const processAddPayment = async (data) => {};

  const processGetAllPayment = async (id) => {};

  const processPaymentProfile = async (id) => {};

  const processSearchPayment = async (data) => {};

  const processUpdatePayment = async (data) => {};

  const processDeletePayment = async (id) => {};

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
