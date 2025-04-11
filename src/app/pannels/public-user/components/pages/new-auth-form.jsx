import React, { useState, useContext } from "react";
import { IoMdMail } from "react-icons/io";
import { FaLock, FaUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FaLinkedin } from "react-icons/fa";
// import { LinkedIn } from "react-linkedin-login-oauth2";
import { login, register } from "../../../../context/auth/authApi";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import cookieMethods from "../../../../../utils/cookieUtils";
import { base } from "../../../../../globals/route-names";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthApiData } from "../../../../context/auth/authContextApi";

const NewAuthForm = ({ currentState }) => {
  const { setAuthInfo } = useContext(AuthApiData);
  const [formData, setFormData] = useState({
    identifier: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    let isValid = true;
    const newErrors = {};

    if (currentState === "signIn") {
      // Sign In Validation
      if (!formData.identifier) {
        newErrors.identifier = "Username or email is required.";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required.";
        isValid = false;
      }

      if (isValid) {
        const data = {
          identifier: formData.identifier,
          password: formData.password,
        };

        try {
          const response = await login(data); // Assume login is an async function
          if (
            response.success &&
            response.data.token &&
            response.data.refresh_token
          ) {
            console.log("Sign In Data:", response.data);
            const { token, refresh_token, role, user_id } = response.data;
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userRole", role);
            sessionStorage.setItem("userId", user_id);
            setAuthInfo({ userId: user_id });
            cookieMethods.setCookies(token, refresh_token);
            // ✅ Show success message
            toast.success(response.message, {
              position: "top-right",
              autoClose: 3000,
            });
            // await processRetrieve();

            setTimeout(() => {
              switch (role) {
                case "admin":
                  navigate("/admin");
                  break;
                case "client":
                  navigate("/profile");
                  break;
                case "freelancer":
                default:
                  navigate(base.CANDIDATE_PRE);
                  break;
              }
            }, 1000);
          }
        } catch (err) {
          console.error("Login error:", err);
          newErrors.general = err?.response?.data?.message || "Login failed.";
        }
      }
    } else {
      // Sign Up Validation
      if (!formData.username) {
        newErrors.username = "Username is required.";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email is required.";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format.";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required.";
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
        isValid = false;
      }
      if (!formData.password_confirmation) {
        newErrors.password_confirmation = "Confirm password is required.";
        isValid = false;
      } else if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "Passwords do not match.";
        isValid = false;
      }

      if (isValid) {
        const registerData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        };

        try {
          const res = await register(registerData); // Assume register is an async function

          if (res.success) {
            setTimeout(() => {
              navigate("/verify-otp", { state: { email: formData.email } });
              window.location.reload();
            }, 1000);

            toast.success(res.message, {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            const errorMessages = Object.values(res.errors || {})
              .flat()
              .join("\n");
            toast.error(errorMessages, {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } catch (err) {
          console.error("Registration error:", err);
          newErrors.general =
            err?.response?.data?.message || "Registration failed.";
        }
      }
    }

    setErrors(newErrors);
    setLoading(false);
  };
  // google log n
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/google`,
        {
          token: credentialResponse.credential,
        }
      );

      const { token, refresh_token, user, role } = res.data;
      console.log(res.data);
      sessionStorage.setItem("authToken", token);

      cookieMethods.setCookies(token, refresh_token);
      sessionStorage.setItem("username", user?.username);
      sessionStorage.setItem("userId", user?.id);
      console.log(role);
      // Check if role exists
      setTimeout(() => {
        switch (role) {
          case "user":
            navigate(`/dashboard/onboard?user=${user.id}`);
            break;
          case "client":
            navigate("/profile");
            break;
          case "freelancer":
          default:
            navigate(base.CANDIDATE_PRE);
            break;
        }
      }, 1000);
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleError = () => {
    console.error("Google Sign-In Error");
  };

  // Linked in Login

  // const handleLinkedInSuccess = async (response) => {
  //   console.log("LinkedIn Login Success:", response);

  //   setLoading(true);
  //   try {
  //     // Send the LinkedIn token to your Laravel backend for verification
  //     const res = await axios.post(
  //       "http://127.0.0.1:8000/api/v1/auth/linkedin",
  //       {
  //         token: response.code, // The token is in 'code', not 'access_token'
  //       }
  //     );

  //     const { token, refresh_token, user } = res.data;
  //     console.log("User from LinkedIn:", user);

  //     // Store the access token and refresh token
  //     localStorage.setItem("access_token", token);
  //     localStorage.setItem("refresh_token", refresh_token);

  //     // Redirect based on user role
  //     if (user.role === "user") {
  //       setTimeout(() => navigate(`/dashboard/onboard?user=${user.id}`), 2000);
  //     } else {
  //       setTimeout(() => navigate("/dashboard"), 2000);
  //     }
  //   } catch (err) {
  //     console.error("LinkedIn login failed:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleFailure = (error) => {
  //   console.error("LinkedIn login error:", error);
  // };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {currentState === "signIn" ? (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoMdMail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="identifier"
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                placeholder="Email address"
              />
            </div>
            {errors.identifier && (
              <p className="text-red-500 text-xs italic">{errors.identifier}</p>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </>
        ) : (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoMdMail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="Cpassword_confirmation"
              />
            </div>
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs italic">
                {errors.password_confirmation}
              </p>
            )}
          </>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-700 text-sm">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="border-0 bg-none focus:outline-none text-green-800 hover:text-green-700 text-sm"
          >
            Forgot Password
          </button>
        </div>
        {loading ? (
          <button
            className="w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled
          >
            Please wait...
            <CircularProgress size="20px" color="white" />
          </button>
        ) : (
          <button
            className="w-full bg-green-800 hover:bg-[#140b31] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {currentState === "signIn" ? "Sign In" : "Sign Up"}
          </button>
        )}

        <div className="relative my-4">
          <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-gray-500 text-sm whitespace-nowrap">
            Or continue with
          </span>

          <div className="border-t border-gray-300" />
        </div>
      </form>

      <div className="mt-5">
        <div className="flex justify-between">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          )}
          {/* <button className="flex border border-gray-300 p-1 shadow-sm w-full rounded justify-center items-center">
            <span>
              <FaGoogle color="#4285F4" />
            </span>
            Google
          </button> */}

          {/* <LinkedIn
              clientId="78cj9ms7zti6zz"
              redirectUri="http://localhost:3000/linkedin"
              onSuccess={handleLinkedInSuccess}
              onError={handleFailure}
              scope="r_liteprofile"
            >
              {({ linkedInLogin }) => (
                <button 
                onClick={linkedInLogin}
                className="flex border border-gray-300 p-1 shadow-sm w-full rounded justify-center items-center">
                  <span>
                    <FaLinkedin color="#4285F4" />
                  </span>
                  Linkedin
                </button>
              )}
            </LinkedIn> */}
        </div>
      </div>
    </div>
  );
};

export default NewAuthForm;
