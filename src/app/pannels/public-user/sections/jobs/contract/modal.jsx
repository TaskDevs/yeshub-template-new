import React from "react";

function Modal() {
	return (
		<div
			// className="modal fade twm-sign-up"
			// id="contract_up_popup"
			// aria-hidden="true"
			// aria-labelledby="sign_up_popupLabel"
			// tabIndex={-1}
			className="modal fade twm-sign-up"
			// id="sign_up_popup"
			id="contract_up_popup"
			aria-hidden="true"
			aria-labelledby="sign_up_popupLabel"
			tabIndex={-1}
		>
			<div className="modal-dialog-centered modal-dialog">
				<div className="modal-content">
					<form>
						<div className="modal-header">
							<h2 className="modal-title" id="sign_up_popupLabel">
								New Contract
							</h2>

							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>

						<div className="modal-body">
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

								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item" role="presentation">
										<button
											// className={`nav-link ${
											// 	formData.role === "1" ? "active" : ""
											// }`}
											data-bs-toggle="tab"
											type="button"
											// onClick={() =>
											// 	setFormData((prevFormData) => ({
											// 		...prevFormData,
											// 		role: "1",
											// 	}))
											// }
										>
											<i className="fas fa-user-tie" />
											Hourly
										</button>
									</li>

									<li className="nav-item" role="presentation">
										<button
											// className={`nav-link ${
											// 	formData.role === "1" ? "active" : ""
											// }`}
											data-bs-toggle="tab"
											type="button"
											// onClick={() =>
											// 	setFormData((prevFormData) => ({
											// 		...prevFormData,
											// 		role: "1",
											// 	}))
											// }
										>
											<i className="fas fa-user-tie" />
											Fixed price
										</button>
									</li>
								</ul>

								<div className="">
									<h2>contract amount</h2>

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

						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Cancel
							</button>
							<button type="button" className="btn btn-primary">
								Save changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Modal;
