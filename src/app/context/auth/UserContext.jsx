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
	
	const [user, setUser] = useState(() => {
		const savedUser = sessionStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const [token, setToken] = useState(() => sessionStorage.getItem("authToken"));
    

	console.log("user1", user)
  

	useEffect(() => {
		
		if (user) {
			
			sessionStorage.setItem("user", JSON.stringify(user));
			// sessionStorage.setItem("authToken", JSON.stringify(user.token));
			
			console.log("user2", user)
			
		} else {
			sessionStorage.removeItem("user");
			sessionStorage.removeItem("authToken");
			setToken(null)
			
		}
		
        setToken(sessionStorage.getItem("authToken"));
	}, [user]);

	const updateUser = (userData) => {
		console.log("updateUser", userData)
		if (userData) {
			setUser(userData);
			sessionStorage.setItem("user", JSON.stringify(userData));
			sessionStorage.setItem("authToken", JSON.stringify(token));
		} else {
			setUser(null);
			sessionStorage.removeItem("user");
			sessionStorage.removeItem("authToken"); 
		}
	};


	return (
		<UserContext.Provider value={{ user, updateUser, token }}>
			{children}
		</UserContext.Provider>
	);
};
