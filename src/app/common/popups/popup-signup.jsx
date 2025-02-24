import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Loader from "../loader";
import { register, loginWithGoogle, loginWithLinkedIn} from "../../context/auth/authApi";

import { GlobalApiData } from "../../context/global/globalContextApi";
import { SIGNUPFIELD } from "../../../globals/sign-up-data";
import InputField from "../input-field";
import PasswordField from "../password-field";
import toast from 'react-hot-toast';
function SignUpPopup() {
  const {
    isLoading,
    isSubmitting,
    setIsSubmitting,
  } = useContext(GlobalApiData);

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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const googleSignin = async ()=>{
    await loginWithGoogle(formData.role)
    
  }

    const linkedinSignin = async ()=>{
      await loginWithLinkedIn(formData.role)
      
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    setIsSubmitting(true); // Set submitting state to true

    try {
      const res = await register(formData);

      if (res) {
       
        toast.success(res.message, { position: "top-right", autoClose: 3000 });
       
        // Reset form data after successful submission
        setFormData(
          SIGNUPFIELD.fieldDetail.reduce((acc, field) => {
            acc[field.name] = ""; // Reset all fields to an empty string
            return acc;
          }, {})
        );

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
   

      setMessage({
        type: "error",
        text: "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state after request completes
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
                    {message && (
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
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      {/* Signup Candidate */}
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            formData.role === "user" ? "active" : ""
                          }`}
                          data-bs-toggle="tab"
                          type="button"
                          aria-selected={formData.role === "user"}
                          onClick={() =>
                            handleChange({
                              target: { name: "role", value: "user" },
                            })
                          }
                        >
                          <i className="fas fa-user-tie" /> Candidate
                        </button>
                      </li>
                      {/* Signup Employer */}
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            formData.role === "employer" ? "active" : ""
                          }`}
                          data-bs-toggle="tab"
                          type="button"
                          aria-selected={formData.role === "employer"}
                          onClick={() =>
                            handleChange({
                              target: { name: "role", value: "employer" },
                            })
                          }
                        >
                          <i className="fas fa-building" /> Employer
                        </button>
                      </li>
                    </ul>

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
                </div>
              </form>

              <div className="modal-footer">
                <span className="modal-f-title">Login or Sign up with</span>
                <ul className="twm-modal-social">
                  <li>
                      <a onClick={googleSignin} className="google-clr m-2">
                        <i className="fab fa-google" />
                      </a>
                    </li>
                    <li>
                      <a onClick={linkedinSignin} className="linkedin-clr m-2">
                        <i className="fab fa-linkedin-in" />
                      </a>
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

export default SignUpPopup;
