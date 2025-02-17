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

export const ProfileApiData = createContext();

const ProfileApiDataProvider = (props) => {
	const [profileData, setProfileData] = useState({});
	const { setIsSubmitting } = useContext(GlobalApiData);
	const [imageURL, setImageURL] = useState(null); 
	const [selectedFile, setSelectedFile] = useState(null);
	const [formData, setFormData] = useState(
		USERPROFILEFIELD.fieldDetail.reduce((acc, field) => {
			acc[field.name] = "";
			return acc;
		}, {"profile_image": selectedFile})
	);

	

	
	

	useEffect(() => {
		if (!userId) {
			return;
		}
		setIsSubmitting(true);
		const fetchProfile = async () => {
			try {
				const res = await processProfileProfile(userId);
				console.log("Fetching profile", res);

				const data = res.data.data;
				setProfileData(data);
			} catch (error) {
				console.error("failed Fetching profile", error);
			} finally {
				setIsSubmitting(false);
			}
		};
		fetchProfile();
	}, [setIsSubmitting]);

	const processAddProfile = async (data) => {
		try {
			const res = await addProfile(data);
			console.log("add-profile", res);
			return res;
		} catch (err) {
			console.error("add-profile", err);
		}
	};

	const processGetAllProfile = async (id) => {
		
		
		
	};

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

	const handleSubmitProfile = async (e) => {
		e.preventDefault();
		try {
			const response = await processAddProfile({ ...formData, user_id: "1" });
			console.log("add-profile-res", response);
			return response;
		} catch(e) {
			console.error(e)
		}
	};

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		console.log({
			...formData,
			id: "1",
		});

		try {
			const response = await processUpdateProfile(1, {
				...formData,
				id: "1",
			});
			console.log("add-profile-res", response);
		} catch (e) {
			console.error(e);
		}
	};

	const handleEditClick = () => {
		setFormData(profileData);
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
