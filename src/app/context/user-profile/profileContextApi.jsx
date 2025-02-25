import React, { createContext, useState, useContext } from "react";

import {
  addProfile,
  profileList,
  profileProfile,
  updateProfile,
  deleteProfile,
} from "./profileApi";
import { USERPROFILEFIELD } from "../../../globals/user-profile-data";
import { GlobalApiData } from "../global/globalContextApi";
import { userId } from "../../../globals/dummy-users";
import toast from "react-hot-toast";

export const ProfileApiData = createContext();

const ProfileApiDataProvider = (props) => {
  const { setIsSubmitting } = useContext(GlobalApiData);
  const [imageURL, setImageURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileData, setProfileData] = useState({});

  const initialFormData = USERPROFILEFIELD.fieldDetail.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);

  const processAddProfile = async (data) => {
    try {
      const res = await addProfile(data);
      return res;
    } catch (err) {
      console.error("add-profile", err);
    }
  };

  const processGetAllProfile = async () => {
    try {
      const res = await profileList();
      return res;
    } catch (e) {
      console.error("get-all-profile", e);
    }
  };

  const processProfileProfile = async (id) => {
    try {
      const res = await profileProfile(id);
      console.log("profile", res);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  const processUpdateProfile = async (id, data) => {
    try {
      const res = await updateProfile(id, data);

      return res;
    } catch (e) {
      throw new Error("Failed to update profile", e);
    }
  };

  const processDeleteProfile = async (id) => {
    try {
      const res = await deleteProfile(id);
      console.log("profile", res);
      return res;
    } catch (e) {
      throw new Error("Failed to delete profile", e);
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("setIsSubmitting");

    if (!selectedFile) {
      toast.error("Please select a profile image before submitting.");
      setIsSubmitting(false);
      return;
    }

    const profileFormData = new FormData();
    profileFormData.append("user_id", "1");
    profileFormData.append("profile_image", selectedFile);
    profileFormData.append("user_id", userId);
    profileFormData.append("profile_image", selectedFile);
    Object.entries(formData).forEach(([key, value]) => {
      profileFormData.append(key, value);
    });

    console.log("profileFormData", Object.fromEntries(profileFormData));

    try {
      const response = await processAddProfile(profileFormData);

      console.log("add-profile-res", response);
      toast.success("Profile added successfully");
      return response;
    } catch (e) {
      console.error("adding profile error", e);
      toast.error("An error occurred while adding the profile");
    } finally {
      setIsSubmitting(false);
      setFormData(initialFormData);
      setFormData(initialFormData);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      id: userId,
    });

    try {
      const response = await processUpdateProfile(userId, {
        ...formData,
        id: userId,
      });
      toast.success("Profile data updated successfully");
      return response;
    } catch (e) {
      console.error("Failed to update profile", e);
      toast.error("An error occurred while updating the profile", "error");
      setSelectedFile(null);
      setImageURL(null);
    } finally {
      setFormData(initialFormData);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file-img", file);
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);

      reader.onloadend = () => {
        setImageURL(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImageURL(null);
    }
  };

  return (
    <ProfileApiData.Provider
      value={{
        profileData,
        formData,
        imageURL,
        setProfileData,
        processAddProfile,
        processGetAllProfile,
        processProfileProfile,
        processUpdateProfile,
        processDeleteProfile,
        handleSubmitProfile,
        handleUpdateProfile,
        setFormData,
        handleImageChange,
      }}
    >
      {props.children}
    </ProfileApiData.Provider>
  );
};

export default ProfileApiDataProvider;
