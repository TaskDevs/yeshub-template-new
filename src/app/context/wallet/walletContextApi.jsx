import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addWallet,
  searchWallet,
  walletList,
  walletProfile,
  updateWallet,
  deleteWallet,
} from "./walletApi";

export const WalletApiData = createContext();

const WalletApiDataProvider = (props) => {
  const processAddWallet = async (data) => {};

  const processGetAllWallet = async (id) => {};

  const processWalletProfile = async (id) => {};

  const processSearchWallet = async (data) => {};

  const processUpdateWallet = async (data) => {};

  const processDeleteWallet = async (id) => {};

  return (
    <WalletApiData.Provider
      value={{
        processAddWallet,
        processGetAllWallet,
        processWalletProfile,
        processSearchWallet,
        processUpdateWallet,
        processDeleteWallet,
      }}
    >
      {props.children}
    </WalletApiData.Provider>
  );
};

export default WalletApiDataProvider;
