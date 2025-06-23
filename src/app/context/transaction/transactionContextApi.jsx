import React, { createContext, useState } from "react";
import {
  getTransactionOfUser,
  createWalletForUser,
  makeWithdrawal,
} from "./transactionApi";

export const TransactionApiData = createContext();

const TransactionApiDataProvider = (props) => {
  const [walletStatus, setWalletStatus] = useState("neutral");
  const [transactionList, setTransactionList] = useState([]);
  const [allEarnings, setAllEarnings] = useState({
    available: "0.00",
    pending: "0.00",
  });
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

  const processGetTransactionOfUser = async () => {
    let response = await getTransactionOfUser();
    console.log(response.data);
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
      setAllEarnings({
        ...allEarnings,
        available: response.data.wallet_balance,
        pending: response.data.pending,
        escrow: response.data.escrow_balance,
        totalSpentInMonth: response.data.total_spent_in_month,
        start_month: response.data.start_month,
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

  const processCreateWalletOfUser = async () => {
    let response = await createWalletForUser();
    if (response.status == "success") {
      processGetTransactionOfUser();
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
      processGetTransactionOfUser();
      return response;
    } else {
      return false;
    }
  };

  return (
    <TransactionApiData.Provider
      value={{
        processMakeWithdrawal,
        processGetTransactionOfUser,
        processCreateWalletOfUser,
        allEarnings,
        setAllEarnings,
        walletStatus,
        setWalletStatus,
        transactionList,
        monthEarnings,
      }}
    >
      {props.children}
    </TransactionApiData.Provider>
  );
};

export default TransactionApiDataProvider;
