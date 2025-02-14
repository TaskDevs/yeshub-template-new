import { useNavigate } from "react-router-dom";
import JobZImage from "../jobz-img";
import { useContext, useEffect, useState } from "react";
import {
  candidate,
  canRoute,
  employer,
  empRoute,
} from "../../../globals/route-names";
import Loader from "../loader";
import { topMessage } from "../../../utils/responseUtils";

import { FcGoogle } from "react-icons/fc";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { SIGNUPFIELD } from "../../../globals/sign-up-data";
import InputField from "../input-field";
import PasswordField from "../password-field";

function SignUpPopup() {
  const {
    isLoading,
    setIsLoading,
    roleOption,
    setRoleOption,
    isVisible,
    setIsVisible,
    isSubmitting,
    setIsSubmitting,
  } = useContext(GlobalApiData);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleInputChange = (data, field) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // const { handleAuthError, loginWithLinkedIn } = useAuth();

  const moveToCandidate = () => {
    navigate(canRoute(candidate.DASHBOARD));
  };

  const moveToEmployer = () => {
    navigate(empRoute(employer.DASHBOARD));
  };

  return (
    <>
      {isLoading && <Loader />}
      {/* {console.log("showTopMessage", showTopMessage)}
			{showTopMessage === true && isLoading && (
			<topMessage />
			)} */}

      {!isLoading && (
        <div
          className="modal fade twm-sign-up"
          id="sign_up_popup"
          aria-hidden="true"
          aria-labelledby="sign_up_popupLabel"
          tabIndex={-1}
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
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      {/*Signup Candidate*/}
                      <li className="nav-item" role="presentation">
                        <button
                          // className="nav-link active"
                          className={`nav-link ${
                            formData.role === "1" ? "active" : ""
                          }`}
                          data-bs-toggle="tab"
                          // data-bs-target="#sign-candidate"
                          type="button"
                          onClick={() =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              role: "1",
                            }))
                          }
                        >
                          <i className="fas fa-user-tie" />
                          Candidate
                        </button>
                      </li>
                      {/*Signup Employer*/}
                      <li className="nav-item" role="presentation">
                        <button
                          // className="nav-link"
                          className={`nav-link ${
                            formData.role === "2" ? "active" : ""
                          }`}
                          data-bs-toggle="tab"
                          // data-bs-target="#sign-Employer"
                          type="button"
                          onClick={() =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              role: "2",
                            }))
                          }
                        >
                          <i className="fas fa-building" />
                          Employer
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                      {/*Signup Candidate Content*/}
                      <div
                        className="tab-pane fade show active"
                        // id="sign-candidate"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <InputField
                              field={SIGNUPFIELD.fieldDetail[0]}
                              value={formData}
                              change={(data, field) => {
                                handleInputChange(data, field);
                              }}
                            />
                          </div>
                          <div className="col-lg-12">
                            <InputField
                              field={SIGNUPFIELD.fieldDetail[1]}
                              value={formData}
                              change={(data, field) => {
                                handleInputChange(data, field);
                              }}
                            />
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <div className="ls-inputicon-box-signup ls-inputicon-box">
                                <PasswordField
                                  field={SIGNUPFIELD.fieldDetail[2]}
                                  value={formData}
                                  change={(data, field) => {
                                    handleInputChange(data, field);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <div className="ls-inputicon-box-signup ls-inputicon-box">
                                <PasswordField
                                  field={SIGNUPFIELD.fieldDetail[3]}
                                  value={formData}
                                  change={(data, field) => {
                                    handleInputChange(data, field);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <div className=" form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="agree2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="agree2"
                                >
                                  I agree to the{" "}
                                  <a href="#">Terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="site-button"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Sign Up"}
                            </button>
                          </div>

                          <div className="mt-4">
                            <p>
                              Already registered?
                              <button
                                className="twm-backto-login"
                                data-bs-target="#sign_up_popup2"
                                data-bs-toggle="modal"
                                data-bs-dismiss="modal"
                              >
                                Log in here
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="modal-footer">
                <span className="modal-f-title">Login or Sign up with</span>
                <ul className="twm-modal-social">
                  {/* <li><a href="https://www.facebook.com/" className="facebook-clr"><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href="https://www.twitter.com/" className="twitter-clr"><i className="fab fa-twitter" /></a></li>
                                    <li><a href="https://in.linkedin.com/" className="linkedin-clr"><i className="fab fa-linkedin-in" /></a></li>
                                    <li><a href="https://www.google.com/" className="google-clr"><i className="fab fa-google" /></a></li>
                                 */}
                  <div
                    className="col-md-12"
                    onClick={() => {
                      console.log("Login with LinkedIn");
                    }}
                  >
                    <div className="form-group">
                      <button
                        type="submit"
                        className="log_with_google flex-center log_with_linkedin"
                      >
                        <div className="pop-up-btn-logo">
                          <JobZImage src="images/linkedin-logo-1a.png" alt="" />
                        </div>
                        Continue with LinkedIn
                      </button>
                    </div>
                  </div>

                  <div
                    className="col-md-12"
                    onClick={() => {
                      console.log("Login with gmail");
                    }}
                  >
                    <div className="form-group">
                      <button
                        type="submit"
                        className="log_with_google flex-center btn-google"
                      >
                        <div className="pop-up-btn-logo">
                          {/* <JobZImage src="images/linkedin-logo-1a.png" alt="" /> */}
                          <FcGoogle size={20} />
                        </div>
                        {/* <i className="fab fa-google" /> */}
                        Continue with Google
                      </button>
                    </div>
                  </div>
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

/*Signup Employer Content*/

/* <div className="tab-pane fade" id="sign-Employer">
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="username"
																type="text"
																required
																className="form-control"
																placeholder="Usearname*"
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="email"
																type="text"
																className="form-control"
																required
																placeholder="Password*"
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="phone"
																type="text"
																className="form-control"
																required
																placeholder="Email*"
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="phone"
																type="text"
																className="form-control"
																required
																placeholder="Phone*"
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<div className=" form-check">
																<input
																	type="checkbox"
																	className="form-check-input"
																	id="agree2"
																/>
																<label
																	className="form-check-label"
																	htmlFor="agree2"
																>
																	I agree to the{" "}
																	<a href="#">Terms and conditions</a>
																</label>
																<p>
																	Already registered?
																	<button
																		className="twm-backto-login"
																		data-bs-target="#sign_up_popup2"
																		data-bs-toggle="modal"
																		data-bs-dismiss="modal"
																	>
																		Log in here
																	</button>
																</p>
															</div>
														</div>
													</div>
													<div className="col-md-12">
														<button type="submit" className="site-button">
															Sign Up
														</button>
													</div>
												</div>
											</div> */
