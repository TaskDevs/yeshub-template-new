import { useContext, useEffect, useState } from "react";
import { EducationApiData } from "../../../../context/education/educationContextApi";
import { EDUCATIONFIELD } from "../../../../../globals/education-data";
import InputField from "../../../../common/input-field";
import TextAreaField from "../../../../common/text-area-field";

function SectionCanEducation() {

	const {
		processAddEducation,
		
		processEducationEducation,
		
		processUpdateEducation,
		processDeleteEducation,
	} = useContext(EducationApiData);

	const [educationData, setEducationData] = useState([]);

	console.log("educationData", educationData);
	
	  useEffect(() => {
			const fetchEducationData = async () => {
				const res = await processEducationEducation("id");
				console.log("get-education", res);
				const data = res.data.data;
				setEducationData(data);
			};
			fetchEducationData();
		}, [processEducationEducation]);

	const [formData, setFormData] = useState(
		EDUCATIONFIELD.fieldDetail.reduce((acc, field) => {
			acc[field.name] = "";
			return acc;
		}, {})
	);


	const handleChange = (field, data) => {
		setFormData({
			...formData,
			[field]: data,
		});
	};

	const handleSubmitEducation = async (e) => {
		e.preventDefault();
		const response = await processAddEducation({ ...formData, id: "1" });
		console.log("Education added successfully", response);

		if (response) {
			console.log("Education added successfully", response);
		} else {
			console.error("Failed to add education");
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		const response = await processUpdateEducation({ ...formData, id: "1" });
		console.log("Education added successfully", response);

		if (response) {
			console.log("Education added successfully", response);
		} else {
			console.error("Failed to add education");
		}

	}

	const handleDelete = async () => {
		const response = await processDeleteEducation({ ...formData, id: "1" });
		console.log("Education added successfully", response);
	}


    return (
			<>
				<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
					<h4 className="panel-tittle m-a0">Education</h4>
					<a
						data-bs-toggle="modal"
						href="#Education"
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
							Mention your employment details including your current and
							previous company work experience
						</p>
						<p>2004 to 2006</p>
						<p>
							<b>BCA - Bachelor of Computer Applications</b>
						</p>
						<p>2006 to 2008</p>
						<p>
							<b>MCA - Master of Computer Application</b>
						</p>
						<p>2008 to 20011</p>
						<p>
							<b>Design Communication Visual</b>
						</p>
						<p>
							<a className="site-text-primary" href="#">
								Add Doctorate/PhD
							</a>
						</p>
						<p>
							<a className="site-text-primary" href="#">
								Add Masters/Post-Graduation
							</a>
						</p>
						<p>
							<a className="site-text-primary" href="#">
								Add Graduation/Diploma
							</a>
						</p>
					</div>
				</div>
				{/*Education */}
				<div
					className="modal fade twm-saved-jobs-view"
					id="Education"
					tabIndex={-1}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<form onSubmit={handleSubmitEducation}>
								<div className="modal-header">
									<h2 className="modal-title">Education</h2>
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
												<label>University/Institute</label>
												<div className="ls-inputicon-box">
													<InputField
														field={EDUCATIONFIELD.fieldDetail[0]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													{/* <input
														name="education"
														type="text"
														required
														className="form-control"
														placeholder="University of Ghana"
														minLength={3}
														maxLength={50}
														// value={""}
														// onChange={""}
													/> */}
													<i className="fs-input-icon fas fa-book-reader" />
												</div>
											</div>
										</div>

										<div className="col-lg-12 col-xl-12">
											<div className="form-group mb-3">
												<label>Qualification</label>
												<InputField
													field={EDUCATIONFIELD.fieldDetail[1]}
													value={formData}
													change={(data, field) => {
														handleChange(data, field);
													}}
												/>
											</div>
										</div>

										<div className="col-xl-12 col-lg-12">
											<div className="form-group">
												<label>Course</label>
												<div className="ls-inputicon-box">
													{/* <select className="wt-select-box selectpicker" data-live-search="true" title="" data-bv-field="size">
                                                    <option className="bs-title-option" value>Select Course</option>
                                                    <option>BBA- Bachelor of Business Administration</option>
                                                    <option>BFA- Bachelor of Fine Arts</option>
                                                    <option>BSW- Bachelor of Social Work</option>
                                                </select> */}
													<InputField
														field={EDUCATIONFIELD.fieldDetail[2]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon fa fa-book" />
												</div>
											</div>
										</div>

										<div className="col-xl-12 col-lg-12">
											<div className="form-group">
												<label>Date Attended</label>
												<div className="ls-inputicon-box">
													<InputField
														field={EDUCATIONFIELD.fieldDetail[3]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon far fa-calendar" />
												</div>
											</div>
										</div>

										<div className="col-xl-12 col-lg-12">
											<div className="form-group">
												<label>Date Completed</label>
												<div className="ls-inputicon-box">
													<InputField
														field={EDUCATIONFIELD.fieldDetail[4]}
														value={formData}
														change={(data, field) => {
															handleChange(data, field);
														}}
													/>
													<i className="fs-input-icon far fa-calendar" />
												</div>
											</div>
										</div>

										<div className="col-md-12">
											<TextAreaField
												field={EDUCATIONFIELD.fieldDetail[5]}
												value={formData}
												change={handleChange}
											/>
										</div>
									</div>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="site-button outline-primary"
										data-bs-dismiss="modal"
									>
										Close
									</button>
									<button type="submit" className="site-button ">
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
export default SectionCanEducation;