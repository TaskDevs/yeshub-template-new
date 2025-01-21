import { useContext } from "react";
import { AuthContext } from "./AuthContext";


const useAuth = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const { setErrorMessage } = authContext;

	const handleAuthError = (errorMessage) => {
		if (setErrorMessage) {
			setErrorMessage(errorMessage);
		}
	};

	return {
		...authContext,
		handleAuthError,
	};
};

export default useAuth;
