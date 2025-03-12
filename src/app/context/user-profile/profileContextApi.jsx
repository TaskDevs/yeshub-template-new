import React, { createContext, useState, useContext, useEffect } from "react";

import {
  addProfile,
  profileList,
  profileProfile,
  updateProfile,
  deleteProfile,
  fullProfileProfile
} from "./profileApi";
import { USERPROFILEFIELD } from "../../../globals/user-profile-data";
import { GlobalApiData } from "../global/globalContextApi";
import toast from "react-hot-toast";
import { OAuthUserId, userId } from "../../../globals/constants";

export const ProfileApiData = createContext();


const initialFormData = USERPROFILEFIELD.fieldDetail.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});



const ProfileApiDataProvider = (props) => {
  const { setIsSubmitting, setIsLoading } = useContext(GlobalApiData);
  const [imageURL, setImageURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [allUsersProfile, setAllUsersProfile] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [imgSrc, setImgSrc] = useState(`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData?.profile_image}`);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem('isSidebarCollapsed');
    return savedState ? JSON.parse(savedState) : true; 
  }); 
  
  // console.log("selectedFile", selectedFile)
  // console.log("imageurl", imageURL)


  const toggleSidebar = () => {
    setSidebarCollapsed(prevState => {
      const newState = !prevState;
      localStorage.setItem('isSidebarCollapsed', JSON.stringify(newState)); // Save new state to local storage
      return newState;
    });
  };
  

  

  const fetchProfile = async () => {
    setTimeout(() => {
      setIsLoading(true)
    }, 200)
    try{
      const res = await processProfileProfile(userId);
    if (res) {
      setProfileData(res.data.data);
    }
    } catch (e) {
      throw new Error("could not fetch profile", e);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
    
  };

  useEffect(() => {

    fetchProfile();
    
  }, []);


  useEffect(() => {
    const fetchAllProfile = async () => {
      setTimeout(() =>{
        setIsLoading(true)
      }, 200)

      try{
        const res = await profileList();
      if (res) {
        // console.log("res-all", res)
        setAllUsersProfile(res.data.data);
      }
    } catch (e) {
      throw new Error("could not fetch all profiles", e);  
    } finally {
      setTimeout(() =>{
        setIsLoading(false)
      }, 2000)
    }
      }

    fetchAllProfile();
   
   
    // const interval = setInterval(fetchAllProfile, 60000);
    // return () => clearInterval(interval); 
  }, []);

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
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  const processFullProfileProfile = async (id) => {
    try {
      const res = await fullProfileProfile(id);
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
      return res;
    } catch (e) {
      throw new Error("Failed to delete profile", e);
    }
  };


  const handleReset = () => {
    setFormData(initialFormData);
  }
  

  const handleSubmitProfile = async (e) => {
   
    e.preventDefault();
    

    if (!selectedFile) {
      toast.error("Please select a profile image before submitting.");
      setIsSubmitting(false);
      return;
    }

    if (selectedItems.length <= 2) {
      toast.error("Please select at least 3 skills");
      setIsSubmitting(false);
      return;
    }

    if (!formData.bio) { 
      toast.error("Please fill out the description field.");
      setIsSubmitting(false);
      return;
  }

  setIsSubmitting(true);

    setTimeout(() => {
      setIsLoading(true)
    }, 200)
    
    // let base64String = imageURL.replace(/^data:image\/\w+;base64,/, '');

    const profileFormData = new FormData();
    profileFormData.append("profile_image", imageURL);
    profileFormData.append("user_id", userId || OAuthUserId);
    profileFormData.append("country", "Ghana");
    Object.entries(formData).forEach(([key, value]) => {
      profileFormData.append(key, value);
    });


    try {
      const response = await processAddProfile(profileFormData);
      console.log("add-user-profile", response)
      if (response) {
        await fetchProfile()
        Promise.resolve().then(() => toast.success("Profile added successfully"));
      }
      
      return response;
    } catch (e) {
      console.error("adding profile error", e);
      Promise.resolve().then(() => toast.error("An error occurred while adding the profile")); 
    } finally {
      setIsSubmitting(false);
      setFormData(initialFormData);
      setTimeout(() => {
        setIsLoading(false)
      }, 200)
  
      
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await processUpdateProfile(userId, {
        ...formData,
        id: userId,
      });
      if (response) {
        await fetchProfile()
        toast.success("Profile data updated successfully");
      return response;
      }
      
    } catch (e) {
      console.error("Failed to update profile", e);
      toast.error("Failed to update the profile");
      setSelectedFile(null);
      setImageURL(null);
    } finally {
      setFormData(initialFormData);
      setSelectedItems([])
      
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageURL(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImageURL(null);
    }
  };

  const handleDeleteProfile = async () => {
    
		setIsSubmitting(true);
		try {
			await processDeleteProfile(profileData.user_id);		
			toast.success("User profile deleted successfully");
			window.location.reload();  

		} catch {
			toast.error("Failed to delete profile");
			return false;
		} finally {
			setIsSubmitting(false);
      
		}
	};






  return (
    <ProfileApiData.Provider
      value={{
        profileData,
        formData,
        imageURL,
        selectedItems,
        allUsersProfile,
        isSidebarCollapsed,
        imgSrc, 
        setImgSrc,
        fetchProfile,
        processFullProfileProfile,
        toggleSidebar,
        setSelectedItems,
        setProfileData,
        processAddProfile,
        processGetAllProfile,
        processProfileProfile,
        handleReset,
        processUpdateProfile,
        processDeleteProfile,
        handleSubmitProfile,
        handleUpdateProfile,
        handleDeleteProfile,
        setFormData,
        handleImageChange,
      }}
    >
      {props.children}
    </ProfileApiData.Provider>
  );
};

export default ProfileApiDataProvider;



// if (userDeleteResponse ) {
//   await fetchProfile()
//   toast.success("User profile deleted successfully");
// // window.location.reload();
// } else {
//   return false;
// }
// console.log("userDeleteResponse", userDeleteResponse)
//       await fetchProfile()
