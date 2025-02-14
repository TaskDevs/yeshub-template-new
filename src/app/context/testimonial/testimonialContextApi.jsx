import React, { createContext, useState, useEffect } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addTestimonial,
  searchTestimonial,
  testimonialList,
  testimonialProfile,
  updateTestimonial,
  deleteTestimonial,
} from "./testimonialApi";

export const TestimonialApiData = createContext();

const TestimonialApiDataProvider = (props) => {
  const processAddTestimonial = async (data) => {};

  const processGetAllTestimonial = async (id) => {};

  const processTestimonialProfile = async (id) => {};

  const processSearchTestimonial = async (data) => {};

  const processUpdateTestimonial = async (data) => {};

  const processDeleteTestimonial = async (id) => {};

  return (
    <TestimonialApiData.Provider
      value={{
        processAddTestimonial,
        processGetAllTestimonial,
        processTestimonialProfile,
        processSearchTestimonial,
        processUpdateTestimonial,
        processDeleteTestimonial,
      }}
    >
      {props.children}
    </TestimonialApiData.Provider>
  );
};

export default TestimonialApiDataProvider;
