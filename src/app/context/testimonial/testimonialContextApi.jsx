import React, { createContext, useState } from "react";
// import { notify } from "../../../utils/responseUtils";

import {
  addTestimonial,
  testimonialList,
  updateTestimonial,
  deleteTestimonial,
} from "./testimonialApi";
import { TESTIMONIALFIELD } from "../../../globals/testimonial-data";

export const TestimonialApiData = createContext();

const TestimonialApiDataProvider = (props) => {

  const initialData = TESTIMONIALFIELD.fieldDetail.reduce((acc, field) => {
          acc[field.name] = "";
          return acc;
        }, {})

   const [formData, setFormData] = useState(initialData);
    
     const handleChange = (field, data) => {
        setFormData({
          ...formData,
          [field]: data,
        });
      };
   


  const processAddTestimonial = async (data) => {
    try {
      const res = await addTestimonial(data);
      console.log("added testimonial", res)
    } catch (err) {
      console.log("failed to add testimonial", err)
    } finally {
      setFormData(initialData); 
    }

  };

  const processGetAllTestimonial = async (id) => {
    try {
			const res = await testimonialList(id);
			console.log("get testimonial", res);
		} catch (err) {
			console.log("failed to get testimonial", err);
		}
  };



  const processUpdateTestimonial = async (id, data) => {
    try {
			const res = await updateTestimonial(id, data);
			console.log("update testimonial", res);
		} catch (err) {
			console.error("failed to update testimonial", err);
		}
  };

  const processDeleteTestimonial = async (id) => {
    try {
      const res = await deleteTestimonial(id);
      console.log("deleted testimonial", res)
    } catch (err) {
      console.log("failed to delete testimonial", err)
    }
  };

  return (
		<TestimonialApiData.Provider
			value={{
				processAddTestimonial,
				processGetAllTestimonial,
				processUpdateTestimonial,
				processDeleteTestimonial,
        formData,
        setFormData,
				handleChange,
			}}
		>
			{props.children}
		</TestimonialApiData.Provider>
	);
};

export default TestimonialApiDataProvider;
