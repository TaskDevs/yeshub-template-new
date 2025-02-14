// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD Testimonial
export const addTestimonial = async (data) => {
  try {
    let responseOnAddTestimonial = await axios.post(
      {
        /**Add Create Testimonial API URL here**/
      },
      data
    );
    if (responseOnAddTestimonial.status === SUCCESS_STATUS) {
      return responseOnAddTestimonial.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH Testimonial
export const searchTestimonial = async (data) => {
  try {
    let responseOnSearchTestimonial = await axios.get({
      /**Add Search Testimonial API URL here like /searchTestimonial?keyword=${data}**/
    });
    if (responseOnSearchTestimonial.status === SUCCESS_STATUS) {
      return responseOnSearchTestimonial.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST Testimonial
export const testimonialList = async (pageNo) => {
  try {
    let responseOnTestimonialList = await axios.get({
      /**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnTestimonialList.status === SUCCESS_STATUS) {
      return responseOnTestimonialList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Testimonial
export const testimonialProfile = async (id) => {
  try {
    let responseOnTestimonialProfile = await axios.get({
      /**Add View Testimonial API URL here like ${URL}api/getEmployerProfile/${id}**/
    });

    if (responseOnTestimonialProfile.status === SUCCESS_STATUS) {
      return responseOnTestimonialProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Testimonial
export const updateTestimonial = async (data) => {
  try {
    let responseOnUpdateTestimonial = await axios.put({
      /**Add Update Testimonial API URL here like  `${URL}api/updateTestimonial/${data.id}` **/
    });
    if (responseOnUpdateTestimonial.status === SUCCESS_STATUS) {
      return responseOnUpdateTestimonial.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Testimonial
export const deleteTestimonial = async (data) => {
  try {
    let responseOnDeleteTestimonial = await axios.delete({
      /**Add Delete Testimonial API URL here like  `/api/deleteHistory/${data}` **/
    });
    if (responseOnDeleteTestimonial.status === SUCCESS_STATUS) {
      return responseOnDeleteTestimonial.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
