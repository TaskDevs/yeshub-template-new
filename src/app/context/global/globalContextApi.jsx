import React, { createContext, useState, useEffect } from "react";

export const GlobalApiData = createContext();

const GlobalApiDataProvider = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [roleOption, setRoleOption] = useState("user");
    const [selectedId, setSelectedId] = useState("");
	const [showDetailsId, setShowDetailsId] = useState("")
	
	useEffect(() => {
		
		if (!isSubmitting) {
			console.log("submitting ended");
		}
		setTimeout(() => {
			setIsLoading(false)
		}, 3000);
	}, [isSubmitting]);

    const handleClicked = (id) => {
			console.log("id-clicked", id);
			setSelectedId(id);
			setShowDetailsId(id);
		};

	return (
		<GlobalApiData.Provider
			value={{
				isLoading,
				setIsLoading,
				roleOption,
				setRoleOption,
				isVisible,
				setIsVisible,
				isSubmitting,
				setIsSubmitting,
				selectedId,
				setSelectedId,
				showDetailsId,
				setShowDetailsId,
				handleClicked,
			}}
		>
			{props.children}
		</GlobalApiData.Provider>
	);
};

export default GlobalApiDataProvider;
