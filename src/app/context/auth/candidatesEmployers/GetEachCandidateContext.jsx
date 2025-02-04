import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useUser } from "../UserContext";


export const GetEachCandidateContext = createContext(null);

export const GetEachCandidateProvider = ({ children }) => {
    const [canListData, setCanListData] = useState([]);
        const [error, setError] = useState(null);
        
        const { user } = useUser();
        
         const getCanListUrl = `${process.env.REACT_APP_BASE_URL}`;


    	useEffect(() => {
				const fetchCandidateData = async () => {
					try {
						const res = await axios.get(getCanListUrl);
						console.log("can-list", res);

						setCanListData(res.data);
					} catch (error) {
						setError(
							error?.message || "Oops, An error occurred while fetching data"
						);
					}
				};
				fetchCandidateData();
			}, [getCanListUrl]);

    const value = {
			canListData,
            error
		};

    return (
        <GetEachCandidateContext.Provider value={value}>
            { children }
            </GetEachCandidateContext.Provider>
		);
}