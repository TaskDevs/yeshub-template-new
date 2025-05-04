import React, { createContext, useState, useContext, useEffect } from "react";
import {
  addWorkingHours,
  workingHoursList,
  updateWorkingHours,
  deleteWorkingHours
} from "./workingHoursApi";
import { WORKINGHOURSFIELD } from "../../../globals/working-hours-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";
import { userId } from "../../../globals/constants";
import * as bootstrap from 'bootstrap';


export const WorkingHourspiData = createContext();



const initialData = {
    ...WORKINGHOURSFIELD.fieldDetail.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {}),
    media: [],
};


const WorkingHoursApiDataProvider = (props) => {
  const { setIsSubmitting, setIsLoading } = useContext(GlobalApiData);
  const [selectedWorkingHoursId, setSelectedWorkingHoursId] = useState(null);
  const [workingHours, setWorkingHours] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [formKey, setFormKey] = useState(0)
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWorkingHours, setSelectedWorkingHours] = useState(null);


  const firstFormData = { ...formData };
  delete firstFormData.url;
  delete firstFormData.media;

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const fetchAllWorkingHours = async () => {
    setIsLoading(true);
    try {
      const res = await processGetAllWorkingHours(userId);
      if (res) {
        const data = res.data.data;
        setWorkingHours(data);
      }
    } catch (err) {
      console.error("failed to get working hours", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWorkingHours();
  }, []);

  const validateForm = () => {
    const requiredFields = [
      "availability",
      "notice",
      "preferred_working_hours",
      "time_zone",
      "work_days",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return false;
      }
    }

    // Extra validation for Custom Hours
    if (formData.preferred_working_hours === "Custom Hours") {
      if (!formData.custom_start_hour || !formData.custom_end_hour) {
        toast.error("Please provide both custom start and end hours.");
        return false;
      }
    }
    return true;
  };


  const handleAddClick = () => {
    setIsEditing(false);
    setSelectedWorkingHoursId(null);
    setSelectedWorkingHours(null);
    setFormData(initialData);
    setFormKey((prevKey) => prevKey + 1);
};
  
  
  const submitForm = async (e, onNext) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await processUpdateWorkingHours(selectedWorkingHoursId, { ...firstFormData, id: selectedWorkingHoursId });
      } else {
        await processAddWorkingHours({ ...firstFormData, user_id: userId });
        
      }
      await fetchAllWorkingHours();
      toast.success(
        `Working hours ${isEditing ? "updated" : "added"} successfully`
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
      setSelectedWorkingHours(null);
      setSelectedWorkingHoursId(null);
      }
      
      
    }
  };



  const processAddWorkingHours = async (data) => {
    try {
      const res = await addWorkingHours(data);

      return res;
    } catch (err) {
      console.error("failed to add working hours", err);
      throw err
    }
  };

  const processGetAllWorkingHours = async (userid) => {
    try {
      const res = await WorkingHoursList(userid);

      return res;
    } catch (err) {
      console.error("failed to get working hours", err);
      throw err;
    }
  };


  const processUpdateWorkingHours = async (id, data) => {
    try {
      const res = await updateWorkingHours(id, data);
      if (res.status !== 200) {
        throw new Error(`Update failed with status: ${res.status}`);
    }
      return res;
    } catch (err) {
      console.error("failed to update working hours", err);
      throw err;
    }
  };



  const processDeleteWorkingHours = async (id) => {
    try {
      const res = await deleteWorkingHours(id);

      return res;
    } catch (err) {
      console.error("failed to delete working hours", err);
      throw err;
    }
  };


  const handleDeleteWorkingHours = async () => {
    if (!selectedWorkingHoursId) {
      toast.error("Please select the working hours to delete");
      return;
    }
    setIsSubmitting(true);
    try {
      await processDeleteWorkingHours(selectedWorkingHoursId);
      await fetchAllWorkingHours();
      toast.success("Working hours deleted successfully");
    } catch {
      toast.error("Failed to delete working hours");
      return false;
    } finally {
      setIsSubmitting(false);
      setSelectedWorkingHoursId(null);
    }
  };

  const handleResetForm = () => {
    setFormData(initialData);
  };

  return (
    <WorkingHoursApiData.Provider
      value={{
        formData,
        workingHours,
        selectedItems,
        selectedWorkingHoursId,
        isEditing,
        selectedWorkingHours,
        formKey,
        handleAddClick,
        setIsEditing,
        setSelectedWorkingHours,
        setSelectedWorkingHoursId,
        setSelectedItems,
        fetchAllWorkingHours,
        setFormData,
        setWorkingHours,
        handleChange,
        handleResetForm,
        submitForm,
        processAddWorkingHours,
        processGetAllWorkingHours,
        processUpdateWorkingHours,
        processDeleteWorkingHours,
        handleDeleteWorkingHours,
      }}
    >
      {props.children}
    </WorkingHoursApiData.Provider>
  );
};

export default WorkingHoursApiDataProvider;
