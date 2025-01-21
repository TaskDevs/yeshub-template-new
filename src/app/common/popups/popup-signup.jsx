import { useNavigate } from "react-router-dom";
import JobZImage from "../jobz-img";
import { useState } from "react";
import axios from "axios";
import { candidate, canRoute, employer, empRoute } from "../../../globals/route-names";
import useAuth from "../../context/auth/useAuth";


function SignUpPopup() {

	const [isEmailValid, setIsEmailValid] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [country, setCountry] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [location, setLocation] = useState("");
	const [role, setRole] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { handleAuthError } = useAuth();
	
	const navigate = useNavigate();

	const validateEmail = (input) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(input)
    }

	const handleInputChange = (value) => {
        setEmail(value)
        if (!validateEmail(value)) {
					setIsEmailValid(false);
					handleAuthError("");
				} else {
					setIsEmailValid(true);
					handleAuthError("");
				}
    }


	
			const url = `${process.env.REACT_APP_BASE_URL}register`;

	const csrfToken = document.cookie
		.split("; ")
		.find((row) => row.startsWith("XSRF-TOKEN"))
		?.split("=")[1];


			const handleSignup = (event) => {
				event.preventDefault();
				signup();
			};

	const signup = async () => {
		if (password !== confirmPassword) {
			setIsSubmitting(false);
			return;
		}
		try {
			setIsSubmitting(true);
			const response = await axios.post(
				url,
				{
					username,
					email,
					password,
					password_confirmation: confirmPassword,
					role,
					firstName,
					lastName,
					phoneNo: phone,
					country,
					city,
					address,
					location,
				},
				{
					headers: {
						"X-XSRF-TOKEN": csrfToken,
					},
					withCredentials: true,
				}
			);
			const data = response.data;
			console.log("data", data);

			if (response.status === 200) {
				if (role === "1") {
					return moveToCandidate();
				} else {
					return moveToEmployer();
				}
						
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
			setUsername("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			setFirstName("");
			setLastName("");
			setPhone("");
			setCountry("");
			setLocation("");
			setAddress("");
			setCity("");
			setRole("");
		}
	}

			const moveToCandidate = () => {
				navigate(canRoute(candidate.DASHBOARD));
			};

			const moveToEmployer = () => {
				navigate(empRoute(employer.DASHBOARD));
			};





    return (
			<>
				<div
					className="modal fade twm-sign-up"
					id="sign_up_popup"
					aria-hidden="true"
					aria-labelledby="sign_up_popupLabel"
					tabIndex={-1}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<form onSubmit={handleSignup}>
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
													className="nav-link active"
													data-bs-toggle="tab"
													data-bs-target="#sign-candidate"
													type="button"
												>
													<i className="fas fa-user-tie" />
													Candidate
												</button>
											</li>
											{/*Signup Employer*/}
											<li className="nav-item" role="presentation">
												<button
													className="nav-link"
													data-bs-toggle="tab"
													data-bs-target="#sign-Employer"
													type="button"
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
												id="sign-candidate"
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
																value={username}
																onChange={(event) => {
																	setUsername(event.target.value);
																}}
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
																onChange={(event) => {
																	handleInputChange(event.target.value);
																}}
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
																value={firstName}
																onChange={(event) => {
																	setFirstName(event.target.value);
																}}
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
																value={lastName}
																onChange={(event) => {
																	setLastName(event.target.value);
																}}
															/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="password"
																type="text"
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
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="confirmPassword"
																type="text"
																required
																className="form-control"
																value={confirmPassword}
																minLength={8}
																maxLength={20}
																placeholder="Confirm Password*"
																onChange={(event) => {
																	setConfirmPassword(event.target.value);
																}}
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
																	value={country}
																	onChange={(event) => {
																		setCountry(event.target.value);
																	}}
																/>
															</div>

															<div className="form-group mb-3">
																<input
																	name="city"
																	type="text"
																	className="form-control"
																	required
																	placeholder="City*"
																	value={city}
																	onChange={(event) => {
																		setCity(event.target.value);
																	}}
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
																	value={address}
																	onChange={(event) => {
																		setAddress(event.target.value);
																	}}
																/>
															</div>
															<div className="form-group mb-3">
																<input
																	name="location"
																	type="text"
																	className="form-control"
																	required
																	placeholder="Location*"
																	value={location}
																	onChange={(event) => {
																		setLocation(event.target.value);
																	}}
																/>
															</div>
														</div>
													</div>

													<div className="col-lg-12">
														<div className="flex">
															<div className="form-group mb-3">
																<input
																	name="phone"
																	type="text"
																	className="form-control"
																	required
																	placeholder="Phone*"
																	value={phone}
																	onChange={(event) => {
																		setPhone(event.target.value);
																	}}
																/>
															</div>

															<div className="form-group mb-3 w-role">
																<select
																	name="role"
																	className="form-control"
																	required
																	value={role}
																	onChange={(event) =>
																		setRole(event.target.value)
																	}
																>
																	<option value="" disabled>
																		Select Role*
																	</option>
																	<option value="1">Candidate</option>
																	<option value="2">Employer</option>
																</select>
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
								<div className="modal-footer">
									<span className="modal-f-title">Login or Sign up with</span>
									<ul className="twm-modal-social">
										{/* <li><a href="https://www.facebook.com/" className="facebook-clr"><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href="https://www.twitter.com/" className="twitter-clr"><i className="fab fa-twitter" /></a></li>
                                    <li><a href="https://in.linkedin.com/" className="linkedin-clr"><i className="fab fa-linkedin-in" /></a></li>
                                    <li><a href="https://www.google.com/" className="google-clr"><i className="fab fa-google" /></a></li>
                                 */}
										<div className="col-md-12">
											<div className="form-group">
												<button
													type="submit"
													className="log_with_google flex-center"
												>
													<div className="pop-up-btn-logo">
														<JobZImage
															src="images/linkedin-logo-1a.png"
															alt=""
														/>
													</div>
													Continue with LinkedIn
												</button>
											</div>
										</div>
									</ul>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		);
}

export default SignUpPopup;