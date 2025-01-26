// import React, { createContext, useState, useContext } from "react";

// Create a context for the user data
// const UserContext = createContext();

// // Custom hook to use the user context
// export const useUser = () => useContext(UserContext);

// Provider component to wrap your app and provide the user data
// export const UserProvider = ({ children }) => {
// 	const [user, setUser] = useState(null);

// 	const updateUser = (userData) => {
// 		setUser(userData); // Update the user data in state
// 	};

// 	return (
// 		<UserContext.Provider value={{ user, updateUser }}>
// 			{children}
// 		</UserContext.Provider>
// 	);
// };




import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		// Check if user data is available in sessionStorage
		const savedUser = sessionStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
    });
    
  

	useEffect(() => {
		// When user data changes, store it in sessionStorage
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
