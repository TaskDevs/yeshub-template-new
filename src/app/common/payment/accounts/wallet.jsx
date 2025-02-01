import React from 'react'
import { Link, useLocation } from 'react-router-dom';
// import CheckoutPage from '../stripe/checkout-page';

function Wallet() {
	const currentpath = useLocation().pathname;
		const location = currentpath.split("/")[1];
  return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">Wallet</h4>
				<a
					data-bs-toggle="modal"
					href="#payment-form"
					role="button"
					title="Edit"
					className="site-text-primary"
				>
					<span className="fa fa-edit" />
				</a>
			</div>
			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					<p>
						<b>Get insights about your finances</b>
					</p>

					<div className="">
						<div className="">
							<div className="">
								<h5>Available Balance</h5>
								<p>₵100.00</p>
							</div>

							<div className="">
								<div className="">
									<p>
										{location === "dashboard-candidate"
											? "To withdraw earnings, first you need to set up a withdrawal method."
											: "To withdraw earnings, first you need to set up a withdrawal method"}
									</p>
									<p>
										It may take up to 3 days to activate your withdrawal method.
									</p>
									<div className="">
										{/* open modal for the select mode of payment */}

										<div className="form-group  col-lg-12">
											<button
												data-bs-target="#payment-form"
												data-bs-toggle="modal"
												data-bs-dismiss="modal"
												type="button"
												className="site-button"
												// href="/checkout"
											>
												Select Withdrawal Method
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-5">
						<div className="">
							<h5>Last Withdrawals</h5>
							<p>Transaction id</p>
							<p>Employer Id</p>
							<p>Date</p>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			<div
				className="modal fade twm-saved-jobs-view"
				id="payment-form"
				tabIndex={-1}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form onSubmit={"handleAddEducation"}>
							<div className="modal-header">
								<h2 className="modal-title">Checkout Form</h2>
								<p>Add your preferred payment method</p>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>

							<div className="modal-body">
								<div className="row">
									{/* <CheckoutPage /> */}

									<ul className="d-flex flex-column gap-2">
										<li>
											<Link href={"/"}>Direct Bank Transfer</Link>
										</li>
										<li>
											<Link href={"/"}>PayStack Payment</Link>
										</li>
										<li>
											<Link to={"/"}>Stripe Payment</Link>
										</li>
									</ul>
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="site-button"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="button" className="site-button">
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Wallet






	
		/* <div className="modal-body">
								<div className="row">
									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>First Name</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="First Name"
													name="firstName"
												/>
												<i className="fs-input-icon fa fa-address-card" />
											</div>
										</div>
									</div>

									

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Last Name</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder=""
													name="lastName"
												/>
												
											</div>
										</div>
									</div>

								

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Email</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder=""
													name="email"
												/>
											
											</div>
										</div>
									</div>

									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>LinkedIn URL</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													type="text"
													placeholder="Enter Url"
													name="linkedin_Url"
												/>
												{/* <i className="fs-input-icon fa fa-globe-americas" /> 
											</div>
										</div>
									</div>
									{/*Start Date
									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Client</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control"
													// data-provide="datepicker"
													name="client_title"
													type="text"
													placeholder=""
												/>
												{/* <i className="fs-input-icon far fa-calendar" /> 
											</div>
										</div>
									</div>
									{/*End Date*
									<div className="col-xl-12 col-lg-12">
										<div className="form-group">
											<label>Project Type</label>
											<div className="ls-inputicon-box">
												<input
													className="form-control "
													// data-provide="datepicker"
													name="project_type"
													type="text"
													placeholder=""
												/>
												
											</div>
										</div>
									</div>
									
									<div className="col-md-12">
										<div className="form-group mb-0">
											<label>Description</label>
											<textarea
												className="form-control"
												rows={3}
												placeholder="Type Description"
												// defaultValue={""}
											/>
										</div>
									</div>
								</div>
                          </div> */
	
                          