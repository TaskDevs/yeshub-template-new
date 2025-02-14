import { useEffect, useState, useContext } from "react";
import JobZImage from "../jobz-img";
import Loader from "../loader";
import { topMessage } from "../../../utils/responseUtils";
import { GlobalApiData } from "../../context/global/globalContextApi";
import { AuthApiData } from "../../context/auth/authContextApi";
import { SIGNINFIELD } from "../../../globals/sign-in-data";
import InputField from "../input-field";
import PasswordField from "../password-field";
import { FcGoogle } from "react-icons/fc";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

function SignInPopup() {
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

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // console.log("role-1", role)
  });

  const handleInputChange = (data, field) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleCandidateLogin = () => {
    console.log("We are working");
  };

  const handleEmployerLogin = () => {
    console.log("We are working");
  };

  const loginWithLinkedIn = () => {
    console.log("Login with LinkedIn");
  };

  const loginWithGoogle = () => {
    console.log("Login with LinkedIn");
  };

  return (
    <>
      {isLoading && <Loader />}
      {<topMessage />}

      {!isLoading && (
        <div
          className="modal fade twm-sign-up"
          id="sign_up_popup2"
          aria-hidden="true"
          aria-labelledby="sign_up_popupLabel2"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* <form> */}
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
                  <ul className="nav nav-tabs" id="myTab2" role="tablist">
                    {/*Login Candidate*/}
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#login-candidate"
                        type="button"
                        onClick={() => setRoleOption("1")}
                      >
                        <i className="fas fa-user-tie" />
                        Candidate
                      </button>
                    </li>
                    {/*Login Employer*/}
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#login-Employer"
                        type="button"
                        onClick={() => {
                          setRoleOption("2");
                        }}
                      >
                        <i className="fas fa-building" />
                        Employer
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTab2Content">
                    {/*Login Candidate Content*/}
                    <form
                      onSubmit={handleCandidateLogin}
                      className="tab-pane fade show active"
                      id="login-candidate"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <InputField
                            field={SIGNINFIELD.fieldDetail[0]}
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
                                field={SIGNINFIELD.fieldDetail[1]}
                                value={formData}
                                isVisible={isVisible}
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
                                id="Password3"
                              />
                              <label
                                className="form-check-label rem-forgot"
                                htmlFor="Password3"
                              >
                                Remember me{" "}
                                <a href="/reset-password">Forgot Password</a>
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
                          Don't have an account ?
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
                    {/*Login Employer Content*/}
                    <form
                      onSubmit={handleEmployerLogin}
                      className="tab-pane fade"
                      id="login-Employer"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <InputField
                              field={SIGNINFIELD.fieldDetail[0]}
                              value={formData}
                              change={(data, field) => {
                                handleInputChange(data, field);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <div className="ls-inputicon-box-signup ls-inputicon-box">
                              <PasswordField
                                field={SIGNINFIELD.fieldDetail[1]}
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
                                id="Password4"
                              />
                              <label
                                className="form-check-label rem-forgot"
                                htmlFor="Password4"
                              >
                                Remember me{" "}
                                <a href="/reset-password">Forgot Password</a>
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

                          <div className="mt-3 mb-3">
                            Don't have an account ?
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
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
                    onClick={() => loginWithLinkedIn()}
                  >
                    <div className="form-group">
                      <button
                        type="submit"
                        className="log_with_google flex-center log_with_linkedin"
                        onClick={() => loginWithLinkedIn()}
                      >
                        <div className="pop-up-btn-logo">
                          <JobZImage src="images/linkedin-logo-1a.png" alt="" />
                        </div>
                        Continue with LinkedIn
                      </button>
                    </div>
                  </div>

                  <div className="form-group" onClick={loginWithGoogle}>
                    <button
                      type="submit"
                      className="log_with_google flex-center btn-google"
                    >
                      <div className="pop-up-btn-logo">
                        <FcGoogle size={20} />
                      </div>
                      Continue with Google
                    </button>
                  </div>
                </ul>
              </div>
              {/* <div className="col-md-12">
								<div className="form-group">
									<button type="submit" className="log_with_google">
										<JobZImage src="images/google-icon.png" alt="" />
										Continue with Google
									</button>
								</div>
							</div> */}
              {/* </form> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInPopup;
