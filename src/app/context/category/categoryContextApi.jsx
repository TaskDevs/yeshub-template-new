import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addCategory,
  searchCategory,
  catgoryList,
  categoryProfile,
  updateCategory,
  deleteCategory,
} from "./categoryApi";

export const CategoryApiData = createContext();

const CategoryApiDataProvider = (props) => {
  const processAddCategory = async (data) => {};

  const processGetAllCategory = async (id) => {};

  const processCategoryProfile = async (id) => {};

  const processSearchCategory = async (data) => {};

  const processUpdateCategory = async (data) => {};

  const processDeleteCategory = async (id) => {};

  return (
    <CategoryApiData.Provider
      value={{
        processAddCategory,
        processGetAllCategory,
        processCategoryProfile,
        processSearchCategory,
        processUpdateCategory,
        processDeleteCategory,
      }}
    >
      {props.children}
    </CategoryApiData.Provider>
  );
};

export default CategoryApiDataProvider;
