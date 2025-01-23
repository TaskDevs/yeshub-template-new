import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import { publicUser } from "../../../../../globals/route-names";
import { useState } from "react";
import useAuth from "../../../../context/auth/useAuth";
import axios from "axios";

function ResetPasswordPage() {
	const {
		handleCandidateLogin,
		isSubmitting,
		password,
		setPassword,
		setConfirmPassword,
		setIsSubmitting,
		setRole,
	} = useAuth();
	const navigate = useNavigate();

	const url = `${process.env.REACT_APP_BASE_URL}`;

	const handleResetPassword = async (e) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			const response = await axios.post(url);
			console.log("res", response);
			if (response.status === 200) {
				navigate("/login");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setPassword("");
			setConfirmPassword("");
		}
	};

	return (
		<>
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
											<span className="log-reg-form-title">Reset Password</span>
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
													onClick={() => setRole("1")}
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
													onClick={() => setRole("2")}
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
																name="password1"
																type="password"
																required
																className="form-control"
																placeholder="Password*"
																value={password}
																onChange={(event) => {
																	setPassword(event.target.value);
																}}
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="password2"
																type="password"
																className="form-control"
																required
																placeholder="Confirm Password*"
																value={password}
																onChange={(event) => {
																	setConfirmPassword(event.target.value);
																}}
															/>
														</div>
													</div>
													{/* <div className="col-lg-12">
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
													</div> */}

													{/* <div className="col-md-12">
														<div className="form-group">
															<span className="center-text-or">Or</span>
														</div>
													</div> */}
													{/* <div className="col-md-12">
															<div className="form-group">
																<button
																	type="submit"
																	className="log_with_facebook"
																>
																	{/* <i className="fab fa-facebook" /> *
																	<i class="fab fa-linkedin" color="blue"></i>
																	Continue with LinkedIn
																</button>
															</div>
														</div> */}
													{/* <div
															className="col-md-12"
															onClick={() => {
																loginWithLinkedIn();
															}}
														>
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
														</div> */}
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

											<div
												className="col-md-12"
												onClick={() => handleResetPassword()}
											>
												<div className="form-group">
													<button type="submit" className="site-button">
														{isSubmitting ? "Submitting" : "Reset Password"}
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

export default ResetPasswordPage;
