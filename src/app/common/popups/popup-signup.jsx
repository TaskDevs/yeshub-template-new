import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../loader";
import { register } from "../../context/auth/authApi";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { SIGNUPFIELD } from "../../../globals/sign-up-data";
import InputField from "../input-field";
import PasswordField from "../password-field";
import toast from "react-hot-toast";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { base } from "../../../globals/route-names";
import cookieMethods from "../../../utils/cookieUtils";

function SignUpPopup() {
  const [loading, setLoading] = useState(false);
  const { isLoading, isSubmitting, setIsSubmitting } =
    useContext(GlobalApiData);

  const [message, setMessage] = useState(null); // State for success/error message
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    SIGNUPFIELD.fieldDetail.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!formData.role) {
      setFormData((prev) => ({ ...prev, role: "user" }));
    }
  }, []);

  const handleInputChange = (data, field) => {
    if (data?.target) {
      // Handles standard input fields
      const { name, value } = data.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (field?.name) {
      // Handles custom components like PasswordField
      setFormData((prev) => ({ ...prev, [field.name]: data }));
    }
  };

  // linkedin login

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

  // Normal signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await register(formData);

      if (res.success) {
        toast.success(res.message, { position: "top-right", autoClose: 3000 });

        setFormData(
          SIGNUPFIELD.fieldDetail.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
          }, {})
        );

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
          window.location.reload();
        }, 2000);
      } else {
        console.log("Validation Errors:", res.errors);

        // Extract and format validation messages
        const errorMessages = Object.values(res.errors || {})
          .flat()
          .join("\n");

        setMessage({
          type: "error",
          text:
            errorMessages ||
            res.message ||
            "Registration failed. Please try again.",
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);

      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div
          className="modal fade twm-sign-up"
          id="sign_up_popup"
          aria-hidden="true"
          aria-labelledby="sign_up_popupLabel"
          tabIndex={-1}
          data-bs-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h2 className="modal-title" id="sign_up_popupLabel">
                    Sign Up
                  </h2>
                  <p>Sign Up and get access to all the features of YesHub</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <div className="twm-tabs-style-2">
                    {message && message.text && (
                      <div
                        className={`alert ${
                          message.type === "success"
                            ? "alert-success"
                            : "alert-danger"
                        }`}
                        role="alert"
                      >
                        {message.text}
                      </div>
                    )}

                    {SIGNUPFIELD.fieldDetail.map((field, index) =>
                      field.name !== "role" ? ( // Exclude role from the mapped fields
                        <div className="col-lg-12" key={index}>
                          {field.type === "password" ? (
                            <div className="form-group mb-3">
                              <div className="ls-inputicon-box-signup ls-inputicon-box">
                                <PasswordField
                                  field={field}
                                  value={formData[field.name] || ""}
                                  change={(value) =>
                                    handleInputChange(value, field)
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            <InputField
                              field={field}
                              value={formData[field.name] || ""}
                              change={(e) => handleInputChange(e, field)}
                            />
                          )}
                        </div>
                      ) : null
                    )}

                    {/* Terms and Conditions Checkbox */}
                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="agree2"
                          />
                          <label className="form-check-label" htmlFor="agree2">
                            I agree to the <a href="#">Terms and conditions</a>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="site-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Sign Up"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 mb-3">
                    Already have an account?
                    <button
                      className="twm-backto-login"
                      data-bs-target="#sign_up_popup2"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>

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

                {/* Testing */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpPopup;
