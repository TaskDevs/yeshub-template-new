// if issues arise with axios import basic_url and import axios from original source from constant
import axios from "../../../utils/axios.config";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";

// ADD CATEGORY
export const addCategory = async (data) => {
  try {
    let responseOnAddCategory = await axios.post(
      {
        /**Add Create Category API URL here**/
      },
      data
    );
    if (responseOnAddCategory.status === SUCCESS_STATUS) {
      return responseOnAddCategory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// SEARCH CATEGORY
export const searchCategory = async (data) => {
  try {
    let responseOnSearchCategory = await axios.get({
      /**Add Search Category API URL here like /searchApplication?keyword=${data}**/
    });
    if (responseOnSearchCategory.status === SUCCESS_STATUS) {
      return responseOnSearchCategory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// LIST CATEGORY
export const catgoryList = async (pageNo) => {
  try {
    let responseOnCategoryList = await axios.get({
      /**Add Get Category API URL here like /api/getCategory?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
    });

    if (responseOnCategoryList.status === SUCCESS_STATUS) {
      return responseOnCategoryList.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW CATEGORY
export const categoryProfile = async (id) => {
  try {
    let responseOnCategoryProfile = await axios.get({
      /**Add View Category API URL here like ${URL}api/getCategoryProfile/${id}**/
    });

    if (responseOnCategoryProfile.status === SUCCESS_STATUS) {
      return responseOnCategoryProfile.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE CATEGORY
export const updateCategory = async (data) => {
  try {
    let responseOnUpdateCategory = await axios.put({
      /**Add Update Category API URL here like  `${URL}api/updateCategory/${data.id}` **/
    });
    if (responseOnUpdateCategory.status === SUCCESS_STATUS) {
      return responseOnUpdateCategory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE CATEGORY
export const deleteCategory = async (data) => {
  try {
    let responseOnDeleteCategory = await axios.delete({
      /**Add Delete Category API URL here like  `/api/deleteCategory/${data}` **/
    });
    if (responseOnDeleteCategory.status === SUCCESS_STATUS) {
      return responseOnDeleteCategory.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
