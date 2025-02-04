import { useContext } from "react";
import ApifyContext from "./ApifyContext";


export const useApify = () => {
    const apifyContext = useContext(ApifyContext);

    if (!apifyContext) {
        throw new Error("useApify must be used within an AuthProvider");
    }

    const { setErrorMessage } = apifyContext;

    const handleAuthError = (errorMessage) => {
        if (setErrorMessage) {
            setErrorMessage(errorMessage);
        }
    };

    return {
        ...apifyContext,
        handleAuthError,
    };
};