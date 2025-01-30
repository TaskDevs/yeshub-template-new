import { useEffect } from "react";
import { loadScript } from "../../../globals/constants";
import SectionApplyJob from "../../pannels/public-user/sections/jobs/section-apply-job";
import JobZImage from "../jobz-img";

function ContractPopup() {
	return (
		<>
			<div
				className="modal fade twm-sign-up"
				id="contract_popup"
				aria-hidden="true"
				aria-labelledby="sign_up_popupLabel"
				tabIndex={-1}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form onSubmit={"handleSubmit"}>
							<div className="modal-header">
								<h4 className="modal-title" id="">
									Contract Agreement
								</h4>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>

							<div className="modal-body">
								<div className="apl-job-inpopup">
									<div className="panel panel-default">
										<div className="panel-body wt-panel-body p-a20 ">
											<div className="tab-content" id="myTabContent">
												<div className="row">
													{/* <div className="col-lg-12">
														<div className="form-group mb-3">
															<input
																name="username"
																type="text"
																required
																className="form-control"
																placeholder="Username*"
																minLength={3}
																maxLength={50}
																// value={formData.username}
																// onChange={handleChange}
															/>
														</div>
													</div> */}

													{/* from modal */}

													<div className="twm-tabs-style-2">
														<div className="col-lg-12">
															<div className="form-group mb-3">
																<label>Client's email address</label>
																<input
																	name="email"
																	type="text"
																	required
																	className="form-control"
																	// placeholder="email"
																	minLength={3}
																	maxLength={50}
																	value={""}
																	onChange={""}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-3">
																<label>Contract name</label>
																<input
																	name="email"
																	type="text"
																	required
																	className="form-control"
																	// placeholder="email"
																	minLength={3}
																	maxLength={50}
																	value={""}
																	onChange={""}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-3">
																<label>Client's email address</label>
																<input
																	name="email"
																	type="text"
																	required
																	className="form-control"
																	// placeholder="email"
																	minLength={3}
																	maxLength={50}
																	value={""}
																	onChange={""}
																/>
															</div>
														</div>
														<div className="col-lg-12">
															<div className="form-group mb-3">
																<label>Description</label>
																<textarea
																	name="email"
																	type="text"
																	required
																	className="form-control"
																	// placeholder="email"
																	minLength={3}
																	maxLength={50}
																	value={""}
																	onChange={""}
																/>
															</div>
														</div>

														<ul
															className="nav nav-tabs"
															id="myTab"
															role="tablist"
														>
															<li className="nav-item" role="presentation">
																<button
																	className="nav-link  active"
																	data-bs-toggle="tab"
																	type="button"
																	// onClick={() =>
																	// 	setFormData((prevFormData) => ({
																	// 		...prevFormData,
																	// 		role: "1",
																	// 	}))
																	// }
																>
																	{/* <i className="fas fa-user-tie" /> */}
																	Hourly
																</button>
															</li>

															<li className="nav-item" role="presentation">
																<button
																	// className={`nav-link ${
																	// 	formData.role === "1" ? "active" : ""
																	// }`}
																	className="nav-link "
																	data-bs-toggle="tab"
																	type="button"
																	// onClick={() =>
																	// 	setFormData((prevFormData) => ({
																	// 		...prevFormData,
																	// 		role: "1",
																	// 	}))
																	// }
																>
																	{/* <i className="fas fa-user-tie" /> */}
																	Fixed price
																</button>
															</li>
														</ul>

														<div className="pt-2">
															<h4>Contract Amount</h4>

															<div className="col-lg-12">
																<div className="form-group mb-3">
																	<label>Milestone 1</label>
																	<input
																		name="milestone"
																		type="text"
																		required
																		className="form-control"
																		placeholder="Title"
																		minLength={3}
																		maxLength={50}
																		value={""}
																		onChange={""}
																	/>
																</div>
															</div>
														</div>

														<div className="col-lg-12">
															<div className="form-group mb-3">
																<label>Amount</label>
																<input
																	name="email"
																	type="text"
																	required
																	className="form-control"
																	placeholder={0}
																	minLength={3}
																	maxLength={50}
																	value={""}
																	onChange={""}
																/>
															</div>
														</div>

														<div className="col-lg-12">
															<div className="form-group mb-3">
																<label>Due date</label>
																<input
																	name="date"
																	type="date"
																	required
																	className="form-control"
																	placeholder="Due date"
																	minLength={3}
																	maxLength={50}
																	value={""}
																	onChange={""}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div className="py-4">
												<div className="d-flex justify-end gap-3">
													<button
														type="button"
														className="site-button outline-primary"
														data-bs-dismiss="modal"
													>
														Cancel
													</button>
													<button
														type="button"
														className="site-button "
														data-bs-dismiss="modal"
														// onClick={yesHandler}
													>
														Save
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default ContractPopup;


