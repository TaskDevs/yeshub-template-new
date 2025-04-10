import React, { createContext, useState } from "react";
// import { notify } from "../../../utils/responseUtils";

import { getUserProposals, getFreelanceInvites } from "./proposalApi";

export const ProposalApiData = createContext();

const ProposalApiDataProvider = (props) => {
  const [proposalListData, setProposalListData] = useState([]);
  const [freelanceInviteListData, setFreelanceInviteListData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [Loading, setLoading] = useState(false);

  const processGetUserProposals = async () => {
    setLoading(false);
    let response = await getUserProposals();
    if (response) {
      //   console.log(response.data);
      setProposalListData(response.data);
      setPaginationData({
        total: response.pagination.total,
        link: response.pagination.links,
        current: response.pagination.current_page,
      });
    }
    setLoading(true);
  };

  const processGetFreelanceInvites = async () => {
    setLoading(false);
    let response = await getFreelanceInvites();
    if (response) {
      console.log(response.data);
      setFreelanceInviteListData(response.data);
    }
    setLoading(true);
  };

  return (
    <ProposalApiData.Provider
      value={{
        processGetUserProposals,
        processGetFreelanceInvites,
        freelanceInviteListData,
        proposalListData,
        paginationData,
        Loading,
      }}
    >
      {props.children}
    </ProposalApiData.Provider>
  );
};

export default ProposalApiDataProvider;
