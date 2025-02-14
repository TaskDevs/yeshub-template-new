import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addSkills,
  searchSkills,
  skillsList,
  skillsProfile,
  updateSkills,
  deleteSkills,
} from "./skillsApi";

export const SkillsApiData = createContext();

const SkillsApiDataProvider = (props) => {
  const processAddSkills = async (data) => {};

  const processGetAllSkills = async (id) => {};

  const processSkillsProfile = async (id) => {};

  const processSearchSkills = async (data) => {};

  const processUpdateSkills = async (data) => {};

  const processDeleteSkills = async (id) => {};

  return (
    <SkillsApiData.Provider
      value={{
        processAddSkills,
        processGetAllSkills,
        processSkillsProfile,
        processSearchSkills,
        processUpdateSkills,
        processDeleteSkills,
      }}
    >
      {props.children}
    </SkillsApiData.Provider>
  );
};

export default SkillsApiDataProvider;
