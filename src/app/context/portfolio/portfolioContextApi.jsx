import React, { createContext, useState, useContext, useEffect } from "react";
import {
  addPortfolio,
  portfolioList,
  updatePortfolio,
  deletePortfolio,
} from "./portfolioApi";
import { PORTFOLIOFIELD } from "../../../globals/portfolio-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";
import { userId } from "../../../globals/constants";

export const PortfolioApiData = createContext();

const initialData = PORTFOLIOFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});

const PortfolioApiDataProvider = (props) => {
  const { setIsSubmitting, selectedId } = useContext(GlobalApiData);
  const [portfolios, setPortfolios] = useState([]);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const fetchAllPortfolio = async () => {
    try {
      const res = await processGetAllPortfolio(userId);
      if (res) {
        const data = res.data.data;
        setPortfolios(data);
      }
    } catch (err) {
      console.error("failed to get portfolio", err);
    }
  };

  useEffect(() => {
    fetchAllPortfolio();

  }, []);

  const processAddPortfolio = async (data) => {
    try {
      const res = await addPortfolio(data);

      return res;
    } catch (err) {
      console.error("failed to add-portfolio", err);
    }
  };

  const processGetAllPortfolio = async (userid) => {
    try {
      const res = await portfolioList(userid);

      return res;
    } catch (err) {
      console.error("failed to get-portfolio", err);
    }
  };

  //   const processPortfolioProfile = async (id) => {};

  const processUpdatePortfolio = async (userid, data) => {
    try {
      const res = await updatePortfolio(userid, data);

      return res;
    } catch (err) {
      console.error("failed to update-portfolio", err);
    }
  };

  const processDeletePortfolio = async (id) => {
    try {
      const res = await deletePortfolio(id);

      return res;
    } catch (err) {
      console.error("failed to delete-portfolio", err);
    }
  };

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
	
    try {
      await processAddPortfolio({ ...formData, user_id: userId });
      await fetchAllPortfolio()
      toast.success("Portfolio added successfully");
    } catch (err) {
      console.error("failed to add portfolio", err);
      toast.error("Portfolio updated successfully");
    } finally {
      setIsSubmitting(false);
      setFormData(initialData);
    }
  };

  const handleUpdatePortfolio = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await processUpdatePortfolio(selectedId, formData);
      await fetchAllPortfolio()
    } catch (err) {
      console.error("failed to update portfolio", err);
    } finally {
      setIsSubmitting(false);
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
        fetchAllPortfolio,
        setFormData,
        setPortfolios,
        handleChange,
        handleResetForm,
        processAddPortfolio,
        processGetAllPortfolio,
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
