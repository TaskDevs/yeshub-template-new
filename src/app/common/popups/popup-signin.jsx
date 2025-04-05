import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import Loader from "../loader";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { SIGNINFIELD } from "../../../globals/sign-in-data";
import { login} from "../../context/auth/authApi";
import cookieMethods from "../../../utils/cookieUtils";
import toast from 'react-hot-toast';
import { base } from "../../../globals/route-names";
import { AuthApiData } from "../../context/auth/authContextApi";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { LinkedIn } from "react-linkedin-login-oauth2";

function SignInPopup() {
  const {
    isLoading,
    isSubmitting,
    setIsSubmitting,
  } = useContext(GlobalApiData);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const { processRetrieve } = useContext(AuthApiData)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    return (
      savedUser ||
      SIGNINFIELD.fieldDetail.reduce(
        (acc, field) => {
          acc[field.name] = "";
          return acc;
        },
        { rememberMe: false }
      )
    );
  });

  const [isVisible, setIsVisible] = useState(false);
  const [serverResponse] = useState(null); 

  useEffect(() => {
    if (!formData.role) {
      setFormData((prev) => ({ ...prev, role: "user" }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

    
  const handleLinkedInSuccess = async (response) => {
    console.log("LinkedIn Login Success:", response);

    setLoading(true);
    try {
      // Send the LinkedIn token to your Laravel backend for verification
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/linkedin",
        {
          token: response.code, // The token is in 'code', not 'access_token'
        }
      );

      const { token, refresh_token, user } = res.data;
      console.log("User from LinkedIn:", user);

      // Store the access token and refresh token
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", refresh_token);

      // Redirect based on user role
      if (user.role === "user") {
        setTimeout(() => navigate(`/dashboard/onboard?user=${user.id}`), 2000);
      } else {
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      console.error("LinkedIn login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (error) => {
    console.error("LinkedIn login error:", error);
  };

  // Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/google`,
        {
          token: credentialResponse.credential,
        }
      );

      const { token, refresh_token, user } = res.data;
      console.log(res.data);
      sessionStorage.setItem("authToken", token);

      cookieMethods.setCookies(token, refresh_token);
      sessionStorage.setItem("username", user?.username);
      sessionStorage.setItem("userId", user?.user_id);
      const role = user.role;

      // Check if role exists
      setTimeout(() => {
        switch (role) {
          case "user":
            navigate(`/dashboard/onboard?user=${user.id}`);
            break;
          case "client":
            navigate(base.EMPLOYER_PRE);
            break;
          case "freelancer":
          default:
            navigate(base.CANDIDATE_PRE);
            break;
        }
      },1000);
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleError = () => {
    console.error("Google Sign-In Error");
  };
    

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
  
    try {
      const response = await login(formData);
      
      if (response.success && response.data.token && response.data.refresh_token) {
        const { token, refresh_token, role, user_id } = response.data;
  
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userRole", role);
        sessionStorage.setItem("userId", user_id);
        cookieMethods.setCookies(token, refresh_token);
  
        if (formData.rememberMe) {
          sessionStorage.setItem("rememberedUser", JSON.stringify(formData));
        } else {
          sessionStorage.removeItem("rememberedUser");
        }
  
        // ✅ Show success message
        toast.success(response.message, { position: "top-right", autoClose: 3000 });
        // await processRetrieve();
      

        setTimeout(() => {
          switch (role) {
            case "admin":
              navigate("/admin");
              break;
            case "client":
              navigate(base.EMPLOYER_PRE);
              break;
            case "freelancer":
            default:
              navigate(base.CANDIDATE_PRE);
              break;
          }
        }, 2000);
      } else {
        // ✅ Extract validation errors
        const errorMessages = Object.values(response.errors || {}).flat().join("\n");
        toast.error(errorMessages || response.message || "Error logging in: check credentials", {
          position: "top-left",
          autoClose: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        });
        
        setMessage({
          type: "error",
          text: errorMessages || response.message || "Error logging in: check credentials",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
  
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      {/* Server Response Message */}
      {serverResponse && (
        <div className={`alert ${serverResponse.type === "success" ? "alert-success" : "alert-danger"} text-center`} role="alert">
          {serverResponse.message}
        </div>
      )}

      {!isLoading && (
        <div
          className="modal fade twm-sign-up"
          id="sign_up_popup2"
          aria-hidden="true"
          aria-labelledby="sign_up_popupLabel"
          tabIndex={-1}
          data-bs-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="sign_up_popupLabel2">
                  Login
                </h2>
                <p>Login and get access to all the features of YesHub</p>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                <div className="twm-tabs-style-2">
                  <div className="tab-content">
                    <form onSubmit={handleLogin} className="tab-pane fade show active">
                      <div className="row">
                    
                    {message.text && (
                    <div
                      className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} fade show`}
                      role="alert"
                    >
                      {message.text}
                    </div>
                  )}
                        {SIGNINFIELD?.fieldDetail?.map((field) => (
                          <div className="col-lg-12" key={field.name}>
                            <div className="form-group mb-3">
                              {field.type === "password" ? (
                                <div className="ls-inputicon-box-signup ls-inputicon-box">
                                  <input
                                    name={field.name}
                                    type={isVisible ? "text" : "password"}
                                    required
                                    className="form-control"
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ""}
                                    onChange={handleInputChange}
                                    minLength={8}
                                    maxLength={20}
                                  />
                                  <div
                                    className="eye-icon"
                                    onClick={() => setIsVisible((prev) => !prev)}
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {isVisible ? <IoMdEye size={20} /> : <IoIosEyeOff size={20} />}
                                  </div>
                                </div>
                              ) : (
                                <input
                                  name={field.name}
                                  type={field.type}
                                  required
                                  className="form-control"
                                  placeholder={field.placeholder}
                                  value={formData[field.name] || ""}
                                  onChange={handleInputChange}
                                />
                              )}
                            </div>
                          </div>
                        ))}

                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label rem-forgot" htmlFor="rememberMe">
                                Remember me <a href="/forgotton-password">Forgot Password?</a>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="site-button"
                            data-bs-dismiss="modal"
                            disabled={isSubmitting}
                          >
                            Log in
                          </button>
                        </div>
                        <div className="mt-3 mb-3">
                          Don&apos;t have an account?
                          <button
                            className="twm-backto-login"
                            data-bs-target="#sign_up_popup"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
             
                <span className="modal-f-title">Login or Sign up with</span>
                <ul className="twm-modal-social flex justify-between gap-4">
                  <li className="flex-1">
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                      />
                    )}
                  </li>
                  <li className="flex-1">
                    <LinkedIn
                      clientId="78cj9ms7zti6zz"
                      redirectUri="http://localhost:3000/linkedin"
                      onSuccess={handleLinkedInSuccess}
                      onError={handleFailure}
                      scope="r_liteprofile"
                    >
                      {({ linkedInLogin }) => (
                        <button
                          onClick={linkedInLogin}
                          className="flex items-center justify-center gap-2 w-full text-white border-0 py-2 mx-2 hover:bg-[#0a14c9] focus:outline-none focus:ring-2 focus:ring-[#1017ea] rounded-md"
                          style={{
                            backgroundColor: "blue",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                        >
                          <i className="fab fa-linkedin-in text-lg" />
                          Login with LinkedIn
                        </button>
                      )}
                    </LinkedIn>
                  </li>
                </ul>

               
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInPopup;
