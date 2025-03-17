import React, { createContext, useState, useContext } from "react";
import {
  addPortfolioMedia,
  portfolioMediaProfile,
  updatePortfolioMedia,
  deletePortfolioMedia,
} from "./portfolioMediaApi";
// import { PORTFOLIOFIELD } from "../../../globals/portfolio-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";
import { userId } from "../../../globals/constants";
import { PortfolioApiData } from "../portfolio/portfolioContextApi";

export const PortfolioMediaApiData = createContext();

const initialData = {
  url: "",
}

const PortfolioMediaApiDataProvider = (props) => {
  const { setIsSubmitting, selectedId, setSelectedId, setIsLoading } = useContext(GlobalApiData);
  const [portfolioMedia, setPortfolioMedia] = useState([]);
  const [selectDeleteItem, setSelectDeleteItem] = useState(null);
  const [formData, setFormData] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState([])
  const {  fetchAllPortfolio } = useContext(PortfolioApiData);

  // console.log("selectDeleteItem-media-del-global", selectDeleteItem)

  // portfolios,
  // const selectedPortfolio = portfolios.find(portfolio => portfolio.id === selectedId)

  // console.log("selectedId", selectedId)
  // console.log("media", media)
  // console.log("formData-media", formData)
// console.log("selectedItems", selectedItems)

  // const fetchPortfolioMedia= async () => {
  //   try {
  //     const res = await processGetPortfolioMedia(selectedId);
  //     if (res) {
  //       const data = res.data.data;
  //       console.log("res-media", res)
  //       setMedia(data);
  //     }
  //   } catch (err) {
  //     console.error("failed to get portfolio", err);
  //   }
  // };





  // useEffect(() => {
  //   fetchPortfolioMedia();
    
  // }, [selectedId]);



  const handleChange = (name, e) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const processAddPortfolioMedia = async (data) => {
    try {
      const res = await addPortfolioMedia(data);

      return res;
    } catch (err) {
      console.error("failed to add-portfolio", err);
    }
  };

  const processGetPortfolioMedia= async (id) => {
    try {
      const res = await portfolioMediaProfile(id);

      return res;
    } catch (err) {
      console.error("failed to get-portfolio", err);
    }
  };


  const processUpdatePortfolioMedia= async (userid, data) => {
    try {
      const res = await updatePortfolioMedia(userid, data);

      return res;
    } catch (err) {
      console.error("failed to update-portfolio", err);
    }
  };

  const processDeletePortfolioMedia= async (id) => {
    try {
      const res = await deletePortfolioMedia(id);
      return res;
    } catch (err) {
      console.error("failed to delete-portfolio", err);
    }
  };

  const handleResetForm = () => {
    setFormData(initialData);
  };

  
  

  const handleAddPortfolioMedia= async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
	
    try {
      await processAddPortfolioMedia({ ...formData, user_id: userId });
      await fetchAllPortfolio()
      toast.success("PortfolioMedia added successfully");
    } catch (err) {
      console.error("failed to add portfolioMedia", err);
      toast.error("PortfolioMedia updated successfully");
    } finally {
      setIsSubmitting(false);
      setFormData(initialData);
    }
  };

  const handleUpdatePortfolioMedia= async (e) => {
    e.preventDefault();

    if (!selectedId) {
      toast.error("Please select a portfolio media url");
      return;
    }


    setIsSubmitting(true);
    try {
      await processUpdatePortfolioMedia(selectedId, formData);
      await fetchAllPortfolio()
      toast.success("Portfolio media updated successfully");
    } catch (err) {
      console.error("failed to update portfolio", err);
      toast.error("Portfolio media failed to update");
    } finally {
      setIsSubmitting(false);
      setFormData(initialData);
      setSelectedId(null)
      setSelectDeleteItem(null)
    }
  };

  const handleDeletePortfolioMedia = async () => {
    // console.log("selectedId-del", selectDeleteItem)
		if (!selectDeleteItem) {
			toast.error("Please select the portfolio media to delete");
			return;
		}
		setIsSubmitting(true);
    setIsLoading(true)
		try {
			const res = await processDeletePortfolioMedia(selectDeleteItem);
      console.log("res-del-media", res)
			if (res.statusText === 'OK') {
        await fetchAllPortfolio()
				toast.success("Portfolio media deleted successfully");
       
			}
		} catch (e) {
      console.error("Failed to delete portfolio media", e)
			toast.error("Failed to delete portfolio media");
			return false;
		} finally {
			setIsSubmitting(false);
      setSelectedId(null)
      setSelectDeleteItem(null)
      setIsLoading(false)
		}
	};

 

  return (
    <PortfolioMediaApiData.Provider
      value={{
        formData,
        portfolioMedia,
        selectedItems, 
        selectDeleteItem,
        setSelectDeleteItem,
        setSelectedItems,
        setFormData,
        setPortfolioMedia,
        handleChange,
        handleResetForm,
        processAddPortfolioMedia,
        processGetPortfolioMedia,
        processUpdatePortfolioMedia,
        processDeletePortfolioMedia,
        handleDeletePortfolioMedia,
        handleAddPortfolioMedia,
        handleUpdatePortfolioMedia,
      }}
    >
      {props.children}
    </PortfolioMediaApiData.Provider>
  );
};

export default PortfolioMediaApiDataProvider;
