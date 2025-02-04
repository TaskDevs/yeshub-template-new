import { createContext, useState } from "react";


export const MilestoneContext = createContext();


export const MilestoneProvider = ({ children }) => {

    const initialData = {
			description: "",
			amount: 0,
        date: "",
    };
    
    const [inputData, setInputData] = useState(initialData);

    
    const handleChange = (e) => {
			setInputData({
				...inputData,
				[e.target.name]: e.target.value,
			});
		};




    const value = {
			...inputData,
			handleChange,
		};



    return (
			<MilestoneContext.Provider value={value}>
				{children}
			</MilestoneContext.Provider>
		);
}