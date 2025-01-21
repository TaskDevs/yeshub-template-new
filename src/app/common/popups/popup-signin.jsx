import processLogin from "../../form-processing/login";
import { formType } from "../../../globals/constants";
import { useNavigate } from "react-router-dom";
import { canRoute, candidate, empRoute, employer } from "../../../globals/route-names";
import { useState } from "react";
import JobZImage from "../jobz-img";
import axios from "axios";

function SignInPopup() {

    const navigate = useNavigate();
    // const [canusername,  setCanEmail] = useState('guest');
    // const [empusername,  setEmpEmail] = useState('admin');
    // const [password, setPassword] = useState('12345');

    // const handleCandidateLogin = (event) => {
    //     event.preventDefault();
    //     loginCandidate();
    // }

    // const handleEmployerLogin = (event) => {
    //     event.preventDefault();
    //     loginEmployer();
    // }

    // const loginCandidate = () => {
    //     processLogin(
    //         {
    //             type: formType.LOGIN_CANDIDATE,
    //             username: canusername,
    //             password: password
    //         },
    //         (valid) => {
    //             if (valid) {
    //                 moveToCandidate();
    //             } else {
    //                 // show error
    //                 console.log('error');
    //             }
    //         }
    //     );
    // }

    // const loginEmployer = () => {
    //     processLogin(
    //         {
    //             type: formType.LOGIN_EMPLOYER,
    //             username: empusername,
    //             password: password
    //         },
    //         (valid) => {
    //             if (valid) {
    //                 moveToEmployer();
    //             } else {
    //                 // show error
    //                 console.log('error');
    //             }
    //         }
    //     );
    // }

    // const moveToCandidate = () => {
    //     navigate(canRoute(candidate.DASHBOARD));
    // }

    // const moveToEmployer = () => {
    //     navigate(empRoute(employer.DASHBOARD));
	// }
	

	    const [canEmail, setCanEmail] = useState("guest@gmail.com");
			const [empEmail, setEmpEmail] = useState("admin@gmail.com");
			const [password, setPassword] = useState("12345");
			const [isSubmitting, setIsSubmitting] = useState(false);

			const url = `${process.env.REACT_APP_BASE_URL}/login`;
			console.log("url", url);

			const handleCandidateLogin = (event) => {
				event.preventDefault();
				loginCandidate();
			};

			const handleEmployerLogin = (event) => {
				event.preventDefault();
				loginEmployer();
			};

			const loginCandidate = async () => {
				if (!canEmail || !password) {
					setIsSubmitting(false);
					return;
				}
				try {
					setIsSubmitting(true);
					const response = await axios.post(
						url,
						{
							email: canEmail,
							password: password,
						},
						{
							headers: {
								"Content-type": "application/json",
							},
						}
					);
					const data = response.data;
					console.log("data", data);

					if (response.status === 200) {
						moveToCandidate();
					}
				} catch (error) {
					setCanEmail("");
					setPassword("");
				} finally {
					setIsSubmitting(false);
				}

				// processLogin(
				//     {
				//         type: formType.LOGIN_CANDIDATE,
				//         email: canEmail,
				//         password: password
				//     },
				//     (valid) => {
				//         if (valid) {
				//             moveToCandidate();
				//         } else {
				//             // show error
				//             console.log('error');
				//         }
				//     }
				// );
			};

			const loginEmployer = async () => {
				try {
					const response = await axios.post(
						url,
						{
							email: empEmail,
							password: password,
						},
						{
							headers: {
								"Content-type": "application/json",
							},
						}
					);
					const data = response.data;
					console.log("data", data);

					if (response.status === 200) {
						moveToEmployer();
					}
				} catch (error) {
					setEmpEmail("");
					setPassword("");
				} finally {
					setIsSubmitting(false);
				}

				// processLogin(
				//     {
				//         type: formType.LOGIN_EMPLOYER,
				//         email: empEmail,
				//         password: password
				//     },
				//     (valid) => {
				//         if (valid) {
				//             moveToEmployer();
				//         } else {
				//             // show error
				//             console.log('error');
				//         }
				//     }
				// );
			};

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
													<div className="form-group mb-3">
														<input
															name="email"
															type="text"
															required
															className="form-control"
															placeholder="Email*"
															value={canEmail}
															onChange={(event) => {
																setCanEmail(event.target.value);
															}}
														/>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group mb-3">
														<input
															name="password"
															type="password"
															className="form-control"
															required
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
																Remember me <a href="#">Forgot Password</a>
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
										{/*Login Employer Content*/}
										<form
											onSubmit={handleEmployerLogin}
											className="tab-pane fade"
											id="login-Employer"
										>
											<div className="row">
												<div className="col-lg-12">
													<div className="form-group mb-3">
														<input
															name="email"
															type="text"
															required
															className="form-control"
															placeholder="Email*"
															value={empEmail}
															onChange={(event) => {
																setEmpEmail(event.target.value);
															}}
														/>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group mb-3">
														<input
															name="password"
															type="password"
															className="form-control"
															required
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
																Remember me <a href="#">Forgot Password</a>
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
									<div className="col-md-12">
										<div className="form-group">
											<button
												type="submit"
												className="log_with_google flex-center"
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
							<div className="col-md-12">
								<div className="form-group">
									<button type="submit" className="log_with_google">
										<JobZImage src="images/google-icon.png" alt="" />
										Continue with Google
									</button>
								</div>
							</div>
							{/* </form> */}
						</div>
					</div>
				</div>
			</>
		);
}

export default SignInPopup;