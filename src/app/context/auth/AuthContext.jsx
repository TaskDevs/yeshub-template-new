import axios from "axios";
import { createContext, useState } from "react";
import {
	candidate,
	canRoute,
	employer,
	empRoute,
} from "../../../globals/route-names";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [auth, setAuth] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [canUsername, setCanUsername] = useState("johndoe");
	const [empUsername, setEmpUsername] = useState("johndoe");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [role, setRole] = useState("1");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [showTopMessage, setShowTopMessage] = useState(false);
	

	const navigate = useNavigate();
	const { updateUser } = useUser();


	const url = `${process.env.REACT_APP_BASE_URL}login`;
	const linkedinUrl = `${process.env.REACT_APP_BASE_URL}auth/linkedin`;

	// console.log("url", url);
	// console.log("linkedinUrl", linkedinUrl);

	// 		const handleCandidateLogin = (event) => {
	// 			event.preventDefault();
	// 			loginCandidate();
	// 		};

	const handleEmployerLogin = (event) => {
		event.preventDefault();
		loginEmployer();
	};


    const handleCandidateLogin = (event) => {
        event.preventDefault();
        loginCandidate();
    }

    // const handleEmployerLogin = (event) => {
    //     event.preventDefault();
    //     loginEmployer();
    // }

    const loginCandidate = async () => {
        if (!canUsername || !password) {
					setIsSubmitting(false);
					return;
				}
        try {
                setIsSubmitting(true);
					const response = await axios.post(
						url,
						{
							username: canUsername,
							password: password,
						},
						{
							headers: {
								"Content-type": "application/json",
							},
						}
					);
					const data = response.data;
			console.log("data", data);
			updateUser(data);
			
					if (response.status === 201) {
						if (role === "1") {
							moveToCandidate();
						}
					}
				} catch (error) {
					setCanUsername("");
					setPassword("");
				} finally {
					setIsSubmitting(false);
				}    

    }
	// const handleEmployerLogin = (event) => {
	//     event.preventDefault();
	//     loginEmployer();
	// }

	// const loginCandidate = async () => {
	// 	if (!canUsername || !password) {
	// 		setIsSubmitting(false);
	// 		return;
	// 	}
	// 	try {
	// 		setIsSubmitting(true);
	// 		const response = await axios.post(
	// 			url,
	// 			{
	// 				username: canUsername,
	// 				password: password,
	// 			},
	// 			{
	// 				headers: {
	// 					"Content-type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		const data = response.data;
	// 		console.log("data", data);


	// 		if (response.status === 201) {
	// 			if (role === "2") {
	// 				moveToEmployer();
	// 			}
	// 		}
	// 	} catch (error) {
	// 		setCanUsername("");
	// 		setPassword("");
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}

		// processLogin(
		//     {
		//         type: formType.LOGIN_CANDIDATE,
		//         username: canUsername,
		//         password: password
		//     },
		//     (valid) => {
		//         if (valid) {
		//             moveToCandidate();
		//         } else {
		//             // show error
		//             console.log('error');
		//         }
		//     }
		// );
	// };

	const loginEmployer = async () => {
		setError("");
		setSuccess("");

		try {
			const response = await axios.post(
				url,
				{
					username: empUsername,
					password: password,
				},
				
			);
			const data = response.data;
			console.log("data", data);
			setSuccess(true);

			if (response.status === 201) {
				if (role === "2") {
					moveToEmployer();
				}
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
			setShowTopMessage(true);

		} finally {
			setIsSubmitting(false);
			setShowTopMessage(true);
			setEmpUsername("");
			setPassword("");
		}
	};

	// processLogin(
	//     {
	//         type: formType.LOGIN_EMPLOYER,
	//         username: empUsername,
	//         password: password
	//     },
	//     (valid) => {
	//         if (valid) {
	//             moveToEmployer();
	//         } else {
	//             // show error
	//             console.log('error');
	//         }
	//     }
	// );

	// const moveToCandidate = () => {
	//     navigate(canRoute(candidate.DASHBOARD));
	// }

	// const moveToEmployer = () => {
	//     navigate(empRoute(employer.DASHBOARD));
	// }

	// processLogin(
	//     {
	//         type: formType.LOGIN_CANDIDATE,
	//         email: canEmail,
	//         password: password
	//     },
	//     (valid) => {
	//         if (valid) {
	//             moveToCandidate();
	//         } else {
	//             // show error
	//             console.log('error');
	//         }
	//     }
	// );

	// const loginEmployer = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			url,
	// 			{
	// 				email: empEmail,
	// 				password: password,
	// 			},
	// 			{
	// 				headers: {
	// 					"Content-type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		const data = response.data;
	// 		console.log("data", data);

	// 		if (response.status === 200) {
	// 			moveToEmployer();
	// 		}
	// 	} catch (error) {
	// 		setEmpEmail("");
	// 		setPassword("");
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// }

	const moveToCandidate = () => {
		navigate(canRoute(candidate.DASHBOARD));
	};

	const moveToEmployer = () => {
		navigate(empRoute(employer.DASHBOARD));
	};

	const loginWithLinkedIn = async () => {
		try {
			const response = await axios.get(linkedinUrl);
			const data = response.data;
			console.log("data", data);

			if (response.status === 201) {
				if (role === "1") {
					moveToCandidate();
				} else {
					moveToEmployer();
				}
			}
		} catch (error) {
		} finally {
			setIsSubmitting(false);
		}
	};

	//   const login = async (user) => {
	// 			setCurrentUser(user);
	// 	  setAuth(true);

	// 			setIsLoggedIn(true);
	// };
	//      const signup = async (user) => {
	// 					setCurrentUser(user);
	// 		 setAuth(true);
	// 		        localStorage.setItem("user", JSON.stringify(user));
	// 					setIsSignUp(true);
	// };

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
		logout,
		isSubmitting,
		handleCandidateLogin,
		handleEmployerLogin,
		loginWithLinkedIn,
		canUsername,
		setCanUsername,
		empUsername,
		setEmpUsername,
		password,
		setPassword,
		role,
		setRole,
		error,
		success,
		showTopMessage,
		
	};

	return (
		<AuthContext.Provider value={details}>{children}</AuthContext.Provider>
	);
};
