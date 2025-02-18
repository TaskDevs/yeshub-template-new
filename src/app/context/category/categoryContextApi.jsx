import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
  addCategory,
  searchCategory,
  catgoryList,
  categoryProfile,
  updateCategory,
  deleteCategory,
} from "./categoryApi";
import { CATEGORYFIELD } from "../../../globals/category-data";
import { GlobalApiData } from "../global/globalContextApi";

export const CategoryApiData = createContext();

const CategoryApiDataProvider = (props) => {

  const { selectedId } = useContext(GlobalApiData)
  const initialData = CATEGORYFIELD.fieldDetail.reduce((acc, field) => {
		acc[field.name] = "";
		return acc;
	}, {});

	const [formData, setFormData] = useState(initialData);
  
     console.log("form-cat", formData)





	const processAddCategory = async (data) => {
		try {
			const res = await addCategory(data);
			console.log("add-category", res);

			
				return res;
			
		} catch (error) {
			console.error("Error adding categories:", error);
		}
	};

	const processGetAllCategory = async () => {
	  try {
			const res = await catgoryList();
			console.log("getall-category", res);

				return res;
			
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	

	

	const processCategoryProfile = async (id) => {
		try {
			const res = await categoryProfile(id);
			console.log("add-category", res);

			if (res) {
				notify(
					res.data.status,
					"Category fetch successfully",
					"Failed to fetch category"
				);
				return res;
			}
		} catch (error) {
			console.error("Error fetching category:", error);
		}
	};

	const processSearchCategory = async (data) => {};

	const processUpdateCategory = async (id, data) => {
		try {
			const res = await updateCategory(id, data);
			console.log("update-category", res);
			if (res) {
				notify(
					res.data.status,
					"Category updated successfully",
					"Failed to update category"
				);
				return res;
			}
		} catch (error) {
			console.error("Error fetching category:", error);
		}
	};

	const processDeleteCategory = async (id) => {
		try {
			const res = await deleteCategory(id);
			console.log("delete-category", res);

			if (res) {
				notify(
					res.data.status,
					"Category deleted successfully",
					"Failed to delete category"
				);
				return res;
			}
		} catch (error) {
			console.error("Error fetching category:", error);
		}
	};

	const handleAddCategory = async (e) => {
		e.preventDefault();
		try {
			const res = await processAddCategory(formData);
			console.log("add-category", res);
		} catch (err) {
			console.error("failed to add-category", err);
		} finally {
			setFormData(initialData);
		}
	};

	const handleUpdateCategory = async (e) => {
    e.preventDefault();
     console.log("selectedId-ctx", selectedId);
    try {
      
			const res = await processAddCategory(selectedId, formData);
			console.log("add-category", res);
		} catch (err) {
			console.error("failed to update-category", err);
		}
  };
  
 

	return (
		<CategoryApiData.Provider
			value={{
				formData,
				setFormData,
				processAddCategory,
				processGetAllCategory,
				processCategoryProfile,
				processSearchCategory,
				processUpdateCategory,
				processDeleteCategory,
				handleAddCategory,
				handleUpdateCategory,
			}}
		>
			{props.children}
		</CategoryApiData.Provider>
	);
};

export default CategoryApiDataProvider;
