// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import {
	REACT_BASE_URL,
	
} from "../../../globals/constants";


export const addTestimonial = async (data) => {
  try {
    let responseOnAddTestimonial = await axios.post(
			`${REACT_BASE_URL}create-testimonial`,
			data
		);
    return responseOnAddTestimonial;
    
  } catch (err) {
    console.log(err);
    return false;
  }
};



// LIST Testimonial
/**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
export const testimonialList = async (id) => {
  try {
    let responseOnTestimonialList = await axios.get(
			`${REACT_BASE_URL}get-testimonial-by-user-id/${id}`
		);
    return responseOnTestimonialList;

  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW Testimonial
export const testimonialProfile = async () => {
  try {
    let responseOnTestimonialProfile = await axios.get({
      /**Add View Testimonial API URL here like ${URL}api/getEmployerProfile/${id}**/
    });
    return responseOnTestimonialProfile;

  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE Testimonial
export const updateTestimonial = async (id, data) => {
  try {
    let responseOnUpdateTestimonial = await axios.put(
			`${REACT_BASE_URL}update-testimonial/${id}`,
			data
		);
    return responseOnUpdateTestimonial;
    // if (responseOnUpdateTestimonial.status === SUCCESS_STATUS) {
    //   return responseOnUpdateTestimonial.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
  }
};

// DELETE Testimonial
/**Add Delete Testimonial API URL here like  `/api/deleteHistory/${data}` **/
export const deleteTestimonial = async (id) => {
  try {
    let responseOnDeleteTestimonial = await axios.delete(
			`${REACT_BASE_URL}delete-testimonial/${id}`
		);
    return responseOnDeleteTestimonial;
    // if (responseOnDeleteTestimonial.status === SUCCESS_STATUS) {
    //   return responseOnDeleteTestimonial.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.error(err);
  }
};
