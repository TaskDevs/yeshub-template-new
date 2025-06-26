import React, { useState, useContext } from "react";
import { IoMdMail } from "react-icons/io";
import { FaLock, FaUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { login, register } from "../../../../context/auth/authApi";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import cookieMethods from "../../../../../utils/cookieUtils";
import { base } from "../../../../../globals/route-names";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";

const NewAuthForm = ({ currentState }) => {
  const { processGetClientProjects } = useContext(EmployerApiData);
  const { processGetFreelanceProjects } = useContext(FreelanceApiData);
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
            cookieMethods.setCookies(token, refresh_token);

            // ✅ Show success message
            toast.success(response.message, {
              position: "top-right",
              autoClose: 3000,
            });

            setTimeout(() => {
              switch (role) {
                case "admin":
                  window.location.href = "/admin";

                  break;
                case "client":
                  processGetClientProjects();
                  window.location.href = "/dashboard-client";
                  break;
                case "freelancer":
                default:
                  processGetFreelanceProjects();
                  window.location.href = base.CANDIDATE_PRE;
                  break;
              }
            }, 1000);
          } else {
            // 👇 Fix starts here
            const errorResponse = response;
            let errorMessage = "Login failed.";

            if (errorResponse?.errors) {
              const firstKey = Object.keys(errorResponse.errors)[0];
              errorMessage = errorResponse.errors[firstKey][0];
            } else if (errorResponse?.message) {
              errorMessage = errorResponse.message;
            }

            newErrors.general = errorMessage;

            toast.error(errorMessage, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        } catch (err) {
          console.error("Login error:", err);

          const errorResponse = err?.response?.data;
          let errorMessage = "Login failed.";

          if (errorResponse?.errors) {
            const firstKey = Object.keys(errorResponse.errors)[0];
            errorMessage = errorResponse.errors[firstKey][0];
          } else if (errorResponse?.message) {
            errorMessage = errorResponse.message;
          }

          newErrors.general = errorMessage;

          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
          });
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
        { token: credentialResponse.credential }
      );

      const { token, refresh_token, user, role } = res.data;
      if (!user?.id || !role) {
        throw new Error("Missing user ID or role in response");
      }

      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("userRole", role);
      cookieMethods.setCookies(token, refresh_token);

      if (role === "user") {
        setTimeout(() => {
          window.location.href = `/dashboard/onboard?user=${user.id}`;
        }, 200);
      } else if (role === "client") {
        window.location.href = "/dashboard-client";
      } else {
        window.location.href = base.CANDIDATE_PRE;
      }
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In Error");
  };

  const loginWithLinkedIn = async () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_HOST}/auth/redirect/linkedin`;
  };

  return (
    <div className="bg-white rounded-lg px-8 pt-2 pb-4 mb-2 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {currentState === "signIn" ? (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoMdMail className="h-5 w-5 text-green-700" />
              </div>
              <input
                className="w-full  pl-10 pr-3 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                <FaLock className="h-5 w-5 text-green-700" />
              </div>
              <input
                className="w-full  pl-10 pr-3 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                <FaUser className="h-5 w-5 text-green-700" />
              </div>
              <input
                className="w-full pl-10 pr-3 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                <IoMdMail className="h-5 w-5 text-green-700" />
              </div>
              <input
                className="w-full pl-10 pr-3 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                <FaLock className="h-5 w-5 text-green-700" />
              </div>
              <input
                className="w-full  pl-10 pr-3 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  <AiOutlineEye className="h-5 w-5 text-green-700" />
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
                <FaLock className="h-5 w-5 text-green-700" />
              </div>
              <input
                className="w-full  pl-10 pr-3 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                id="password_confirmation"
                type={showPassword ? "text" : "password"}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="Repeat Password"
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
          <NavLink
            to="/forgotton-password"
            className="border-0 bg-none focus:outline-none text-green-800 hover:text-green-700 text-sm"
          >
            Forgot Password
          </NavLink>
        </div>
        {loading ? (
          <button
            className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            disabled
          >
            Please wait...
            <CircularProgress size="20px" color="white" />
          </button>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            type="submit"
          >
            {currentState === "signIn" ? "Sign In" : "Sign Up"} <FaArrowRight className="text-sm" />
          </button>
        )}

        <div className="relative my-4">
          <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-gray-500 text-sm whitespace-nowrap">
            or continue with
          </span>

          <div className="border-t border-gray-300" />
        </div>
      </form>

      <div className="mt-5">
        <div className="">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-64 h-12 bg-red-500 mb-2 text-white rounded hover:bg-red-600 flex items-center justify-center"
                >
                  Continue with Google
                </button>
              )}
            />
          )}

          <button
            onClick={loginWithLinkedIn}
            className="mt-3 relative flex items-center justify-center w-full h-12 px-6 bg-[#0A66C2] text-white font-medium rounded-lg shadow hover:bg-[#004182] transition duration-200"
          >
            <span className="absolute left-4">
              <FaLinkedin size={20} />
            </span>
            <span className="text-center w-full">Sign in with LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAuthForm;
