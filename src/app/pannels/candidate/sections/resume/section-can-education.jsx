import { useContext, useEffect, useState } from "react";
import { EducationApiData } from "../../../../context/education/educationContextApi";
import { EDUCATIONFIELD } from "../../../../../globals/education-data";
import InputField from "../../../../common/input-field";
import TextAreaField from "../../../../common/text-area-field";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import SectionEducationForm from "./section-education-form";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { userId } from "../../../../../globals/dummy-users";

function SectionCanEducation() {
	const {	
		processEducationEducation,
		handleAddEducation,
		handleUpdateEducation,
		initialFormData,
		setFormData
	} = useContext(EducationApiData);

	const { selectedId, setSelectedId, handleClicked } =
		useContext(GlobalApiData);


	const [educationData, setEducationData] = useState([]);

	console.log("educationData", educationData);
	//map the education data to the various fields and add the selectedId if the education is selected 

	useEffect(() => {
		const fetchEducationData = async () => {
			try {
				const res = await processEducationEducation(userId);
				console.log("get-education", res);
				const data = res.data.data;
				setEducationData(data);
			 } catch (err) {
				console.error("Failed to get education", err);
			}
			
		};
		fetchEducationData();
	}, [processEducationEducation]);

	// const handleEditClick = (id) => {
	// 	setSelectedId(id);
	// 	const educationToEdit = educationData.find((e) => {
	// 		e.id === id;
	// 		return e.id;
	// 	});
	// 	console.log("educationToEdit", educationToEdit);
	// 	educationToEdit === selectedId &&
	// 		educationData.map((e) =>
	// 			setFormData({
	// 				school: e.school,
	// 				qualification: e.qualification,
	// 				area_of_study: e.area_of_study,
	// 				date_attended: e.date_attended,
	// 				date_completed: e.date_completed,
	// 				description: e.description,
	// 			})
	// 		);
		
	// }




	const handleEditClick = (id) => {
		setSelectedId(id);
		const educationToEdit = educationData.find((e) => e.id === id);

		console.log("educationToEdit", educationToEdit);
		if (educationToEdit) {
			setFormData({
				school: educationToEdit.school,
				qualification: educationToEdit.qualification,
				area_of_study: educationToEdit.area_of_study,
				date_attended: educationToEdit.date_attended,
				date_completed: educationToEdit.date_completed,
				description: educationToEdit.description,
			});
		}
	};


	const handleResetForm = () => {
		setFormData(initialFormData);
	}

	

	// const handleSubmitEducation = async (e) => {
	// 	e.preventDefault();
	// 	try { 
	// 		const response = await processAddEducation({ ...formData, id: "1" });
	// 		console.log("Education added successfully", response);

	// 		if (response) {
	// 			console.log("Education added successfully", response);
	// 		} else {
	// 			console.error("Failed to add education");
	// 		}
	// 	} catch (err) {
	// 		console.error("failed to add education", err)
	// 	}
	// };

	// const handleUpdate = async (e) => {
	// 	e.preventDefault();

	// 	try { 
	// 		const response = await processUpdateEducation({ ...formData, id: "1" });
	// 		console.log("Education updated successfully", response);

	// 	} catch (err) {
	// 		console.error("Failed to update education")
	// 	}
	// };

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
					onClick={handleResetForm}
				>
					<span className="fa fa-edit" />
				</a>
			</div>
			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					{educationData.length === 0 ? (
						<p>Add your education profile.</p>
					) : (
						educationData.map((education, i) => (
							<div key={i} className="mb-4">
								<div className="">
									school : <span>{education.school} </span>
								</div>
								<div className="">
									Area of study : <span>{education.area_of_study} </span>
								</div>
								<div className="">
									qualification : <span>{education.qualification} </span>
								</div>
								<div className="">
									date attended : <span>{education.date_attended} </span>
								</div>
								<div className="">
									date completed : <span>{education.date_completed} </span>
								</div>
								<div className="">
									description : <span>{education.description} </span>
								</div>

								<div className="p-a20">
									<div className="actions">
										<button
											className="site-button  actions"
											data-bs-target="#delete-education"
											data-bs-toggle="modal"
											data-bs-dismiss="modal"
										>
											<FaRegTrashCan color="white" />
											<span className="admin-nav-text">Delete</span>
										</button>

										<button
											className="site-button  actions "
											data-bs-target="#Edit-Education"
											data-bs-toggle="modal"
											data-bs-dismiss="modal"
											onClick={() => {
												console.log("edit-sch-id", education.id);
												
												handleEditClick(education.id);
											}}
										>
											<MdOutlineEdit color="white" />
											<span>Edit</span>
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>

			<SectionEducationForm submit={handleAddEducation} id="Education" />
			<SectionEducationForm
				submit={handleUpdateEducation}
				id="Edit-Education"
			/>
		</>
	);
}
export default SectionCanEducation;






	/*Education Form*/


	/* <div
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
													/> 
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
                                                </select> 
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
				</div> */


