import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GetAllEmployersContext = createContext(null);

export const GetAllEmployersProvider = ({ children }) => {
	const [empData, setEmpData] = useState([]);
    const [error, setError] = useState(null);
    

    const getEmpUrl = `${process.env.REACT_APP_BASE_URL}employers`

	useEffect(() => {
		const fetchCandidateData = async () => {
			try {
				const res = await axios.get(getEmpUrl);
				console.log("emp-list", res);

				setEmpData(res.data);
			} catch (error) {
				setError(
					error?.message || "Oops, An error occurred while fetching data"
				);
			}
		};
		fetchCandidateData();
	}, [getEmpUrl]);

	const value = {
		empData,
		error,
	};

	return (
		<GetAllEmployersContext.Provider value={value}>
			{children}
		</GetAllEmployersContext.Provider>
	);
};
