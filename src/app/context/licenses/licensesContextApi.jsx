import React, { createContext, useState } from "react";
// import { notify } from "../../../utils/responseUtils";

import {
  addLicense,
  licensesList,
  updateLicense,
  deleteLicense,
} from "./licensesApi";
import { LICENSEFIELD } from "../../../globals/license-data";

export const LicenseApiData = createContext();

const LicenseApiDataProvider = (props) => {

  const initialData = LICENSEFIELD.fieldDetail.reduce((acc, field) => {
          acc[field.name] = "";
          return acc;
        }, {})

   const [formData, setFormData] = useState(initialData);
    
     const handleChange = (field, data) => {
        setFormData({
          ...formData,
          [field]: data,
        });
      };
   


  const processAddLicense = async (data) => {
    try {
      const res = await addLicense(data);
      console.log("added license", res)
    } catch (err) {
      console.log("failed to add license", err)
    } finally {
      setFormData(initialData); 
    }

  };

  const processGetAllLicense = async (id) => {
    try {
			const res = await licenseList(id);
			console.log("get license", res);
		} catch (err) {
			console.log("failed to get license", err);
		}
  };



  const processUpdateLicense = async (id, data) => {
    try {
			const res = await updateLicense(id, data);
			console.log("update license", res);
		} catch (err) {
			console.error("failed to update license", err);
		}
  };

  const processDeleteLicense = async (id) => {
    try {
      const res = await deleteLicense(id);
      console.log("deleted license", res)
    } catch (err) {
      console.log("failed to delete license", err)
    }
  };

  return (
		<LicenseApiData.Provider
			value={{
				processAddLicense,
				processGetAllLicense,
				processUpdateLicense,
				processDeleteLicense,
        formData,
        setFormData,
				handleChange,
			}}
		>
			{props.children}
		</LicenseApiData.Provider>
	);
};

export default LicenseApiDataProvider;
