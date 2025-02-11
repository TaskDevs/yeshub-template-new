
import JobZImage from "../jobz-img";
import useAuth from "../../context/auth/useAuth";
import Loader from "../loader";
import { FcGoogle } from "react-icons/fc";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useEffect } from "react";

function SignInPopup() {
	const {
		handleCandidateLogin,
		handleSubmit,
		isSubmitting,
		password,
		setPassword,
		email,
		setEmail,	
		loginWithLinkedIn,
		loginWithGoogle,
		role,
		setRole,
		success,
		error,
		showTopMessage,
		setShowTopMessage,
		isLoading,
		isVisible,
		setIsVisible,
	} = useAuth();



	useEffect(() => {
		console.log("role-1", role)
	})

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
												onClick={() => setRole("user")}
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
													setRole("employer");
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
											onSubmit={handleSubmit}
											className="tab-pane fade show active"
											// id="login-candidate"
										>
											<div className="row">
												<div className="col-lg-12">
													<div className="form-group mb-3">
														<input
															name="email"
															type="text"
															required
															className="form-control"
															placeholder="Username*"
															value={email}
															onChange={(event) => {
																setEmail(event.target.value);
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
																<a href="/forgot-password">Forgot Password</a>
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
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<span className="modal-f-title">Login or Sign up with</span>
								<ul className="twm-modal-social">
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
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default SignInPopup;



/* <form
	onSubmit={handleEmployerLogin}
	className="tab-pane fade"
	id="login-Employer"
>
	<div className="row">
		<div className="col-lg-12">
			<div className="form-group mb-3">
				<input
					name="empUsername"
					type="text"
					required
					className="form-control"
					placeholder="Username*"
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
														/> 

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
						<div className=" eye-icon" onClick={() => setIsVisible(false)}>
							<IoMdEye size={25} />
						</div>
					) : (
						<div className=" eye-icon" onClick={() => setIsVisible(true)}>
							<IoIosEyeOff size={25} />
						</div>
					)}
				</div>
			</div>
		</div>
		<div className="col-lg-12">
			<div className="form-group mb-3">
				<div className=" form-check">
					<input type="checkbox" className="form-check-input" id="Password4" />
					<label className="form-check-label rem-forgot" htmlFor="Password4">
						Remember me <a href="/reset-password">Forgot Password</a>
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
</form>; */
