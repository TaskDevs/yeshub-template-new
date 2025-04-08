import axios from "axios";
import { REACT_BASE_URL } from "../../../globals/constants";

// LIST User Proposals
export const getUserProposals = async () => {
  try {
    let responseOnProposalList = await axios.get(
      `${REACT_BASE_URL}api/v1/get-client-proposal?id=5`
    );
    if (responseOnProposalList.status == 200) {
      return responseOnProposalList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getFreelanceInvites = async () => {
  try {
    let responseOnGetFreelanceInvite = await axios.get(
      `${REACT_BASE_URL}api/v1/get-freelancer-invites?id=5`
    );
    if (responseOnGetFreelanceInvite.status == 200) {
      return responseOnGetFreelanceInvite.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
