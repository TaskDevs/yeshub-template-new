// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config"
import axios from "axios";
import { SUCCESS_STATUS, REACT_BASE_URL} from "../../../globals/constants";

// ADD CATEGORY
export const addCategory = async (data) => {
  console.log("data-category", data)
  try {
    let responseOnAddCategory = await axios.post( 
      `${REACT_BASE_URL}job-categories`,
     data
    );
     console.log(responseOnAddCategory);
			return responseOnAddCategory;
    // if (responseOnAddCategory.status === SUCCESS_STATUS) {
    //   return responseOnAddCategory.data;
    // } else {
    //   return false;
    // }
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

				/**Add Get Category API URL here like /api/getCategory?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
			
export const catgoryList = async () => {
  try {
    let responseOnCategoryList = await axios.get(`${REACT_BASE_URL}job-categories`);

   console.log(responseOnCategoryList);
		return responseOnCategoryList;

    // if (responseOnCategoryList.status === SUCCESS_STATUS) {
    //   return responseOnCategoryList.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// VIEW CATEGORY

				/**Add View Category API URL here like ${URL}api/getCategoryProfile/${id}**/
			
export const categoryProfile = async (id) => {
  try {
    let responseOnCategoryProfile = await axios.get(
			
			`${REACT_BASE_URL}job-categories/${id}`
    );
    console.log(responseOnCategoryProfile);
    return responseOnCategoryProfile;

    // if (responseOnCategoryProfile.status === SUCCESS_STATUS) {
    //   return responseOnCategoryProfile.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// UPDATE CATEGORY

				/**Add Update Category API URL here like  `${URL}api/updateCategory/${data.id}` **/
			
export const updateCategory = async (id, data) => {
  
  try {
    console.log("data-p-update", data)
    let responseOnUpdateCategory = await axios.put(
			`${REACT_BASE_URL}job-categories/${id}`,
			data
		);
    
    return responseOnUpdateCategory;
    // if (responseOnUpdateCategory.status === SUCCESS_STATUS) {
    //   return responseOnUpdateCategory.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log(err);
  }
};

// DELETE CATEGORY
/**Add Delete Category API URL here like  `/api/deleteCategory/${data}` **/
export const deleteCategory = async (id) => {
  try {
    let responseOnDeleteCategory = await axios.delete(	
			`${REACT_BASE_URL}job-categories/${id}`
    );
    console.log(responseOnDeleteCategory);
		return responseOnDeleteCategory;
    // if (responseOnDeleteCategory.status === SUCCESS_STATUS) {
    //   return responseOnDeleteCategory.data;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.error(err);
  }
};
