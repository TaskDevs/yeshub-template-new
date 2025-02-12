import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
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

// useAuth hook
export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [auth, setAuth] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [email, setEmail] = useState("johndoe@gmail.com");
	const [empUsername, setEmpUsername] = useState("johndoe");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [role, setRole] = useState("user");
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [showTopMessage, setShowTopMessage] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const otpRef = useRef("");
	const [userData, setUserData] = useState({});

	const navigate = useNavigate();
	const { user, updateUser } = useUser();

	const loginError = () => toast("Error!, Failed to login");
	console.log("user", user);
	console.log("userData", userData);

	const linkedinUrl =
		"https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/auth/redirect/linkedin";
	const googleUrl =
		"https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/auth/google/redirect";

	const logoutUrl = `https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/api/v1/logout`;
	const url = `${process.env.REACT_APP_BASE_URL}login`;
	const forgotPasswordUrl = `${process.env.REACT_APP_BASE_URL}forgot-password`;
	const changePasswordUrl = `${process.env.REACT_APP_BASE_URL}change-password`;


	useEffect(() => {
		if (!user?.token) {
			return;
		}
		const fetchUserData = async () => {
			try {
				const res = await axios.get(
					`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/api/user`,
					{
						headers: { Authorization: `Bearer ${user?.token}` },
					}
				);

				console.log(`user-data-context`, res);
				setUserData(res.data);
				// updateUser(res.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserData();
	}, [user?.token, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setIsSubmitting(false);
			return;
		}
		setTimeout(() => {
			setLoading(true);
		}, 200);
		try {
			setIsSubmitting(true);
			console.log("form-login", role, email, password);
			const response = await axios.post(url, {
				identifier: email,
				password,
			});
			const data = response.data;
			console.log("login-data", data);
			updateUser(data);

			toast.success(data?.message);
			if (data?.role === "user") {
				navigate(`/dashboard-candidate/${userData?.id}`);
			}
		} catch (error) {
			console.error(error);
			loginError();
		} finally {
			setEmail("");
			setPassword("");
			setIsSubmitting(false);
			setTimeout(() => {
				setLoading(false);
			}, 5000);
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();

		// if (!user) {
		// 	toast.error("user not found");
		// 	return;
		// }
		if (!password || !confirmPassword) {
			setIsSubmitting(false);
			toast.error("Password does not match");
			return;
		}

		setTimeout(() => {
			setLoading(true);
		}, 200);

		try {
			setIsSubmitting(true);
			const response = await axios.post(changePasswordUrl, {
				email: user?.email,
				otp,
				password,
				confirm_password: "confirmPassword",
			});
			const data = response.data;
			console.log("data", data);
			updateUser(data);
			toast.success("Password updated successfully");
		} catch (error) {
			setEmail("");
			setPassword("");
			toast.error("Failed to update password, please try again");
		} finally {
			setIsSubmitting(false);
			setTimeout(() => {
				setLoading(false);
			}, 5000);
		}
	};

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		if (!email) {
			setIsSubmitting(false);
			toast.error("Please enter your email address");
			return;
		}
		setTimeout(() => {
			setLoading(true);
		}, 200);
		try {
			setIsSubmitting(true);
			const response = await axios.post(forgotPasswordUrl, {
				email: user?.email,
			});
			const data = response.data;
			console.log("data", data);
			updateUser(data);
			toast.success("Check your email to verify Otp");
		} catch (error) {
			setEmail("");
			setPassword("");
			toast.error("Failed to send Otp, please try again");
		} finally {
			setIsSubmitting(false);
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
		if (!navigator.onLine) {
			toast.error("No internet connection");
			return;
		}

		setTimeout(() => {
			setLoading(true);
		}, 200);
		try {
			window.location.href = linkedinUrl;
		} catch (error) {
			setError(error || "");
			toast.error("Failed to initiate Linkedin login");
		} finally {
			setIsSubmitting(false);
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		}
	};

	const loginWithGoogle = async () => {
		if (!navigator.onLine) {
			toast.error("No internet connection");
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const redirectUrl = process.env.REACT_APP_GOOGLE_OAUTH_URL;
			window.location.href = redirectUrl;
		} catch (error) {
			console.error("Google Login Error:", error);
			toast.error("Failed to initiate Google login");
			setError(error.message || "Login failed");
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setLoading(false), 5000);
		}
	};

	const handleLogout = async () => {
		try {
			await axios.post(
				"https://your-api-url.com/api/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			// Clear authentication state
			// setToken(null);
			// setUser(null);
			// localStorage.removeItem("token");

			// Redirect to login
			navigate("/login");
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	// 	const logout = async () => {

	// 		if (!user?.token) {
	// 			console.error("No token found. User is not logged in.");
	// 			toast.error("No token found.");
	// 			return;
	// 		}

	// 		// setTimeout(() => {
	// 		// 	setLoading(false);
	// 		// }, 200);
	// try {
	// 				console.log("token-logot", user?.token);
	// 			const res = await axios.post(
	// 				"https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/api/v1/logout",
	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${user.token}`,
	// 					},
	// 				}
	// 			);
	// 			console.log("logout", res)
	// 			// updateUser(null);
	// 			// toast.success("user logged out successfully")
	// 			// navigate("/after-login")

	// 		} catch (error) {
	// 			setError( error.message || "Failed to logout")
	// 			toast.error("Failed to logout")
	// 			console.error(error)
	// 		} finally {
	// 			// setCurrentUser(null);
	// 			// setAuth(false);
	// 			// setTimeout(() => {
	// 			// 	setLoading(false);
	// 			// }, 4000);

	// 		}
	// 	};

	const details = {
		auth,
		setAuth,
		currentUser,
		errorMessage,
		setErrorMessage,
		handleLogout,
		isSubmitting,
		setIsSubmitting,
		setLoading,
		userData,
		loginWithLinkedIn,
		loginWithGoogle,
		email,
		setEmail,
		otp,
		setOtp,
		password,
		setPassword,
		confirmPassword,
		setConfirmPassword,
		role,
		otpRef,
		setRole,
		error,
		success,
		showTopMessage,
		isLoading,
		isVisible,
		setIsVisible,
		handleSubmit,
		moveToCandidate,
		moveToEmployer,
		handleResetPassword,
		handleForgotPassword,
	};

	return (
		<AuthContext.Provider value={details}>{children}</AuthContext.Provider>
	);
};
