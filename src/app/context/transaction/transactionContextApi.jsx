import React, { createContext, useState } from "react";
import {
  getTransactionOfClient,
  getTransactionFreelancer,
  getPotentialEarningsOfFreelance,
  // getWalletTransactionsOfBoth,
  createWalletForUser,
  makeWithdrawal,
} from "./transactionApi";

export const TransactionApiData = createContext();

const TransactionApiDataProvider = (props) => {
  const [walletStatus, setWalletStatus] = useState("neutral");
  const [transactionList, setTransactionList] = useState([]);
  const [clientTransactionList, setClientTransactionList] = useState([]);
  const [freelanceEarnings, setFreelanceEarnings] = useState({
    available: "0.00",
    pending: "0.00",
  });
  const [allEarnings, setAllEarnings] = useState({
    available: "0.00",
    pending: "0.00",
  });
  const [newPendAmount, setNewPendAmount] = useState("0.00");
  const [monthEarnings, setMonthEarnings] = useState([
    { month: "Jan", earnings: 0 },
    { month: "Feb", earnings: 0 },
    { month: "Mar", earnings: 0 },
    { month: "Apr", earnings: 0 },
    { month: "May", earnings: 0 },
    { month: "Jun", earnings: 0 },
    { month: "Jul", earnings: 0 },
  ]);

  const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const processGetTransactionOfFreelance = async () => {
    let response = await getTransactionFreelancer();
    if (response) {
      let new_list = [];
      response.data.wallet_transactions.data.map((item) =>
        new_list.push({
          date: item.created_at,
          description: item.note,
          type:
            item.transaction_type == "deposit"
              ? "payment"
              : item.transaction_type,
          note: item.description,
          amount: item.amount,
          status: item.status,
        })
      );
      setTransactionList(new_list);
      setFreelanceEarnings({
        ...allEarnings,
        available: response.data.wallet_balance,
        pending: response.data.pending,
      });
      setWalletStatus("true");

      const updatedChartData = monthEarnings.map((item) => {
        // Find if the month exists in backend totals
        const monthEntry = Object.entries(response.data.monthlyTotals).find(
          ([key]) => {
            const monthNum = key.split("-")[1]; // e.g. '05'
            return monthMap[monthNum] === item.month;
          }
        );

        return {
          ...item,
          earnings: monthEntry ? monthEntry[1] : 0,
        };
      });
      console.log(updatedChartData);
      setMonthEarnings(updatedChartData);
    } else {
      setWalletStatus("false");
    }
  };

  const processGetPotentialEarningsOfFreelance = async () => {
    try {
      const res = await getPotentialEarningsOfFreelance(); // wait for axios/etc.
      console.log(res.data);
      const rows = res?.data ?? []; // null‑safe

      const total = rows.reduce((sum, row) => {
        const amt = parseFloat(row?.amount_total) || 0; // guard NaN
        return sum + amt;
      }, 0);

      setNewPendAmount(total);
      console.log(total); // optional
    } catch (err) {
      console.error(err);
      // toast.error('Could not fetch earnings');            // UX hint
    }
  };

  const processGetTransactionOfClient = async () => {
    let response = await getTransactionOfClient();
    console.log(response.data);
    let new_data = [];
    if (response) {
      setAllEarnings({
        ...allEarnings,
        available: response.data.wallet_balance,
        pending: response.data.pending,
        escrow: response.data.escrow_balance,
        totalSpentInMonth: response.data.total_spent_in_month,
        start_month: response.data.start_month,
      });

      response.data.wallet_transactions.data.map((item) =>
        new_data.push({
          date: item.created_at,
          description: item.description,
          type: item.transaction_type,
          amount: item.amount,
          status: item.status,
        })
      );
      setClientTransactionList(response.data.wallet_transactions.data);
    }
    setWalletStatus("true");
  };

  const processCreateWalletOfUser = async () => {
    let response = await createWalletForUser();
    if (response.status == "success") {
      processGetTransactionOfClient();
      processGetTransactionOfFreelance();
      return {
        status: "success",
        message: response.message,
      };
    } else {
      return {
        status: "error",
        message: response.message,
      };
    }
  };

  const processMakeWithdrawal = async (data) => {
    let response = await makeWithdrawal(data);
    console.log(response);
    if (response) {
      processGetTransactionOfClient();
      processGetTransactionOfFreelance();
      return response;
    } else {
      return false;
    }
  };

  return (
    <TransactionApiData.Provider
      value={{
        processMakeWithdrawal,
        processGetTransactionOfClient,
        processCreateWalletOfUser,
        allEarnings,
        freelanceEarnings,
        setAllEarnings,
        walletStatus,
        setWalletStatus,
        transactionList,
        clientTransactionList,
        monthEarnings,
        processGetTransactionOfFreelance,
        processGetPotentialEarningsOfFreelance,
        newPendAmount,
      }}
    >
      {props.children}
    </TransactionApiData.Provider>
  );
};

export default TransactionApiDataProvider;
