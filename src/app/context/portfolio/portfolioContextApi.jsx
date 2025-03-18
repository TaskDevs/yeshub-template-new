import React, { createContext, useState, useContext, useEffect } from "react";
import {
  addPortfolio,
  addPortfolioMedia,
  portfolioList,
  updatePortfolio,
  deletePortfolio,
  updatePortfolioMedia
} from "./portfolioApi";
import { PORTFOLIOFIELD } from "../../../globals/portfolio-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";
import { userId } from "../../../globals/constants";
import * as bootstrap from 'bootstrap';


export const PortfolioApiData = createContext();



// const setEditFirstFormData = (data) => {
  //   setFormData({ ...data, ...firstFormData });
  // };

  // const setEditSecondFormData = (data) => {
  //   setFormData({ ...data, ...secondFormData });
  // };


  const initialData = {
    ...PORTFOLIOFIELD.fieldDetail.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {}),
    media: [],
};

// const initialData = PORTFOLIOFIELD.fieldDetail.reduce((acc, field) => {
//   acc[field.name] = "";
//   return acc;
// }, {});

const PortfolioApiDataProvider = (props) => {
  const { setIsSubmitting, setIsLoading } = useContext(GlobalApiData);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [formKey, setFormKey] = useState(0)
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  console.log("formdata-portctx", formData)
  console.log("selectedPortfolioId-port-ctx", selectedPortfolioId)


  const firstFormData = { ...formData };
delete firstFormData.url;
delete firstFormData.media;

const secondFormData = { url: formData.url };


console.log("initialData-port-ctx", initialData)
console.log("First Form Data:", firstFormData);
console.log("Second Form Data:", secondFormData)



  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const fetchAllPortfolio = async () => {
    setIsLoading(true);
    try {
      const res = await processGetAllPortfolio(userId);
      if (res) {
        const data = res.data.data;
        setPortfolios(data);
      }
    } catch (err) {
      console.error("failed to get portfolio", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPortfolio();
  }, []);

  const validateFirstForm = () => {
    const requiredFields = [
      "project_title",
      "role",
      "skills",
      "project_start_date",
      "project_end_date",
      "description",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  
  const handleAddClick = () => {
    console.log("add clicked")
    setIsEditing(false);
    setSelectedPortfolioId(null);
    setSelectedPortfolio(null);
    setFormData(initialData);
    setFormKey((prevKey) => prevKey + 1);
  };

  
  
  const submitFirstForm = async (e, onNext) => {
    e.preventDefault();
    if (!validateFirstForm()) return;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await processUpdatePortfolio(selectedPortfolioId, { ...firstFormData, id: selectedPortfolioId });
      } else {
        await processAddPortfolio({ ...firstFormData, user_id: userId });
        
      }
      await fetchAllPortfolio();
      toast.success(
        `Portfolio ${isEditing ? "updated" : "added"} successfully`
      );
      onNext();
      
      
    } catch (err) {
      console.error(
        `failed to ${isEditing ? "update" : "add"} first form`,
        err
      );
      toast.error(`Failed to ${isEditing ? "update" : "add"} first form.`);
    } finally {
      setIsSubmitting(false);
      if (!isEditing) {
        setFormData(initialData);
      setFormKey((prevKey) => prevKey + 1);
      setIsEditing(false);
      setSelectedPortfolio(null);
      setSelectedPortfolioId(null);
      }
      
      
    }
  };

  // const submitSecondForm = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     if (isEditing) {
  //       await processUpdatePortfolioMedia(id, { ...secondFormData, id: selectedPortfolioId });
  //     } else {
  //       await processAddMedia({ ...secondFormData, user_id: userId });
  //     }
  //     await fetchAllPortfolio();
  //     toast.success(
  //       `Portfolio media ${isEditing ? "updated" : "added"} successfully`
  //     );
  //   } catch (err) {
  //     console.error(`failed to ${isEditing ? "update" : "add"} portfolio`, err);
  //     toast.error(`Failed to ${isEditing ? "update" : "add"} portfolio.`);
  //   } finally {
  //     setIsSubmitting(false);
  //     setFormData(initialData);
  //     setIsEditing(false);
  //     setSelectedPortfolio(null);
  //     setSelectedPortfolioId(null);
  //   }
  // };


  const submitSecondForm = async (e, modalId) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        const mediaData = formData.media.map(media => ({ url: media.url, id: media.id })); // Extract url and id

        if (isEditing) {
            // Logic to update each media URL, if you have an API to do this
            for (const media of mediaData) {
                if (media.id) {
                    await processUpdatePortfolioMedia(media.id, { url: media.url, portfolio_id: selectedPortfolioId });
                } else {
                    await processAddMedia({ url: media.url, user_id: userId, portfolio_id: selectedPortfolioId });
                }
            }
        } else {
            // Logic to add each media URL
            for (const media of mediaData) {
                await processAddMedia({ url: media.url, user_id: userId });
            }
        }
        await fetchAllPortfolio();
        toast.success(
            `Portfolio media ${isEditing ? "updated" : "added"} successfully`
        );
    } catch (err) {
        console.error(`failed to ${isEditing ? "update" : "add"} portfolio`, err);
        toast.error(`Failed to ${isEditing ? "update" : "add"} portfolio.`);
    } finally {
        setIsSubmitting(false);
        setIsEditing(false);
        setSelectedPortfolio(null);
        setSelectedPortfolioId(null);
        setFormData(initialData);
      setFormKey((prevKey) => prevKey + 1);
      const modal = document.getElementById(modalId);
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    }
};





  const processAddPortfolio = async (data) => {
    try {
      const res = await addPortfolio(data);

      return res;
    } catch (err) {
      console.error("failed to add-portfolio", err);
      throw err
    }
  };

  const processAddMedia = async (data) => {
    try {
      const res = await addPortfolioMedia(data);
      
      if (res.status !== 201) {
        throw new Error(`Portfolio media failed with status: ${res.status}`);
    }
      return res;
    } catch (err) {
      console.error("failed to add-portfolio", err);
      throw err;
    }
  };

  const processGetAllPortfolio = async (userid) => {
    try {
      const res = await portfolioList(userid);

      return res;
    } catch (err) {
      console.error("failed to get-portfolio", err);
      throw err;
    }
  };


  const processUpdatePortfolio = async (id, data) => {
    try {
      const res = await updatePortfolio(id, data);
      if (res.status !== 200) {
        throw new Error(`Update failed with status: ${res.status}`);
    }
      return res;
    } catch (err) {
      console.error("failed to update-portfolio", err);
      throw err;
    }
  };

  const processUpdatePortfolioMedia = async (id, data) => {
    try {
      const res = await updatePortfolioMedia(id, data);
      if (res.status !== 200) {
        throw new Error(`Update failed with status: ${res.status}`);
    }
      return res;
    } catch (err) {
      console.error("failed to update-portfolio", err);
      throw err;
    }
  };



  const processDeletePortfolio = async (id) => {
    try {
      const res = await deletePortfolio(id);

      return res;
    } catch (err) {
      console.error("failed to delete-portfolio", err);
      throw err;
    }
  };

  // const handleAddPortfolio = async (e) => {
  //   e.preventDefault();
    

  //   setIsSubmitting(true);

  //   try {
  //     await Promise.all([
  //       processAddPortfolio({ ...formData.slice(0, 6), user_id: userId }),
  //       processAddMedia({ ...formData.slice(6), userId }),
  //     ]);

  //     await fetchAllPortfolio();
  //     toast.success("Portfolio added successfully");
  //   } catch (err) {
  //     console.error("failed to add portfolio", err);
  //     toast.error("Portfolio updated successfully");
  //   } finally {
  //     setIsSubmitting(false);
  //     setFormData(initialData);
  //   }
  // };

  // const handleUpdatePortfolio = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     await processUpdatePortfolio(selectedPortfolioId, formData);
  //     await fetchAllPortfolio();
  //   } catch (err) {
  //     console.error("failed to update portfolio", err);
  //   } finally {
  //     setIsSubmitting(false);
  //     setFormData(initialData);
  //     setSelectedPortfolioId(null);
  //   }
  // };


  const handleDeletePortfolio = async () => {
    if (!selectedPortfolioId) {
      toast.error("Please select the portfolio profile to delete");
      return;
    }
    setIsSubmitting(true);
    try {
      await processDeletePortfolio(selectedPortfolioId);
      await fetchAllPortfolio();
      toast.success("Portfolio deleted successfully");
    } catch {
      toast.error("Failed to delete portfolio");
      return false;
    } finally {
      setIsSubmitting(false);
      setSelectedPortfolioId(null);
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
        selectedItems,
        selectedPortfolioId,
        isEditing,
        selectedPortfolio,
        formKey,
        handleAddClick,
        setIsEditing,
        // setEditFirstFormData,
        // setEditSecondFormData,
        setSelectedPortfolio,
        setSelectedPortfolioId,
        setSelectedItems,
        fetchAllPortfolio,
        setFormData,
        setPortfolios,
        handleChange,
        handleResetForm,
        submitFirstForm,
        submitSecondForm,
        processAddPortfolio,
        processGetAllPortfolio,
        processUpdatePortfolio,
        processDeletePortfolio,
        handleDeletePortfolio,
      }}
    >
      {props.children}
    </PortfolioApiData.Provider>
  );
};

export default PortfolioApiDataProvider;
