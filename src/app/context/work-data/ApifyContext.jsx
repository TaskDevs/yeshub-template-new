import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';



export const ApifyContext = createContext(null);

export function ApifyProvider({ children }) {
    const [glassdoorData, setGlassdoorData] = useState([])
    const [workdayData, setWorkdayData] = useState([]);
    const [postedJobsData, setPostedJobsData] = useState([]);
    const [error, setError] = useState(null)
   

    const successMessage = toast("Data successfully fetched")
    const errorMessage = toast("Error, Failed to fetch data");
 
    const glassdoorUrl = `${process.env.REACT_APP_BASE_URL}apify/glassdoor`;
    const workdayUrl = `${process.env.REACT_APP_BASE_URL}apify/workday`;
    const postedJobsUrl = `${process.env.REACT_APP_BASE_URL}jobs/posted`;




    useEffect(() => {
			const fetchData = async () => {
				try {
					const [res1, res2, res3] = await Promise.all([
						await axios.get(glassdoorUrl),
						await axios.get(workdayUrl),
						await axios.get(postedJobsUrl),
					]);

					successMessage();
					console.log("res1", res1);
					console.log("res2", res2);
					console.log("res3", res3);

					setGlassdoorData(res1);
					setWorkdayData(res2);
					setPostedJobsData(res3);
				} catch (err) {
					setError(
						err.message || "Oops, an error occurred while fetching data"
					);
					errorMessage();
				}
			};

			fetchData();
		}, [glassdoorUrl, workdayUrl, postedJobsUrl]);


    const data = {
        glassdoorData,
        workdayData,
        postedJobsData,
        error
    }

    return <ApifyContext.Provider value={data}>
      {children}
  </ApifyContext.Provider>;
}

export default ApifyContext