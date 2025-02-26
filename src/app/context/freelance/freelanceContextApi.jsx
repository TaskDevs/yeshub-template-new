import React, { createContext, useState, useEffect, useContext } from "react";
// import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
// import { notify } from "../../../utils/responseUtils";

import {
  addFreelance,
  // searchFreelance,
  // freelanceList,
  freelanceProfile,
  // updateFreelance,
  // deleteFreelance,
} from "./freelanceApi";
import { userId } from "../../../globals/constants";
import toast from "react-hot-toast";
import { FREELANCERFIELD } from "../../../globals/freelancer-data";
import { GlobalApiData } from "../global/globalContextApi";

export const FreelanceApiData = createContext();


const initialFormData =  FREELANCERFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});


const FreelanceApiDataProvider = (props) => {
  const [freelanceProfileData, setFreelanceProfileData] = useState({});
  const [formData, setFormData] = useState(initialFormData)
  const { setIsSubmitting } = useContext(GlobalApiData)

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await processFreelanceProfile(userId);
      if (res) {
        setFreelanceProfileData(res.data);   
      } else {
        return false;
      }
    };

    fetchProfile();

   
    const interval = setInterval(fetchProfile, 60000);
    return () => clearInterval(interval); 
  }, []);


  const processAddFreelance = async (data) => {
    const res = await addFreelance(data);
    if (res) {
      return res.data;
    } else {
      return false;
    }
  };

  const processGetAllFreelance = async () => {};

  const processFreelanceProfile = async (id) => {
    const res = await freelanceProfile(id);
    if (res) {
      return res.data;
    } else {
      return false;
    }
  };

  const processSearchFreelance = async () => {};

  const processUpdateFreelance = async () => {};

  const processDeleteFreelance = async () => {};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (freelanceProfileData && freelanceProfileData.id) {
      toast.error("A freelance profile already exists. Please edit the existing profile instead.");
      return; 
  }

    setIsSubmitting(true)

    try {
      const res = await processAddFreelance({...formData, portfolio_id
        : userId, user_id: userId});
      
      if (res) {
        console.log("add-freelacer", res)
        toast.success("Freelance profile added successfully")
      } 
      
    } catch (error) {
      console.error("Failed to add freelance profile", error)
      toast.error("Failed to add freelance profile")
    } finally {
      setIsSubmitting(false)
      setFormData(initialFormData)
    }
  };

  const handleEditFreelance = () => {
    setFormData({
      rate: freelanceProfileData.rate,
      experience: freelanceProfileData.experience,
    })
  }

  return (
    <FreelanceApiData.Provider
      value={{
        freelanceProfileData,
        formData,
        setFormData,
        handleSubmit,
        handleEditFreelance,
        processAddFreelance,
        processGetAllFreelance,
        processFreelanceProfile,
        processSearchFreelance,
        processUpdateFreelance,
        processDeleteFreelance,
      }}
    >
      {props.children}
    </FreelanceApiData.Provider>
  );
};

export default FreelanceApiDataProvider;
