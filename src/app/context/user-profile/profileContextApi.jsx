import React, { createContext, useState, useEffect, useContext } from "react";
import { SUCCESS_STATUS, LIST_ON_PAGES } from "../../../globals/constants";
import { notify } from "../../../utils/responseUtils";

import {
	addProfile,
	searchProfile,
	profileList,
	profileProfile,
	updateProfile,
	deleteProfile,
} from "./profileApi";
import { USERPROFILEFIELD } from "../../../globals/user-profile-data";
import { GlobalApiData } from "../global/globalContextApi";
import { userId } from "../../../globals/dummy-users";
import { toast } from "react-toastify";

export const ProfileApiData = createContext();

const ProfileApiDataProvider = (props) => {
	const [profileData, setProfileData] = useState({});
	const { setIsSubmitting } = useContext(GlobalApiData);
	const [imageURL, setImageURL] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [profileUpdated, setProfileUpdated] = useState(false);

	const initialFormData = USERPROFILEFIELD.fieldDetail.reduce((acc, field) => {
		acc[field.name] = "";
		return acc;
	}, {});

	const [formData, setFormData] = useState(initialFormData);

	
	// "profile_image": selectedFile

	console.log("formData-ctx", formData);
	console.log("selectedFile", selectedFile);
	console.log("selectedFilename", selectedFile?.name);


	useEffect(() => {
		if (!userId) return;

		setIsSubmitting(true);
		const fetchProfile = async () => {
			try {
				const res = await processProfileProfile(userId);
				console.log("Fetching profile", res);

				const data = res.data.data;
				setProfileData(data);
			} catch (error) {
				console.error("Failed Fetching profile", error);
			} finally {
				setIsSubmitting(false);
				
			}
		};
		fetchProfile();
	}, [profileUpdated, setIsSubmitting]); 

	const processAddProfile = async (data) => {
		try {
			const res = await addProfile(data);
			console.log("add-profile", res);
			return res;
		} catch (err) {
			console.error("add-profile", err);
		}
	};

	const processGetAllProfile = async (id) => {};

	const processProfileProfile = async (id) => {
		try {
			const res = await profileProfile(id);
			console.log("profile", res);
			return res;
		} catch (err) {
			console.error("profile-profile-err", err);
		}
	};

	const processSearchProfile = async (data) => {};

	const processUpdateProfile = async (id, data) => {
		const res = await updateProfile(id, data);
		console.log("profile", res);
		return res;
	};

	const processDeleteProfile = async (id) => {
		const res = await deleteProfile(id);
		console.log("profile", res);
		return res;
	};

	// const handleSubmitProfile = async (e) => {
	// 	e.preventDefault();
	// 	setIsSubmitting(true);
	// 	// const profileFormData = new FormData();
	// 	console.log("selectedFile-submit", selectedFile?.name);

		
	// 	console.log("profileFormData", {
	// 		...formData,
	// 		user_id: "1",
	// 		profile_image: selectedFile?.name,
	// 	});
    //      console.log("image selected", selectedFile)
	// 	try {
	// 		const response = await processAddProfile({
	// 			...formData,
	// 			user_id: "1",
	// 			"profile_image": selectedFile.name
	// 		});
	// 		console.log("add-profile-res", response);
	// 		toast.success("Profile added successfully");
	// 		return response;
			
	// 	} catch (e) {
	// 		console.error("adding profile error",e);
	// 		notify("An error occurred while adding the profile");
	// 	} finally {
	// 		setIsSubmitting(false);
			
	// 	}
	// };

	const handleSubmitProfile = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!selectedFile) {
			notify("Please select a profile image before submitting.");
			setIsSubmitting(false);
			return;
		}

		const profileFormData = new FormData();
		profileFormData.append("user_id", "1");
		profileFormData.append("profile_image", selectedFile); // Append file
		Object.entries(formData).forEach(([key, value]) => {
			profileFormData.append(key, value);
		});

		console.log("profileFormData", Object.fromEntries(profileFormData));

		try {
			const response = await processAddProfile(profileFormData); // Ensure this handles FormData properly
			console.log("add-profile-res", response);
			toast.success("Profile added successfully");
			return response;
		} catch (e) {
			console.error("adding profile error", e);
			notify("An error occurred while adding the profile");
		} finally {
			setIsSubmitting(false);
		}
	};

	
	
	
	
	
	
	
	
	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		console.log({
			...formData,
			id: userId,
		});

		try {
			const response = await processUpdateProfile(6, {
				...formData,
				id: userId,
			});
			console.log("add-profile-res", response);
		} catch (e) {
			console.error(e);
			notify("An error occurred while updating the profile", "error");
			 setFormData(initialFormData); 
				setSelectedFile(null); 
				setImageURL(null);
		}
	};

	const handleEditClick = () => {
		setFormData(profileData);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		console.log("file-img", file);
		setSelectedFile(file);

		const reader = new FileReader();
		console.log("reader", reader);

		reader.onloadend = () => {
			setImageURL(reader.result);
		};
		

		// if (file) {
		// 	const reader = new FileReader();
		// 	console.log("reader", reader)

		// 	reader.onloadend = () => {
		// 		setImageURL(reader.result);
		// 	};

		// 	reader.readAsDataURL(file);
		// } else {
		// 	setImageURL(null);
		// }
	};

	return (
		<ProfileApiData.Provider
			value={{
				profileData,
				formData,
				imageURL,
				processAddProfile,
				processGetAllProfile,
				processProfileProfile,
				processSearchProfile,
				processUpdateProfile,
				processDeleteProfile,
				handleSubmitProfile,
				handleUpdateProfile,
				setFormData,
				handleEditClick,
				handleImageChange,
			}}
		>
			{props.children}
		</ProfileApiData.Provider>
	);
};

export default ProfileApiDataProvider;
