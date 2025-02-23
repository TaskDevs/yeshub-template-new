import React, { createContext } from "react";
// import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
// import { notify } from "../../../utils/responseUtils";

// import {
//   addWallet,
//   searchWallet,
//   walletList,
//   walletProfile,
//   updateWallet,
//   deleteWallet,
// } from "./walletApi";

export const WalletApiData = createContext();

const WalletApiDataProvider = (props) => {
  const processAddWallet = async () => {};

  const processGetAllWallet = async () => {};

  const processWalletProfile = async () => {};

  const processSearchWallet = async () => {};

  const processUpdateWallet = async () => {};

  const processDeleteWallet = async () => {};

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
