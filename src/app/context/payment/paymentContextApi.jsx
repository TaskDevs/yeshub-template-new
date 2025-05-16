import { createContext, useEffect, useState } from "react";
import MaskLastDigits from "../../../utils/maskLastDigits";
import {
  addPaymentMethod,
  storeFinanceSettingInfo,
  getFinanceSettingInfo,
} from "./paymentApi";

export const PaymentApiData = createContext();

const PaymentApiDataProvider = (props) => {
  const [financeSettingInfo, setFinanceSettingInfo] = useState([]);
  const [paymentMethodList, setPaymentMethodList] = useState([]);

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
        processGetAllPayment,
        processPaymentProfile,
        processSearchPayment,
        processUpdatePayment,
        processDeletePayment,
        processGetFinanceSettingInfo,
        processStoreFinanceSettingInfo,
        financeSettingInfo,
        setFinanceSettingInfo,
        paymentMethodList,
      }}
    >
      {props.children}
    </PaymentApiData.Provider>
  );
};

export default PaymentApiDataProvider;
