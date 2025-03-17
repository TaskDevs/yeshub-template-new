import React, { createContext, useState } from "react";

export const GlobalApiData = createContext();

const GlobalApiDataProvider = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [roleOption, setRoleOption] = useState("user");
    const [selectedId, setSelectedId] = useState("");
	const [showDetailsId, setShowDetailsId] = useState("")
	const jobId = sessionStorage.getItem("job_id")
	

	

    const handleClicked = (id) => {
			
			setSelectedId(id);
			setShowDetailsId(id);
		};

	return (
		<GlobalApiData.Provider
			value={{
				jobId,
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
