import React, { createContext, useState, useContext, useEffect } from "react";

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
    
  

	useEffect(() => {
		if (user) {
			sessionStorage.setItem("user", JSON.stringify(user));
		} else {
			sessionStorage.removeItem("user");
		}
	}, [user]);

	const updateUser = (userData) => {
		setUser(userData); 
	};

	return (
		<UserContext.Provider value={{ user, updateUser }}>
			{children}
		</UserContext.Provider>
	);
};
