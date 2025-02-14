import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addMilestone,
  searchMilestone,
  milestoneList,
  milestoneProfile,
  updateMilestone,
  deleteMilestone,
} from "./milestoneApi";

export const MilestoneApiData = createContext();

const MilestoneApiDataProvider = (props) => {
  const processAddMilestone = async (data) => {};

  const processGetAllMilestone = async (id) => {};

  const processMilestoneProfile = async (id) => {};

  const processSearchMilestone = async (data) => {};

  const processUpdateMilestone = async (data) => {};

  const processDeleteMilestone = async (id) => {};

  return (
    <MilestoneApiData.Provider
      value={{
        processAddMilestone,
        processGetAllMilestone,
        processMilestoneProfile,
        processSearchMilestone,
        processUpdateMilestone,
        processDeleteMilestone,
      }}
    >
      {props.children}
    </MilestoneApiData.Provider>
  );
};

export default MilestoneApiDataProvider;
