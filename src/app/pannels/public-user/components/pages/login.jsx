import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import { base, publicUser } from "../../../../../globals/route-names";
import Loader from "../../../../common/loader";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { SIGNINFIELD } from "../../../../../globals/sign-in-data";
import { login } from "../../../../context/auth/authApi";
import cookieMethods from "../../../../../utils/cookieUtils";
import toast from "react-hot-toast";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { LinkedIn } from "react-linkedin-login-oauth2";

function LoginPage() {
  const {
    isLoading,
    isVisible,
    setIsVisible,
    isSubmitting,
    setIsSubmitting,
  } = useContext(GlobalApiData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const [message, setMessage] = useState({ type: "", text: "" });

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


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
  
    try {
      const response = await login(formData);
  
      if (response.success && response.data.token && response.data.refresh_token) {
        const { token, refresh_token, role } = response.data;
  
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userRole", role);
        cookieMethods.setCookies(token, refresh_token);
  
        if (formData.rememberMe) {
          sessionStorage.setItem("rememberedUser", JSON.stringify(formData));
        } else {
          sessionStorage.removeItem("rememberedUser");
        }
  
        // ✅ Show success message
        toast.success(response.message, { position: "top-right", autoClose: 3000 });
  
        setTimeout(() => {
          switch (role) {
            case "admin":
              navigate("/admin");
              break;
            case "employer":
              navigate(base.EMPLOYER_PRE);
              break;
            case "user":
            default:
              navigate(base.CANDIDATE_PRE);
              break;
          }
        }, 2000);
      } else {
        // ✅ Extract validation errors
        const errorMessages = Object.values(response.errors || {}).flat().join("\n");
  
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


  return (
    <>
      {isLoading && <Loader />}

      <div className="section-full site-bg-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8 col-lg-6 col-md-5 twm-log-reg-media-wrap">
              <div className="twm-log-reg-media">
                <div className="twm-l-media">
                  <JobZImage src="images/login-bg.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-7">
              <div className="twm-log-reg-form-wrap">
                <div className="twm-log-reg-logo-head">
                  <NavLink to={publicUser.HOME1}>
                    <JobZImage src="images/yes-lg-2.png" alt="" className="logo" />
                  </NavLink>
                </div>
                <div className="twm-log-reg-inner">
                  <div className="twm-log-reg-head">
                    <div className="twm-log-reg-logo">
                      <span className="log-reg-form-title">Log In</span>
                    </div>

                  

                  {/* Display success/error message */}
                  {message.text && (
                    <div
                      className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} fade show`}
                      role="alert"
                    >
                      {message.text}
                    </div>
                  )}

                  <form onSubmit={handleLogin}>
                    <div className="row">
                      {SIGNINFIELD.fieldDetail.map((field) => (
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
                                  value={formData[field.name]}
                                  onChange={handleInputChange}
                                  minLength={8}
                                  maxLength={20}
                                />
                                {isVisible ? (
                                  <div className="eye-icon" onClick={() => setIsVisible(false)}>
                                    <IoMdEye size={25} />

                                  </div>
                                ) : (
                                  <div className="eye-icon" onClick={() => setIsVisible(true)}>
                                    <IoIosEyeOff size={25} />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <input
                                name={field.name}
                                type={field.type}
                                required
                                className="form-control"
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                              />
                            )}
                          </div>
                        </div>
                      ))}


                      <div className="col-lg-12">
                        <div className="twm-forgot-wrap">
                          <div className="form-group mb-3">
                            <div className="form-check ml-2">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label rem-forgot" htmlFor="rememberMe">
                                Remember me
                                <NavLink to="/forgotton-password" className="site-text-primary p-3">
                                  Forgot Password?
                                </NavLink>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <button type="submit" className="site-button" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting" : "Log in"}
                          </button>
                        </div>
                      </div>

                    </div>
                  </form>
                  <div className="text-center align-items-center">
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
                          LinkedIn
                        </button>
                      )}
                    </LinkedIn>
                  </li>
                </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}


export default LoginPage;
















//  return (
// 			<>
// 				{/* {isLoading && <Loader />} */}
				
// 				<div className="section-full site-bg-white">
// 					<div className="container-fluid">
// 						<div className="row">
// 							<div className="col-xl-8 col-lg-6 col-md-5 twm-log-reg-media-wrap">
// 								<div className="twm-log-reg-media">
// 									<div className="twm-l-media">
// 										<JobZImage src="images/login-bg.png" alt="" />
// 									</div>
// 								</div>
// 							</div>
// 							<div className="col-xl-4 col-lg-6 col-md-7">
// 								<div className="twm-log-reg-form-wrap">
// 									<div className="twm-log-reg-logo-head">
// 										<NavLink to={publicUser.HOME1}>
// 											<JobZImage
// 												src="images/yes-lg-2.png"
// 												alt=""
// 												className="logo"
// 											/>
// 										</NavLink>
// 									</div>
// 									<div className="twm-log-reg-inner">
// 										<div className="twm-log-reg-head">
// 											<div className="twm-log-reg-logo">
// 												<span className="log-reg-form-title">Log In</span>
// 											</div>
// 										</div>
// 										<div className="twm-tabs-style-2">
// 											<ul className="nav nav-tabs" id="myTab2" role="tablist">
// 												{/*Login Candidate*/}
// 												<li className="nav-item">
// 													<button
// 														className="nav-link active"
// 														data-bs-toggle="tab"
// 														data-bs-target="#twm-login-candidate"
// 														type="button"
// 														// onClick={() => {
// 														// 	setRole("1");
// 														// }}
// 													>
// 														<i className="fas fa-user-tie" />
// 														Candidate
// 													</button>
// 												</li>
// 												{/*Login Employer*/}
// 												<li className="nav-item">
// 													<button
// 														className="nav-link"
// 														data-bs-toggle="tab"
// 														data-bs-target="#twm-login-Employer"
// 														type="button"
// 														// onClick={() => {
// 														// 	setRole("2");
// 														// }}
// 													>
// 														<i className="fas fa-building" />
// 														Employer
// 													</button>
// 												</li>
// 											</ul>
// 											<div className="tab-content" id="myTab2Content">
// 												{/*Login Candidate Content*/}
// 												<form
// 													// onSubmit={handleCandidateLogin}
// 													className="tab-pane fade show active"
// 													id="twm-login-candidate"
// 												>
// 													<div className="row">
// 														<div className="col-lg-12">
// 															<div className="form-group mb-3">
// 																<input
// 																	name="email"
// 																	type="text"
// 																	required
// 																	className="form-control"
// 																	placeholder="email"
// 																	// value={canEmail}
// 																	// onChange={(event) => {
// 																	// 	setCanEmail(event.target.value);
// 																	// }}
// 																/>
// 															</div>
// 														</div>
// 														<div className="col-lg-12">
// 															<div className="form-group mb-3">
// 																{/* <input
// 																	name="password"
// 																	type="password"
// 																	className="form-control"
// 																	required
// 																	placeholder="Password*"
// 																	value={password}
// 																	onChange={(event) => {
// 																		setPassword(event.target.value);
// 																	}}
// 																/> */}

// 																<div className="ls-inputicon-box-signup ls-inputicon-box">
// 																	<input
// 																		name="password"
// 																		// type={isVisible ? "text" : "password"}
// 																		required
// 																		className="form-control"
// 																		// value={password}
// 																		minLength={8}
// 																		maxLength={20}
// 																		placeholder="Password*"
// 																		// onChange={(event) => {
// 																		// 	setPassword(event.target.value);
// 																		// }}
// 																	/>
// 																	{/* {isVisible ? (
// 																		<div
// 																			className=" eye-icon"
// 																			onClick={() => setIsVisible(false)}
// 																		>
// 																			<IoMdEye size={25} />
// 																		</div>
// 																	) : (
// 																		<div
// 																			className=" eye-icon"
// 																			onClick={() => setIsVisible(true)}
// 																		>
// 																			<IoIosEyeOff size={25} />
// 																		</div>
// 																	)} */}
// 																</div>
// 															</div>
// 														</div>
// 														<div className="col-lg-12">
// 															<div className="twm-forgot-wrap">
// 																<div className="form-group mb-3">
// 																	<div className="form-check">
// 																		<input
// 																			type="checkbox"
// 																			className="form-check-input"
// 																			id="Password4"
// 																		/>
// 																		<label
// 																			className="form-check-label rem-forgot"
// 																			htmlFor="Password4"
// 																		>
// 																			Remember me{" "}
// 																			<a
// 																				href="/reset-password"
// 																				className="site-text-primary"
// 																			>
// 																				Forgot Password
// 																			</a>
// 																		</label>
// 																	</div>
// 																</div>
// 															</div>
// 														</div>
// 														<div className="col-md-12">
// 															<div className="form-group">
// 																<button
// 																	type="submit"
// 																	className="site-button"
// 																	// disabled={isSubmitting}
// 																>
// 																	{/* {isSubmitting ? "Submitting" : "Log in"} */}
// 																</button>
// 															</div>
// 														</div>
// 													</div>
// 												</form>

// 												{/*Login Employer Content*/}
// 												<form
// 													// onSubmit={handleEmployerLogin}
// 													className="tab-pane fade"
// 													id="twm-login-Employer"
// 												>
// 													<div className="row">
// 														<div className="col-lg-12">
// 															<div className="form-group mb-3">
// 																<input
// 																	name="email"
// 																	type="text"
// 																	required
// 																	className="form-control"
// 																	placeholder="email"
// 																	// value={empEmail}
// 																	// onChange={(event) => {
// 																	// 	setEmpEmail(event.target.value);
// 																	// }}
// 																/>
// 															</div>
// 														</div>
// 														<div className="col-lg-12">
// 															<div className="form-group mb-3">
// 																{/* <input
// 																	name="password"
// 																	type="password"
// 																	className="form-control"
// 																	required
// 																	placeholder="Password*"
// 																	value={password}
// 																	onChange={(event) => {
// 																		setPassword(event.target.value);
// 																	}}
// 																/> */}

// 																<div className="ls-inputicon-box-signup ls-inputicon-box">
// 																	<input
// 																		name="password"
// 																		// type={isVisible ? "text" : "password"}
// 																		required
// 																		className="form-control"
// 																		// value={password}
// 																		minLength={8}
// 																		maxLength={20}
// 																		placeholder="Password*"
// 																		// onChange={(event) => {
// 																		// 	setPassword(event.target.value);
// 																		// }}
// 																	/>
// 																	{/* {isVisible ? (
// 																		<div
// 																			className=" eye-icon"
// 																			onClick={() => setIsVisible(false)}
// 																		>
// 																			<IoMdEye size={25} />
// 																		</div>
// 																	) : (
// 																		<div
// 																			className=" eye-icon"
// 																			onClick={() => setIsVisible(true)}
// 																		>
// 																			<IoIosEyeOff size={25} />
// 																		</div>
// 																	)} */}
// 																</div>
// 															</div>
// 														</div>
// 														<div className="col-lg-12">
// 															<div className="twm-forgot-wrap">
// 																<div className="form-group mb-3">
// 																	<div className="form-check">
// 																		<input
// 																			type="checkbox"
// 																			className="form-check-input"
// 																			id="Password4"
// 																		/>
// 																		<label
// 																			className="form-check-label rem-forgot"
// 																			htmlFor="Password4"
// 																		>
// 																			Remember me{" "}
// 																			<a href="#" className="site-text-primary">
// 																				Forgot Password
// 																			</a>
// 																		</label>
// 																	</div>
// 																</div>
// 															</div>
// 														</div>
// 														<div className="col-md-12">
// 															<div className="form-group">
// 																<button
// 																	type="submit"
// 																	className="site-button"
// 																	// disabled={isSubmitting}
// 																>
// 																	Log in
// 																</button>
// 															</div>
// 														</div>
// 														<div className="mt-3 mb-3">
// 															Don't have an account ?
// 															<button
// 																className="twm-backto-login"
// 																data-bs-target="#sign_up_popup"
// 																data-bs-toggle="modal"
// 																data-bs-dismiss="modal"
// 															>
// 																Sign Up
// 															</button>
// 														</div>
