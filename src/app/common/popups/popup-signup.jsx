import { useNavigate } from "react-router-dom";
import JobZImage from "../jobz-img";
import { useEffect, useState } from "react";
import axios from "axios";
import {
	candidate,
	canRoute,
	employer,
	empRoute,
} from "../../../globals/route-names";
import useAuth from "../../context/auth/useAuth";
import { toast } from "react-toastify";
import Loader from "../loader";
import { useUser } from "../../context/auth/UserContext";

function SignUpPopup() {
	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [showTopMessage, setShowTopMessage] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const { updateUser } = useUser();

	const initialFormData = {
		username: "",
		password: "",
		password_confirmation: "",
		firstName: "",
		lastName: "",
		phoneNo: "",
		country: "",
		city: "",
		address: "",
		location: "",
		role: "1",
	};

	const [formData, setFormData] = useState(initialFormData);
	
	const loginSuccess = () => toast("User successfully sign up!");
	const loginError = () => toast("Error!, Failed to sign up!");
	const passwordError = () => toast("Error!, Passwords do not match!");

	const url = `${process.env.REACT_APP_BASE_URL}register`;

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		
		 console.log("Submitting with role:", formData.role);
			if (!formData.role) {
				setError("Please select a role (Candidate or Employer)");
				return;
			}
		if (formData.password !== formData.password_confirmation) {
			setIsSubmitting(false);
			passwordError();
			return;
		}

		setTimeout(() => {
			setLoading(true);
		}, 200);

		try {
			setIsSubmitting(true);
			console.log("formdata", formData);

			const response = await axios.post(url, formData);
			setSuccess(true);
			const data = response.data;
			console.log("data", data);
			updateUser(data)

			if (response.status === 201) {
				loginSuccess();
				showTopMessage(true)
				if (formData.role === "1") {
					
					
					
					return moveToCandidate();
				} else {
					return moveToEmployer();
				}
			}
		} catch (err) {
			loginError();
			setError(err.response?.data?.message || "An error occurred");
			setShowTopMessage(true);
			
		} finally {
			setIsSubmitting(false);
			setEmail("")
			setShowTopMessage(true);
			setFormData(initialFormData);
			setSuccess("");
			setError("");
			setTimeout(() => {
				setLoading(false);
			}, 4000);

		}
	};

	const { handleAuthError, loginWithLinkedIn } = useAuth();

	const validateEmail = (input) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(input);
	};

	const handleInputChange = (event) => {
		const value = event.target.value; 
		setEmail(value);
		if (!validateEmail(value)) {
			setIsEmailValid(false);
			handleAuthError("");
		} else {
			setIsEmailValid(true);
			handleAuthError("");
		}
	};

	const moveToCandidate = () => {
		navigate(canRoute(candidate.DASHBOARD));
	};

	const moveToEmployer = () => {
		navigate(empRoute(employer.DASHBOARD));
	};

	return (
		<>
			{isLoading && <Loader />}
			{showTopMessage && (
				<div className="errorAlert">
					<div className="inner">
						{success && "User registered successfully"}
						{!success &&
							error &&
							"Oops!, An error ocurred while signing up. Try again"}
					</div>

					<button
						type="button"
						className="btn-close"
						aria-label="Close"
						onClick={() => setShowTopMessage(false)}
					/>
				</div>
			)}

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
														<div className="form-group mb-3">
															<input
																name="username"
																type="text"
																required
																className="form-control"
																placeholder="Username*"
																minLength={3}
																maxLength={50}
																value={formData.username}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="email"
																type="text"
																required
																className="form-control"
																value={email}
																placeholder="Email*"
																onChange={handleInputChange}
															/>

															{isEmailValid === false && (
																<div className="">
																	<div className="">
																		<strong>
																			Please enter a valid email address
																		</strong>
																	</div>
																</div>
															)}
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="firstName"
																type="text"
																required
																className="form-control"
																placeholder="First Name*"
																value={formData.firstName}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="lastName"
																type="text"
																required
																className="form-control"
																placeholder="Last Name*"
																value={formData.lastName}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="password"
																type="password"
																required
																className="form-control"
																value={formData.password}
																minLength={8}
																maxLength={20}
																placeholder="Password*"
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="password_confirmation"
																type="password"
																required
																className="form-control"
																value={formData.password_confirmation}
																onChange={handleChange}
																minLength={8}
																maxLength={20}
																placeholder="Confirm Password*"
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="phoneNo"
																type="text"
																className="form-control"
																required
																placeholder="Phone*"
																value={formData.phoneNo}
																onChange={handleChange}
															/>
														</div>
													</div>

													<div className="col-lg-12">
														<div className="flex">
															<div className="form-group mb-3">
																<input
																	name="country"
																	type="text"
																	className="form-control"
																	required
																	placeholder="Country*"
																	value={formData.country}
																	onChange={handleChange}
																/>
															</div>

															<div className="form-group mb-3">
																<input
																	name="city"
																	type="text"
																	className="form-control"
																	required
																	placeholder="City*"
																	value={formData.city}
																	onChange={handleChange}
																/>
															</div>
														</div>
													</div>

													<div className="col-lg-12">
														<div className="flex">
															<div className="form-group mb-3">
																<input
																	name="address"
																	type="text"
																	className="form-control"
																	required
																	placeholder="address*"
																	value={formData.address}
																	onChange={handleChange}
																/>
															</div>
															<div className="form-group mb-3">
																<input
																	name="location"
																	type="text"
																	className="form-control"
																	required
																	placeholder="Location*"
																	value={formData.location}
																	onChange={handleChange}
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
											{/*Signup Employer Content*/}
											{/* <div className="tab-pane fade" id="sign-Employer">
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
											</div> */}
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
											loginWithLinkedIn();
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
