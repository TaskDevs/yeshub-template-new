import { createContext, useEffect, useState } from "react";
import MaskLastDigits from "../../../utils/maskLastDigits";
import {
  addPaymentMethod,
  storeFinanceSettingInfo,
  getFinanceSettingInfo,
  getTotalInvoice,
  createInvoice,
} from "./paymentApi";

export const PaymentApiData = createContext();

const PaymentApiDataProvider = (props) => {
  const [financeSettingInfo, setFinanceSettingInfo] = useState([]);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [previewData, setPreviewData] = useState({});
  const [totalInvoice, setTotalInvoice] = useState(0);

  useEffect(() => {
    processGetFinanceSettingInfo();
  }, []);

  const processAddPaymentMethod = async (data) => {
    let response = await addPaymentMethod(data);
    if (response) {
      processGetFinanceSettingInfo();
      return true;
    } else {
      return false;
    }
  };

  const processStoreFinanceSettingInfo = async (data) => {
    let response = await storeFinanceSettingInfo(data);
    if (response) {
      return true;
    } else {
      return false;
    }
  };

  const processAddInvoice = async (data) => {
    let response = await createInvoice(data);
    if (response) {
      console.log(response);
      return response;
    } else {
      return false;
    }
  };

  const processGetTotalInvoice = async () => {
    let response = await getTotalInvoice();
    if (response) {
      return response.data + 1;
    } else {
      console.log(`Getting total invoice error`);
    }
  };

  const processGetFinanceSettingInfo = async () => {
    let response = await getFinanceSettingInfo();
    if (response) {
      let new_payment_methods = [];

      // Credit Cards
      response.data.payment_method.credit_cards.map((item) =>
        new_payment_methods.push({
          id: new_payment_methods.length + 1,
          item_no: item.item_number,
          type: "Credit Card",
          details: `Card No ${MaskLastDigits(item.card_number)} Expiry ${
            item.expiry_date
          }`,
          card_number: item.card_number,
          expiry_date: item.expiry_date,
          default: item.default,
        })
      );

      // Bank Accounts
      response.data.payment_method.bank_accounts.map((item) =>
        new_payment_methods.push({
          id: new_payment_methods.length + 1,
          item_no: item.item_number,
          type: "Bank Account",
          details: `${item.bank_name} ${MaskLastDigits(item.account_number)}`,
          default: item.default,
          bank_name: item.bank_name,
          account_name: item.account_name,
          account_number: item.account_number,
          routing_number: item.routing_number,
        })
      );

      // Mobile Money (Fixed here)
      response.data.payment_method.momo_accounts.map((item) =>
        new_payment_methods.push({
          id: new_payment_methods.length + 1,
          item_no: item.item_number,
          type: "Mobile Money",
          details: `${item.network_type} ${MaskLastDigits(item.mobile_number)}`,
          network_type: item.network_type,
          account_name: item.account_name,
          mobile_number: item.mobile_number,
          default: item.default,
        })
      );

      // console.log(new_payment_methods);

      // Sort by item number
      const sorted = [...new_payment_methods].sort(
        (a, b) => a.item_number - b.item_number
      );
      setPaymentMethodList(sorted);
      setFinanceSettingInfo(response.data.finance_setting_info);
      //console.log(response.data.finance_setting_info);
    } else {
      console.log("error");
    }
  };

  const processGetAllPayment = async () => {};

  const processPaymentProfile = async () => {};

  const processSearchPayment = async () => {};

  const processUpdatePayment = async () => {};

  const processDeletePayment = async () => {};

  return (
    <PaymentApiData.Provider
      value={{
        processAddPaymentMethod,
        processGetTotalInvoice,
        processGetAllPayment,
        processAddInvoice,
        processPaymentProfile,
        processSearchPayment,
        processUpdatePayment,
        processDeletePayment,
        processGetFinanceSettingInfo,
        processStoreFinanceSettingInfo,
        financeSettingInfo,
        setFinanceSettingInfo,
        paymentMethodList,
        previewData,
        setPreviewData,
        totalInvoice,
        setTotalInvoice,
      }}
    >
      {props.children}
    </PaymentApiData.Provider>
  );
};

export default PaymentApiDataProvider;
