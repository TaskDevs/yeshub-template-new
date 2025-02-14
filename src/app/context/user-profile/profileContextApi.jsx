import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addProfile,
  searchProfile,
  profileList,
  profileProfile,
  updateProfile,
  deleteProfile,
} from "./profileApi";

export const ProfileApiData = createContext();

const ProfileApiDataProvider = (props) => {

  const processAddProfile = async (data) => {};

  const processGetAllProfile = async (id) => {};

  const processProfileProfile = async (id) => {};

  const processSearchProfile = async (data) => {};

  const processUpdateProfile = async (data) => {};

  const processDeleteProfile = async (id) => {};

  return (
    <ProfileApiData.Provider
      value={{
        processAddProfile,
        processGetAllProfile,
        processProfileProfile,
        processSearchProfile,
        processUpdateProfile,
        processDeleteProfile,
      }}
    >
      {props.children}
    </ProfileApiData.Provider>
  );
};

export default ProfileApiDataProvider;
