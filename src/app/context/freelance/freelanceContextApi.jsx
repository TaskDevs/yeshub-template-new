import React, { createContext, useState, useEffect, useContext } from "react";
// import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
// import { notify } from "../../../utils/responseUtils";

import {
  addFreelance,
  // searchFreelance,
  // freelanceList,
  freelanceProfile,
  updateFreelance,
  deleteFreelance,
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
  const [freelanceProfileData, setFreelanceProfileData] = useState([]);
  const [formData, setFormData] = useState(initialFormData)
  const { setIsSubmitting } = useContext(GlobalApiData)
  const [selectedItems, setSelectedItems] = useState([])

  // console.log("freelanceProfileData-ctx", freelanceProfileData)

  const fetchProfile = async () => {
    const res = await processFreelanceProfile(userId);
    if (res) {
      // console.log("freelance-profile", res)
      setFreelanceProfileData(res.data);   
    } else {
      return false;
    }
  };


  useEffect(() => {
   
    fetchProfile();
    const interval = setInterval(fetchProfile, 60000);
    return () => clearInterval(interval); 
  }, [fetchProfile]);

  


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

  const processUpdateFreelance = async (id, data) => {
    setIsSubmitting(true)
   try{
    const res = await updateFreelance(id, data);
    if (res) {
      return res.data;
    } else {
      return false;
    }
   }catch(e){
    console.error(e);
   } finally {
    setFormData(initialFormData)
    setIsSubmitting(false)
   }
  };

  const processDeleteFreelance = async (id) => {
    const res = await deleteFreelance(id);
    if (res) {
      console.log("delete-freelancer", res)
      return res.data;
    } else {
      return false;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (freelanceProfileData && freelanceProfileData.id) {
      toast.error("A freelance profile already exists. Please edit the existing profile instead.");
      return; 
  }

    setIsSubmitting(true)
    console.log("formData-freelancer", formData)
    try {
      const res = await processAddFreelance({...formData, user_id: userId});
      
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

  const handleUpdateFreelanceProfile = async (e) => {
    e.preventDefault();
    console.log("formData-update-freelancer", formData)
    try{
      const res = await processUpdateFreelance( freelanceProfileData[0]?.id, {...formData, user_id: userId})
    if (res) {
      console.log("update-freelancer", res)
      toast.success("Freelance profile updated successfully")
    }
    }catch(e) {
      console.error()
      toast.error("Failed to update freelance profile")
    }
  }

  const handleEditFreelance = () => {
    console.log("free-data", freelanceProfileData)
    setFormData({
      rate: freelanceProfileData[0]?.rate,
      experience: freelanceProfileData[0]?.experience,
    })
  }

  return (
    <FreelanceApiData.Provider
      value={{
        freelanceProfileData,
        formData,
        selectedItems, 
        setSelectedItems,
        setFormData,
        handleSubmit,
        handleUpdateFreelanceProfile,
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
