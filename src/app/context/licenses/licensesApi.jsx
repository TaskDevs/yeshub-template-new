// if issues arise with axios import basic_url and import axios from original source from constant
// import axios from "../../../utils/axios.config";
import axios from "axios";
import {
	REACT_BASE_URL,
	
} from "../../../globals/constants";


export const addLicense = async (data) => {
  try {
    let responseOnAddLicense = await axios.post(
			`${REACT_BASE_URL}licenses`,
			data
		);
    return responseOnAddLicense;
    
  } catch (err) {
    console.log(err);
    return false;
  }
};



// LIST Licenses
/**Add Get Employer API URL here like /api/getEmployer?page=${pageNo}&perPage=${LIST_ON_PAGES}**/
export const licensesList = async (id) => {
  try {
    let responseOnLicenseList = await axios.get(
			`${REACT_BASE_URL}licenses/${id}`
		);
    return responseOnLicenseList;

  } catch (err) {
    console.log(err);
    return false;
  }
};


// UPDATE License
export const updateLicense = async (id, data) => {
  try {
    let responseOnUpdateLicense = await axios.put(
			`${REACT_BASE_URL}licenses/${id}`,
			data
		);
    return responseOnUpdateLicense;
  } catch (err) {
    console.log(err);
  }
};

// DELETE License
export const deleteLicense = async (id) => {
  try {
    let responseOnDeleteLicense = await axios.delete(
			`${REACT_BASE_URL}licenses/${id}`
		);
    return responseOnDeleteLicense;
  } catch (err) {
    console.error(err);
  }
};
