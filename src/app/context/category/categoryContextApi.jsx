import React, { createContext, useState, useContext, useEffect } from "react";

import {
  addCategory,
  catgoryList,
  categoryProfile,
  updateCategory,
  deleteCategory,
} from "./categoryApi";
import { CATEGORYFIELD } from "../../../globals/category-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";

export const CategoryApiData = createContext();

const CategoryApiDataProvider = (props) => {
  const { selectedId, setSelectedId, setIsSubmitting } =
    useContext(GlobalApiData);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initialData = CATEGORYFIELD.fieldDetail.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialData);

  const fetchAllCategories = async () => {
    try {
      const res = await processGetAllCategory();
      const data = res.data.data;
      //   console.log(data);
      setAllCategories(data);

      if (data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0]);
        setSelectedId(data[0].id);
      }
    } catch (err) {
      console.error("could not fetch categories", err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const processAddCategory = async (data) => {
    try {
      const res = await addCategory(data);
      console.log("add-category", res);
      return res;
    } catch (error) {
      console.error("Error adding categories:", error);
    } finally {
      setFormData(initialData);
    }
  };

  const processGetAllCategory = async () => {
    try {
      const res = await catgoryList();
      //console.log("getall-category", res);

      return res;
    } catch (error) {
      console.error("error getting all", error);
    }
  };

  const processCategoryProfile = async (id) => {
    try {
      const res = await categoryProfile(id);
      console.log("add-category", res);

      if (res) {
        return res;
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const processSearchCategory = async () => {};

  const processUpdateCategory = async (id, data) => {
    try {
      const res = await updateCategory(id, data);

      return res;
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setFormData(initialData);
    }
  };

  const processDeleteCategory = async (id) => {
    try {
      const res = await deleteCategory(id);
      return res;
    } catch (error) {
      return false;
    }
  };

  const handleSelected = (id) => {
    if (selectedCategory?.id === id) return;

    const selected = allCategories.find((cat) => cat.id === id);
    setSelectedCategory(selected);
    setSelectedId(id);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await processAddCategory(formData);
      await fetchAllCategories();
      toast.success("Category added successfully");
    } catch (err) {
      console.error("failed to add-category", err);
    } finally {
      setFormData(initialData);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      await processUpdateCategory(selectedId, formData);
      await fetchAllCategories();
      toast.success("Category updated successfully");
    } catch (err) {
      toast.error("Failed to update category");
    } finally {
      setFormData(initialData);
    }
  };

  const handleDeleteCategory = async () => {
    setIsSubmitting(true);

    try {
      await processDeleteCategory(selectedId);
      await fetchAllCategories();
      toast.success("Category deleted successfully");
    } catch {
      toast.error("Failed to delete category");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CategoryApiData.Provider
      value={{
        formData,
        allCategories,
        selectedCategory,
        setSelectedCategory,
        setAllCategories,
        setFormData,
        processAddCategory,
        fetchAllCategories,
        processGetAllCategory,
        processCategoryProfile,
        processSearchCategory,
        processUpdateCategory,
        processDeleteCategory,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
        handleSelected,
      }}
    >
      {props.children}
    </CategoryApiData.Provider>
  );
};

export default CategoryApiDataProvider;
