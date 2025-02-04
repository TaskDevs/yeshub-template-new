import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const GetAllCandidateContext = createContext(null);

export const GetAllCandidateProvider = ({ children }) => {
    const [canData, setCanData] = useState([]);
    const [error, setError] = useState(null);
    
     const getCanUrl = `${process.env.REACT_APP_BASE_URL}candidates`;


    useEffect(() => {
			const fetchCandidateData = async () => {
				try {
					const res = await axios.get(getCanUrl);
					console.log("can-list", res);

					setCanData(res.data);
				} catch (error) {
					setError(
						error?.message || "Oops, An error occurred while fetching data"
					);
				}
			};
			fetchCandidateData();
		}, [getCanUrl]);
    

    const value = {
        canData,
        error
    }

    return (
        < GetAllCandidateContext.Provider value={value}>
            { children }
        </GetAllCandidateContext.Provider>
    )
}