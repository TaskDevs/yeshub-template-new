import { createContext, useEffect, useState } from "react";
import MaskLastDigits from "../../../utils/maskLastDigits";
import {
  addPaymentMethod,
  storeFinanceSettingInfo,
  getFinanceSettingInfo,
  getTotalInvoice,
  getPaymentsOnFreelancer,
  getPaymentsOnClient,
  createInvoice,
  getInvoiceOfUser,
  getInvoiceDetails,
  editInvoice,
  deleteInvoice,
} from "./paymentApi";

export const PaymentApiData = createContext();

const PaymentApiDataProvider = (props) => {
  const [financeSettingInfo, setFinanceSettingInfo] = useState([]);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [filterCompanyNameList, setFilterCompanyNameList] = useState([]);
  const [billingList, setBillingList] = useState([]);
  const [invoiceListData, setInvoiceListData] = useState([]);
  const [billingData, setBillingData] = useState({
    pending_total: 0,
    paid_total: 0,
    overdue_total: 0,
    total_amount: 0,
  });
  const [previewData, setPreviewData] = useState({});
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [invoiceDetailInfo, setInvoiceDetailInfo] = useState({
    invoice: null,
    client_info: null,
    data: null,
  });

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

  const processGetInvoiceOfUser = async () => {
    let filterData = ["All Client"];
    let response = await getInvoiceOfUser();
    if (response) {
      setBillingList(response.data);
      setBillingData({
        pending_total: response.summary.percent_of_pending_total,
        paid_total: response.summary.percent_of_paid_total,
        overdue_total: response.summary.percent_of_overdue_total,
        total_amount: response.summary.total_from_months,
      });
      response.data.map((item) => filterData.push(item.company_name));
      setFilterCompanyNameList(filterData);
      //console.log(response.data);
    } else {
      return false;
    }
  };

  const processGetPaymentsOnFreelancer = async () => {
    let response = await getPaymentsOnFreelancer();
    if (response) {
      console.log(response);
      let new_data = [];
      setBillingData({
        ...billingData,
        paid_total: response.total_earnings,
      });
      response.transactions.data.map((item) =>
        new_data.push({
          invoice_number: item.ref_no,
          company_name: item.company_name,
          due_date: item.milestone_completed.due_date,
          total_amount: item.project_budget,
          payment_status: "Paid",
        })
      );
      setInvoiceListData(new_data);
    }
  };

  const processGetPaymentsOnClient = async () => {
    let response = await getPaymentsOnClient();
    if (response) {
      console.log(response);
      let new_data = [];
      setBillingData({
        ...billingData,
        paid_total: response.total_earnings,
      });
      response.transactions.data.map((item) =>
        new_data.push({
          invoice_number: item.ref_no,
          freelancer_name: item.company_name,
          due_date: item.milestone_completed.due_date,
          total_amount: item.project_budget,
          payment_status: "Paid",
        })
      );
      setInvoiceListData(new_data);
    }
  };

  const processGetInvoiceDetails = async (id) => {
    let response = await getInvoiceDetails(id);
    if (response) {
      //console.log(response.data.data);
      setInvoiceDetailInfo(response.data);
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
          default: item.default == "1" ? true : false,
        })
      );

      // Bank Accounts
      response.data.payment_method.bank_accounts.map((item) =>
        new_payment_methods.push({
          id: new_payment_methods.length + 1,
          item_no: item.item_number,
          type: "Bank Account",
          details: `${item.bank_name} ${MaskLastDigits(item.account_number)}`,
          default: item.default == "1" ? true : false,
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
          default: item.default == "1" ? true : false,
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

  const processEditInvoice = async (id, data) => {
    try {
      let responseOnEditInvoice = await editInvoice(id, data);
      if (responseOnEditInvoice) {
        return responseOnEditInvoice.data;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const processDeleteInvoice = async (id) => {
    try {
      let responseOnDeleteInvoice = await deleteInvoice(id);
      if (responseOnDeleteInvoice) {
        //console.log(responseOnDeleteInvoice);
        return responseOnDeleteInvoice.data;
      }
    } catch (err) {
      console.log(err);
      return false;
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
        processEditInvoice,
        processDeleteInvoice,
        processGetPaymentsOnFreelancer,
        processGetFinanceSettingInfo,
        processStoreFinanceSettingInfo,
        processGetInvoiceDetails,
        processGetPaymentsOnClient,
        financeSettingInfo,
        setFinanceSettingInfo,
        paymentMethodList,
        filterCompanyNameList,
        previewData,
        setPreviewData,
        processGetInvoiceOfUser,
        totalInvoice,
        setTotalInvoice,
        invoiceDetailInfo,
        invoiceListData,
        billingList,
        billingData,
      }}
    >
      {props.children}
    </PaymentApiData.Provider>
  );
};

export default PaymentApiDataProvider;
