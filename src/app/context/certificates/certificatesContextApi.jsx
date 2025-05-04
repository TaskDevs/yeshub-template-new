import React, { createContext, useState, useContext, useEffect } from "react";
import {
  addCertificate,
  certificateList,
  certificateView,
  updateCertificate,
  deleteCertificate
} from "./certficatesApi";
import { CERTIFICATEFIELD } from "../../../globals/certificate-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";
import { userId } from "../../../globals/constants";
import * as bootstrap from 'bootstrap';


export const CertificateApiData = createContext();



const initialData = {
    ...CERTIFICATEFIELD.fieldDetail.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {}),
    media: [],
};


const CertificateApiDataProvider = (props) => {
  const { setIsSubmitting, setIsLoading } = useContext(GlobalApiData);
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [formKey, setFormKey] = useState(0)
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);


  const firstFormData = { ...formData };
  delete firstFormData.url;
  delete firstFormData.media;

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const fetchAllCertificates = async () => {
    setIsLoading(true);
    try {
      const res = await processGetAllCertificates(userId);
      if (res) {
        const data = res.data.data;
        setCertificates(data);
      }
    } catch (err) {
      console.error("failed to get certificates", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCertificates();
  }, []);

  const validateForm = () => {
    const requiredFields = [
      "name",
      "organization",
      "issued_at",
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
    setIsEditing(false);
    setSelectedCertificateId(null);
    setSelectedCertificate(null);
    setFormData(initialData);
    setFormKey((prevKey) => prevKey + 1);
};
  
  
  const submitForm = async (e, onNext) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await processUpdateCertificate(selectedCertificateId, { ...firstFormData, id: selectedCertificateId });
      } else {
        await processAddCertificate({ ...firstFormData, user_id: userId });
        
      }
      await fetchAllCertificate();
      toast.success(
        `Certificate ${isEditing ? "updated" : "added"} successfully`
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
      setSelectedCertificate(null);
      setSelectedCertificateId(null);
      }
      
      
    }
  };



  const processAddCertificate = async (data) => {
    try {
      const res = await addCertificate(data);

      return res;
    } catch (err) {
      console.error("failed to add certificate", err);
      throw err
    }
  };

  const processGetAllCertificates = async (userid) => {
    try {
      const res = await certificateList(userid);

      return res;
    } catch (err) {
      console.error("failed to get certificates", err);
      throw err;
    }
  };


  const processUpdateCertificate = async (id, data) => {
    try {
      const res = await updateCertificate(id, data);
      if (res.status !== 200) {
        throw new Error(`Update failed with status: ${res.status}`);
    }
      return res;
    } catch (err) {
      console.error("failed to update certificate", err);
      throw err;
    }
  };



  const processDeleteCertificate = async (id) => {
    try {
      const res = await deleteCertificate(id);

      return res;
    } catch (err) {
      console.error("failed to delete certificate", err);
      throw err;
    }
  };


  const handleDeleteCertificate = async () => {
    if (!selectedCertificateId) {
      toast.error("Please select the certificate to delete");
      return;
    }
    setIsSubmitting(true);
    try {
      await processDeleteCertificate(selectedCertificateId);
      await fetchAllCertificates();
      toast.success("Certificate deleted successfully");
    } catch {
      toast.error("Failed to delete certificate");
      return false;
    } finally {
      setIsSubmitting(false);
      setSelectedCertificateId(null);
    }
  };

  const handleResetForm = () => {
    setFormData(initialData);
  };

  return (
    <CertificateApiData.Provider
      value={{
        formData,
        certificates,
        selectedItems,
        selectedCertificateId,
        isEditing,
        selectedCertificate,
        formKey,
        handleAddClick,
        setIsEditing,
        setSelectedCertificate,
        setSelectedCertificateId,
        setSelectedItems,
        fetchAllCertificates,
        setFormData,
        setCertificates,
        handleChange,
        handleResetForm,
        submitForm,
        processAddCertificate,
        processGetAllCertificates,
        processUpdateCertificate,
        processDeleteCertificate,
        handleDeleteCertificate,
      }}
    >
      {props.children}
    </CertificateApiData.Provider>
  );
};

export default CertificateApiDataProvider;
