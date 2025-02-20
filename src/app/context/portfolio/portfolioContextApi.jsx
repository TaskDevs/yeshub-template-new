import React, { createContext, useState, useEffect, useContext } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addPortfolio,
  searchPortfolio,
  portfolioList,
  portfolioProfile,
  updatePortfolio,
  deletePortfolio,
} from "./portfolioApi";
import { PORTFOLIOFIELD } from "../../../globals/portfolio-data";
import { GlobalApiData } from "../global/globalContextApi";
import { toast } from "react-toastify";
import { userId } from "../../../globals/dummy-users";

export const PortfolioApiData = createContext();

const initialData = PORTFOLIOFIELD.fieldDetail.reduce((acc, field) => {
	acc[field.name] = "";
	return acc;
}, {});

const PortfolioApiDataProvider = (props) => {


  const { setIsSubmitting, selectedId } = useContext(GlobalApiData);
   const [portfolios, setPortfolios] = useState([])
  const [formData, setFormData] = useState(initialData);
  console.log("formData-portfolio", formData);
  
   const handleChange = (field, data) => {
			setFormData({
				...formData,
				[field]: data,
			});
		};



  const processAddPortfolio = async (data) => {
    try{
      const res = await addPortfolio(data);
      console.log("add-portfolio", res);
      return res;
    }catch(err) {
      console.error("failed to add-portfolio", err)
    }
  };

  const processGetAllPortfolio = async (userid) => {
    try {
			const res = await portfolioList(userid);
      console.log("get-portfolio", res);
      return res;
		} catch (err) {
			console.error("failed to get-portfolio", err);
		}
  };

  const processPortfolioProfile = async (id) => {};

  const processSearchPortfolio = async (data) => {};

  const processUpdatePortfolio = async (userid, data) => {
     try {
			const res = await updatePortfolio(userid, data);
			console.log("update-portfolio", res);
      return res;
		} catch (err) {
			console.error("failed to update-portfolio", err);
		}
  };

  const processDeletePortfolio = async (id) => {
     try {
			const res = await deletePortfolio(id);
			console.log("delete-portfolio", res);
       return res;
		} catch (err) {
			console.error("failed to delete-portfolio", err);
		}
  };


   const handleAddPortfolio = async (e) => {
			e.preventDefault();
      setIsSubmitting(true)
			try {
				const res = await processAddPortfolio({...formData, user_id: userId});
        console.log("add-portfolio", res);
        toast.success("Portfolio added successfully")
			} catch (err) {
				console.error("failed to add portfolio", err);
        toast.error("Portfolio updated successfully")
      } finally {
        setIsSubmitting(false);
        setFormData(initialData)
      }
		};

		const handleUpdatePortfolio = async (e) => {
			e.preventDefault();
      setIsSubmitting(true)
			try {
				const res = await processUpdatePortfolio(selectedId, formData);
				console.log("update-portfolio", res);
			} catch (err) {
				console.error("failed to update portfolio", err);
			}finally {
        setIsSubmitting(false)
        setFormData(initialData);
      }
		};

  const handleResetForm = () => {
		setFormData(initialData);
	};


  return (
		<PortfolioApiData.Provider
			value={{
			  formData,
				portfolios,
			  setFormData,
				setPortfolios,
        handleChange,
        handleResetForm,
				processAddPortfolio,
				processGetAllPortfolio,
				processPortfolioProfile,
				processSearchPortfolio,
				processUpdatePortfolio,
				processDeletePortfolio,
				handleAddPortfolio,
				handleUpdatePortfolio,
			}}
		>
			{props.children}
		</PortfolioApiData.Provider>
	);
};

export default PortfolioApiDataProvider;
