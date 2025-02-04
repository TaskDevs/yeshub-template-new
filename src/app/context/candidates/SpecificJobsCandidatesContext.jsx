import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const SpecificJobsContext = createContext(null);


export const SpecificJobProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    //EXTRACT USER IDS ALSO AND  CREATE UTILS TO EXTRACT THE RECEIPIENT'S EMAIL FOR MESSAGES

    const url = `${process.env.REACT_APP_BASE_URL}`


    useEffect(() => {

       
        const fetchData = async () => {
                 try {
										const res = await axios.get(url);
                     console.log("specific-jobs-cans", res);
                     setSuccess("Candidates data fetched successfully")

                     setData(res.data);
                 } catch (error) {
                     setError(error || " Couldn't get candidates data from server");
                                    }
				
			};

			fetchData();
    }, [url]);
    

    const value = {
        data,
        success,
        error
    }



    return (
			<SpecificJobsContext.Provider value={value}>
				{children}
			</SpecificJobsContext.Provider>
		);
}