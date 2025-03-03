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
import { PortfolioApiData } from "../portfolio/portfolioContextApi";

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
  const { portfolios } = useContext(PortfolioApiData)



  const fetchProfile = async () => {
    const res = await processFreelanceProfile(userId);
    if (res) {
    
      setFreelanceProfileData(res.data);   
    } else {
      return false;
    }
  };


  useEffect(() => {
   
    fetchProfile();
   
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
  
    try {
      const res = await processAddFreelance({...formData, user_id: userId});
      
      if (res) {
        await fetchProfile();
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
   
    try{
      const res = await processUpdateFreelance( freelanceProfileData[0]?.id, {...formData, user_id: userId})
    if (res) {
      await fetchProfile();
      toast.success("Freelance profile updated successfully")
    }
    }catch(e) {
      console.error()
      toast.error("Failed to update freelance profile")
    }
  }

  const handleEditFreelance = () => {
    if (!portfolios || portfolios.length === 0) {
      console.error("Portfolio options not loaded yet.");
      return;
    }

    const portfolioArray = Array.isArray(freelanceProfileData[0]?.portfolio_id)
    ? JSON.parse(freelanceProfileData[0]?.portfolio_id).map(String)
        : freelanceProfileData[0]?.portfolio_id.split(",").map((id) => id.trim())
   

    const selectedPortfolioObjects = portfolioArray.map((id) => {
      const portfolio = portfolios?.find(
          (portfolio) => String(portfolio.id) === String(id)
      );
      return { value: portfolio.id, label: portfolio.project_title };
    })

    setFormData({
      rate: freelanceProfileData[0]?.rate,
      experience: freelanceProfileData[0]?.experience,
      portfolio_id: selectedPortfolioObjects.map((portfolio) => portfolio.value)
    })

    setSelectedItems(selectedPortfolioObjects);
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
