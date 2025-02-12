import React, { useEffect, useState } from "react";
import OtpForm from "./Otp-form";
import { useAuth } from "../../../../context/auth/AuthContext";
import { publicUser } from "../../../../../globals/route-names";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../../../context/auth/UserContext";
import Loader from "../../../../common/loader";

function VerifyOtp() {
	
	const navigate = useNavigate();
   const [otpCleared, setOtpCleared] = useState(false);

	const { otp, otpRef, setOtp, setLoading, isLoading, setIsSubmitting, isSubmitting } =
		useAuth();
	
	
	

	console.log("otp-verify: ", otpRef.current);

	const { user } = useUser();
	

	console.log("email", user?.email);

	useEffect(() => {
		console.log("isSubmitting -eff", isSubmitting);
		if (isSubmitting === false) {
			setOtp("");
			otpRef.current = "";
			setOtpCleared((prev) => !prev);
		}
	}, [isSubmitting, otpRef, setOtp]);

		const handleVerifyOtp = async (e) => {
			e.preventDefault();
			console.log("submitting..", isSubmitting);

			if (!user.email) {
				toast.error("User doesn't exist");
				otpRef.current = "";
				return;
			}

			if (!otpRef.current || otpRef.current.length !== 6) {
				toast.error("Please enter a valid 6-digit OTP");

				return;
			}

			setTimeout(() => {
				setLoading(true);
			}, 200);

			try {
				setIsSubmitting(true);
				
				console.log("v-data", user.email, otp);
				const res = await axios.post(
					`${process.env.REACT_APP_BASE_URL}verify-otp`,
					{
						email: user?.email,
						otp: otpRef.current,
					}
				);

				console.log("v-res", res);
				toast.success("User verified successfully");

				navigate("/");
			} catch (error) {
				console.error(`Error submitting form`, error);
				toast.error(`Oops!, Error verifying Otp`);
			} finally {
				setIsSubmitting(false);
				// otpRef.current = "";
				setOtp("")
				setTimeout(() => (otpRef.current = ""), 0);
				console.log("verify submitting false");
				setTimeout(() => {
					setLoading(false);
				}, 3000);
			}
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
											<span className="log-reg-form-title">Verify OTP</span>
										</div>
									</div>
									<div className="twm-tabs-style-2">
										<div className="tab-content" id="myTab2Content">
											<form
												onSubmit={handleVerifyOtp}
												className="tab-pane fade show active"
											>
												<div className="">
													<div className="">
														<div className=" mb-3">
															{/* <OtpForm setOtp={setOtp} otp={otp} /> */}
															<OtpForm
																otpRef={otpRef}
																setOtp={setOtp}
																otp={otp}
															/>
														</div>
													</div>
												</div>

												<div className="col-md-12" disabled={isSubmitting}>
													<div className="form-group">
														<button type="submit" className="site-button">
															{isSubmitting ? "Submitting" : "Submit"}
														</button>
													</div>
												</div>
											</form>
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

export default VerifyOtp;





	
		/* <div className="row">
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
												
                                             
                                            </div> */
	


/* <ul className="nav nav-tabs" id="myTab2" role="tablist">
											
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
										</ul> */
