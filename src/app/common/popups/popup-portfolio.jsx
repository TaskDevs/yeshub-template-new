import { useContext } from "react";
import { PORTFOLIOFIELD } from "../../../globals/portfolio-data";
import InputField from "../input-field";
import TextAreaField from "../text-area-field";
import { PortfolioApiData } from "../../context/portfolio/portfolioContextApi";



export const PortfolioPopup = ({ submit, id }) => {

    const { formData, handleChange } = useContext(PortfolioApiData)

    return (
			<div className="">
				<div className="modal fade twm-saved-jobs-view" id={id} tabIndex={-1}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<form onSubmit={submit}>
								<div className="modal-header">
									<h2 className="modal-title">Work Sample/ Portfolio</h2>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									/>
								</div>
								<div className="modal-body">
									<div className="row">
										<div className="col-xl-12 col-lg-12">
											<div className="form-group">
												<label>Work Title</label>
												<div className="ls-inputicon-box">
													{/* <input
														className="form-control"
														type="text"
														placeholder="Enter Work Title"
														name="project_title"
													/> */}
													<InputField
														field={PORTFOLIOFIELD.fieldDetail[0]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon fa fa-address-card" />
												</div>
											</div>
										</div>

										{/* project-role */}

										<div className="col-xl-12 col-lg-12">
											<div className="form-group">
												<label>Role</label>
												<div className="ls-inputicon-box">
													{/* <input
														className="form-control"
														type="text"
														placeholder="Enter Work Title"
														name="project_title"
													/> */}
													<InputField
														field={PORTFOLIOFIELD.fieldDetail[1]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon fa fa-address-card" />
												</div>
											</div>
										</div>

										{/* skills */}

										<div className="col-xl-12 col-lg-12">
											<div className="form-group">
												<label>Skills</label>
												<div className="ls-inputicon-box">
													{/* <input
														className="form-control"
														type="text"
														placeholder="list your skills"
														name="skills"
													/> */}
													<InputField
														field={PORTFOLIOFIELD.fieldDetail[2]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon fa fa-address-card" />
												</div>
											</div>
										</div>

										{/* <div className="col-xl-12 col-lg-12">
													<div className="form-group">
														<label>URL</label>
														<div className="ls-inputicon-box">
															<input
																className="form-control"
																type="text"
																placeholder="Enter Url"
															/>
															<i className="fs-input-icon fa fa-globe-americas" />
														</div>
													</div>
												</div> */}
										{/*Start Date*/}
										<div className="col-md-6">
											<div className="form-group">
												<label>Duration From</label>
												<div className="ls-inputicon-box">
													<InputField
														field={PORTFOLIOFIELD.fieldDetail[3]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon far fa-calendar" />
												</div>
											</div>
										</div>
										{/*End Date*/}
										<div className="col-md-6">
											<div className="form-group">
												<label>Duration to</label>
												<div className="ls-inputicon-box">
													<InputField
														field={PORTFOLIOFIELD.fieldDetail[4]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon far fa-calendar" />
												</div>
											</div>
										</div>
										{/* <div className="col-xl-12 col-lg-12">
											<div className="form-group">
												<input
													className="form-check-input"
													type="checkbox"
													name="flexRadioDefault"
													id="Working_on"
													defaultChecked
												/>
												<label
													className="form-check-label"
													htmlFor="Working_on"
												>
													I am currently working on this
												</label>
											</div>
										</div> */}
										<div className="col-md-12">
											<TextAreaField
												field={PORTFOLIOFIELD.fieldDetail[5]}
												value={formData}
												change={handleChange}
											/>
										</div>
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
									<button
										type="submit"
										data-bs-dismiss="modal"
										className="site-button"
									>
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
}