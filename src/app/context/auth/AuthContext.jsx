import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
	candidate,
	canRoute,
	employer,
	empRoute,
} from "../../../globals/route-names";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";

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
	const [success, setSuccess] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [showTopMessage, setShowTopMessage] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { user, updateUser } = useUser();

	const loginSuccess = () => toast("User successfully logged in!");
	const loginError = () => toast("Error!, Failed to login");
	const roleError = () => toast("Error!, you must be an employer to login");

	const url = `${process.env.REACT_APP_BASE_URL}login`;
	const linkedinUrl = `${process.env.REACT_APP_BASE_URL}auth/linkedin`;
	const logoutUrl = `${process.env.REACT_APP_BASE_URL}logout/{user.id}`

	// console.log("url", url);
	// console.log("linkedinUrl", linkedinUrl);

	// 		const handleCandidateLogin = (event) => {
	// 			event.preventDefault();
	// 			loginCandidate();
	// 		};

	useEffect(() => {
			console.log("role-1", role)
		})

	const handleEmployerLogin = (event) => {
		event.preventDefault();
		loginEmployer();
	};

	const handleCandidateLogin = (event) => {
		event.preventDefault();
		loginCandidate();
	};

	// const handleEmployerLogin = (event) => {
	//     event.preventDefault();
	//     loginEmployer();
	// }

	const loginCandidate = async () => {
		if (!canUsername || !password) {
			setIsSubmitting(false);
			return;
		}
		setTimeout(() => {
			setLoading(true);
		}, 200);
		try {
			setIsSubmitting(true);
			const response = await axios.post(url, {
				username: canUsername,
				password: password,
			});
			const data = response.data;
			console.log("data", data);
			updateUser(data);

			if (response.status === 201) {
				loginSuccess();
				
				if (role === "1") {
					moveToCandidate();
				}
			}
		} catch (error) {
			
			setCanUsername("");
			setPassword("");
			loginError();
		} finally {
			setIsSubmitting(false);
		}
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	};
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

	// 		if (response.status === 200) {
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
		console.log("role-authCtx", role)
		console.log("ctx-emp", role === "2");

		// if (role !== "2") {
		//    roleError();
		// 	return;
		// }

		setError("");
		setSuccess("");
		
		setTimeout(() => {
			setLoading(true);
		}, 200);


		try {
			const response = await axios.post(url, {
				username: empUsername,
				password: password,
				
			});
			const data = response.data;
			console.log("data", data);
			setSuccess("user logged in successfully");
			loginSuccess();

			if (response.status === 201) {
				if (role === "2") {
					moveToEmployer();
				}
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
			setShowTopMessage(true);
			loginError();
		} finally {
			setIsSubmitting(false);
			setShowTopMessage(true);
			setEmpUsername("");
			setPassword("");
			setTimeout(() => {
				setLoading(false);
			}, 5000);
		}
	};


	const moveToCandidate = () => {
		navigate(canRoute(candidate.DASHBOARD));
	};

	const moveToEmployer = () => {
		navigate(empRoute(employer.DASHBOARD));
	};

	const loginWithLinkedIn = async () => {
		setTimeout(() => {
			setLoading(true);
		}, 200);
		try {
			const response = await axios.get(linkedinUrl);
			const data = response.data;
			console.log("data", data);
			loginSuccess();

			if (response.status === 200) {
				// setTimeout(() => {
				// 	setLoading(true);
				// }, 2000);
				if (role === "1") {
					moveToCandidate();
				} else {
					moveToEmployer();
				}
			}
		} catch (error) {
			// setTimeout(() => {
			// 	setLoading(true);
			// }, 2000);
			setError(error || "");
			loginError();
		} finally {
			setIsSubmitting(false);
			setTimeout(() => {
				setLoading(false);
			}, 5000);
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

	const logout = async () => {
        
		try {
			const res = await axios.delete(logoutUrl)
			console.log("logout", res)

		} catch (error) {
			setError( error.message || "Failed to logout")
		} finally {
			setCurrentUser(null);
			setAuth(false);
			updateUser(null);

		}
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
		isLoading,
		isVisible,
		setIsVisible
	};

	return (
		<AuthContext.Provider value={details}>{children}</AuthContext.Provider>
	);
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

	// const loginEmployer = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			url,
	// 			{
	// 				username: empUsername,
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
	// 		setEmpUsername("");
	// 		setPassword("");
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// }