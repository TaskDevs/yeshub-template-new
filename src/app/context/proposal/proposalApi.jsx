import axios from "axios";
import { LOCALHOST_BACKEND, REACT_BASE_URL } from "../../../globals/constants";

// LIST User Proposals
export const getUserProposals = async () => {
  try {
    let responseOnProposalList = await axios.get(
      `${LOCALHOST_BACKEND}/api/v1/get-client-proposal?id=5`
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

export const submitProposal = async (formDataToSubmit) => {
  try {
    const response = await axios.post(
      `${REACT_BASE_URL}new-post-proposal`,
      formDataToSubmit,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getFreelanceInvites = async () => {
  try {
    let responseOnGetFreelanceInvite = await axios.get(
      `${LOCALHOST_BACKEND}/api/v1/get-freelancer-invites?id=5`
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
