import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context; 
};

export const UserProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(() => {
		const savedUser = sessionStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
    });
    
  

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		console.log("urlParams", urlParams);
		const token = urlParams.get("token");

		console.log("token", token);
		console.log("urlParams-token", urlParams.has("token"));


// token && user;
		if (token) {
			sessionStorage.setItem("authToken", JSON.stringify(token));
			// sessionStorage.setItem("user", JSON.stringify(user));
			navigate("/dashboard-employer")
		} else {
			// sessionStorage.removeItem("user");
			sessionStorage.removeItem("authToken");
			// navigate("/")
		}
	}, [navigate]);

	const updateUser = (userData) => {
		setUser(userData); 
	};

	return (
		<UserContext.Provider value={{ user, updateUser }}>
			{children}
		</UserContext.Provider>
	);
};
