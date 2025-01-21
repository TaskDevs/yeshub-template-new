import { createContext, useState } from "react";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
		const [auth, setAuth] = useState(false) ;
		const [errorMessage, setErrorMessage] = useState("");
		const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    
      const login = async (user) => {
				setCurrentUser(user);
				setAuth(true);
				setIsLoggedIn(true);
    };
         const signup = async (user) => {
						setCurrentUser(user);
			 setAuth(true);
			        localStorage.setItem("user", JSON.stringify(user));
						setIsSignUp(true);
	};

			const logout = () => {
				setCurrentUser(null);
				setAuth(false);
				localStorage.removeItem("user");
			};

			const details = {
				auth,
				setAuth,
				currentUser,
				errorMessage,
				setErrorMessage,
				login,
				logout,
                isLoggedIn,
                signup,
                isSignUp
			};
    
    return (
        <AuthContext.Provider value={details}>
            {children}
        </AuthContext.Provider>
    )
}


