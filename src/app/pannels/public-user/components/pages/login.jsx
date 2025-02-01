import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import { canRoute, candidate, empRoute, employer, publicUser } from "../../../../../globals/route-names";
import { useState } from "react";
// import processLogin from "../../../../form-processing/login";
// import { formType } from "../../../../../globals/constants";
// import axios from "axios";
import useAuth from "../../../../context/auth/useAuth";
import Loader from "../../../../common/loader";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {

	const {
		handleCandidateLogin,
		handleEmployerLogin,
		isSubmitting,
		password,
		setPassword,
		canUsername,
		setCanUsername,
		empUsername,
		setEmpUsername,
		setRole,
		showTopMessage,
		setShowTopMessage,
		success,
		error,
		isLoading,
		isVisible,
		setIsVisible
	} = useAuth();

    const url = `${process.env.REACT_APP_BASE_URL}login`;
    console.log("url", url);

    return (
			<>
				{isLoading && <Loader />}
				{showTopMessage && (
					<div className="errorAlert">
						<div className="inner">
							{success && "User logged in successfully"}
							{!success &&
								error &&
								"Oops!, An error ocurred while logging in. Try again"}
						</div>

						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={() => setShowTopMessage(false)}
						/>
					</div>
				)}
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
											<JobZImage
												src="images/yes-lg-2.png"
												alt=""
												className="logo"
											/>
										</NavLink>
									</div>
									<div className="twm-log-reg-inner">
										<div className="twm-log-reg-head">
											<div className="twm-log-reg-logo">
												<span className="log-reg-form-title">Log In</span>
											</div>
										</div>
										<div className="twm-tabs-style-2">
											<ul className="nav nav-tabs" id="myTab2" role="tablist">
												{/*Login Candidate*/}
												<li className="nav-item">
													<button
														className="nav-link active"
														data-bs-toggle="tab"
														data-bs-target="#twm-login-candidate"
														type="button"
														onClick={() => {
															setRole("1");
														}}
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
														data-bs-target="#twm-login-Employer"
														type="button"
														onClick={() => {
															setRole("2");
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
													id="twm-login-candidate"
												>
													<div className="row">
														<div className="col-lg-12">
															<div className="form-group mb-3">
																<input
																	name="username"
																	type="text"
																	required
																	className="form-control"
																	placeholder="username"
																	value={canUsername}
																	onChange={(event) => {
																		setCanUsername(event.target.value);
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-3">
																{/* <input
																	name="password"
																	type="password"
																	className="form-control"
																	required
																	placeholder="Password*"
																	value={password}
																	onChange={(event) => {
																		setPassword(event.target.value);
																	}}
																/> */}

																<div className="ls-inputicon-box-signup ls-inputicon-box">
																	<input
																		name="password"
																		type={isVisible ? "text" : "password"}
																		required
																		className="form-control"
																		value={password}
																		minLength={8}
																		maxLength={20}
																		placeholder="Password*"
																		onChange={(event) => {
																			setPassword(event.target.value);
																		}}
																	/>
																	{isVisible ? (
																		<div
																			className=" eye-icon"
																			onClick={() => setIsVisible(false)}
																		>
																			<IoMdEye size={25} />
																		</div>
																	) : (
																		<div
																			className=" eye-icon"
																			onClick={() => setIsVisible(true)}
																		>
																			<IoIosEyeOff size={25} />
																		</div>
																	)}
																</div>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="twm-forgot-wrap">
																<div className="form-group mb-3">
																	<div className="form-check">
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
																			<a
																				href="/reset-password"
																				className="site-text-primary"
																			>
																				Forgot Password
																			</a>
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-md-12">
															<div className="form-group">
																<button
																	type="submit"
																	className="site-button"
																	disabled={isSubmitting}
																>
																	{isSubmitting ? "Submitting" : "Log in"}
																</button>
															</div>
														</div>
													</div>
												</form>

												{/*Login Employer Content*/}
												<form
													onSubmit={handleEmployerLogin}
													className="tab-pane fade"
													id="twm-login-Employer"
												>
													<div className="row">
														<div className="col-lg-12">
															<div className="form-group mb-3">
																<input
																	name="username"
																	type="text"
																	required
																	className="form-control"
																	placeholder="username"
																	value={empUsername}
																	onChange={(event) => {
																		setEmpUsername(event.target.value);
																	}}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-3">
																{/* <input
																	name="password"
																	type="password"
																	className="form-control"
																	required
																	placeholder="Password*"
																	value={password}
																	onChange={(event) => {
																		setPassword(event.target.value);
																	}}
																/> */}

																<div className="ls-inputicon-box-signup ls-inputicon-box">
																	<input
																		name="password"
																		type={isVisible ? "text" : "password"}
																		required
																		className="form-control"
																		value={password}
																		minLength={8}
																		maxLength={20}
																		placeholder="Password*"
																		onChange={(event) => {
																			setPassword(event.target.value);
																		}}
																	/>
																	{isVisible ? (
																		<div
																			className=" eye-icon"
																			onClick={() => setIsVisible(false)}
																		>
																			<IoMdEye size={25} />
																		</div>
																	) : (
																		<div
																			className=" eye-icon"
																			onClick={() => setIsVisible(true)}
																		>
																			<IoIosEyeOff size={25} />
																		</div>
																	)}
																</div>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="twm-forgot-wrap">
																<div className="form-group mb-3">
																	<div className="form-check">
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
																			<a href="#" className="site-text-primary">
																				Forgot Password
																			</a>
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-md-12">
															<div className="form-group">
																<button
																	type="submit"
																	className="site-button"
																	disabled={isSubmitting}
																>
																	Log in
																</button>
															</div>
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

														{/* <p>
															Don't have an account ?
															<button
																className="twm-backto-login"
																data-bs-target="#sign_up_popup"
																data-bs-toggle="modal"
																data-bs-dismiss="modal"
															>
																Sign up
															</button>
														</p> */}

														<div className="col-md-12">
															<div className="form-group">
																<span className="center-text-or">Or</span>
															</div>
														</div>

														{/* <div className="col-md-12">
															<div className="form-group">
																<button
																	type="submit"
																	className="log_with_google"
																>
																	<JobZImage
																		src="images/google-icon.png"
																		alt=""
																	/>
																	Continue with Google
																</button>
															</div>
														</div> */}
													</div>
												</form>

												<div className="col-md-12">
													<div className="form-group ">
														<button
															type="submit"
															className="log_with_google log_with_linkedin"
														>
															<JobZImage
																src="images/linkedin-logo-1a.png"
																alt=""
															/>
															Continue with LinkedIn
														</button>
													</div>
												</div>

												<div className="col-md-12 ">
													<div className="form-group">
														<button
															type="submit"
									
															className=" log_with_google  d-flex flex-center gap-3 btn-google-login"
														>
															
															<FcGoogle size={20} />
															Continue with Google
														</button>
													</div>
												</div>

												
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







														
															/* <div className="col-md-12">
															<div className="form-group">
																<span className="center-text-or">Or</span>
															</div>
														</div> */
														
														
															/* <div className="col-md-12">
															<div className="form-group">
																<button
																	type="submit"
																	className="log_with_facebook"
																>
																	<i className="fab fa-facebook" />
																	Continue with Facebook
																</button>
															</div>
														</div> */
														

														
															/*
														<div className="col-md-12">
															<div className="form-group">
																<button
																	type="submit"
																	className="log_with_google log_with_linkedin"
																>
																	<JobZImage
																		src="images/linkedin-logo-1a.png"
																		alt=""
																	/>
																	Continue with LinkedIn
																</button>
															</div>
													</div>
													 */
														

														
															/* <div className="col-md-12">
															<div className="form-group">
																<button
																	type="submit"
																	className="log_with_google"
																>
																	<JobZImage
																		src="images/google-icon.png"
																		alt=""
																	/>
																	Continue with Google
																</button>
															</div>
														</div> */

    // const handleCandidateLogin = (event) => {
    //     event.preventDefault();
    //     loginCandidate();
    // }

    // const handleEmployerLogin = (event) => {
    //     event.preventDefault();
    //     loginEmployer();
    // }

    // const loginCandidate = async () => {
    //     if (!canUsername || !password) {
	// 				setIsSubmitting(false);
	// 				return;
	// 			}
    //     try {
    //             setIsSubmitting(true);
	// 				const response = await axios.post(
	// 					url,
	// 					{
	// 						username: canUsername,
	// 						password: password,
	// 					},
	// 					{
	// 						headers: {
	// 							"Content-type": "application/json",
	// 						},
	// 					}
	// 				);
	// 				const data = response.data;
	// 				console.log("data", data);

	// 				if (response.status === 200) {
	// 					moveToCandidate();
	// 				}
	// 			} catch (error) {
	// 				setCanUsername("");
	// 				setPassword("");
	// 			} finally {
	// 				setIsSubmitting(false);
	// 			}    

    //     // processLogin(
    //     //     {
    //     //         type: formType.LOGIN_CANDIDATE,
    //     //         username: canUsername,
    //     //         password: password
    //     //     },
    //     //     (valid) => {
    //     //         if (valid) {
    //     //             moveToCandidate();
    //     //         } else {
    //     //             // show error
    //     //             console.log('error');
    //     //         }
    //     //     }
    //     // );
    // }

    // const loginEmployer = async () => {
    //     try {
	// 				const response = await axios.post(
	// 					url,
	// 					{
	// 						username: empUsername,
	// 						password: password,
	// 					},
	// 					{
	// 						headers: {
	// 							"Content-type": "application/json",
	// 						},
	// 					}
	// 				);
	// 				const data = response.data;
	// 				console.log("data", data);

	// 				if (response.status === 200) {
	// 					moveToEmployer();
	// 				}
	// 			} catch (error) {
	// 				setEmpUsername("");
	// 				setPassword("");
	// 			} finally {
	// 				setIsSubmitting(false);
	// 			}  


    //     // processLogin(
    //     //     {
    //     //         type: formType.LOGIN_EMPLOYER,
    //     //         username: empUsername,
    //     //         password: password
    //     //     },
    //     //     (valid) => {
    //     //         if (valid) {
    //     //             moveToEmployer();
    //     //         } else {
    //     //             // show error
    //     //             console.log('error');
    //     //         }
    //     //     }
    //     // );
    // }

    // const moveToCandidate = () => {
    //     navigate(canRoute(candidate.DASHBOARD));
    // }

    // const moveToEmployer = () => {
    //     navigate(empRoute(employer.DASHBOARD));
    // }