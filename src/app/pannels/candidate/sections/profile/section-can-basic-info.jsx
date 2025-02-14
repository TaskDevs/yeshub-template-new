import { useContext, useState } from "react";
import InputField from "../../../../common/input-field";
import { USERPROFILEFIELD } from "../../../../../globals/user-profile-data";
import TextAreaField from "../../../../common/text-area-field";
import SelectField from "../../../../common/select-field";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";

const skills = [
	{ id: 1, name: "HTML" },
	{ id: 2, name: "CSS" },
	{ id: 3, name: "JavaScript" },
	{ id: 4, name: "React" },
];

// processSearchProfile,
// 	processUpdateProfile,
// 	processDeleteProfile,
//processGetAllProfile

function SectionCandicateBasicInfo() {
	

	const [formData, setFormData] = useState(
		USERPROFILEFIELD.fieldDetail.reduce((acc, field) => {
			acc[field.name] = "";
			return acc;
		}, {})
	);
	console.log("formData", { ...formData, id: "1" });

	const { processAddProfile } = useContext(ProfileApiData);

	const handleChange = (field, data) => {
		setFormData({
			...formData,
			[field]: data,
		});
	};

	const handleSubmitProfile = async (e) => {
		e.preventDefault();
		const response = await processAddProfile({ ...formData, id: "1" });
		console.log("Profile added successfully", response);

		if (response) {
			console.log("Profile added successfully", response);
		} else {
			console.error("Failed to add profile");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmitProfile}>
				<div className="panel panel-default">
					<div className="panel-heading wt-panel-heading p-a20">
						<h4 className="panel-tittle m-a0">Basic Informations</h4>
					</div>
					<div className="panel-body wt-panel-body p-a20 m-b30 ">
						<div className="row">
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group">
									<label>First Name</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[0]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
										<i className="fs-input-icon fa fa-user " />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group">
									<label>Last Name</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[1]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>

										<i className="fs-input-icon fa fa-user " />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group">
									<label>Phone</label>
									<div className="ls-inputicon-box">
										{/* <input
											className="form-control"
											name="telephone"
											type="text"
											placeholder="(+233) 554-456-789"
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/> */}
										<InputField
											field={USERPROFILEFIELD.fieldDetail[2]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
										<i className="fs-input-icon fa fa-phone-alt" />
									</div>
								</div>
							</div>

							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>Experience</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[3]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>

										<i className="fs-input-icon fa fa-user-edit" />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group">
									<label>Address</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[4]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
										<i className="fs-input-icon fa fa-globe-americas" />
									</div>
								</div>
							</div>

							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>Country</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[5]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
										<i className="fs-input-icon fa fa-globe-americas" />
									</div>
								</div>
							</div>
							{/* 
								<div className="col-xl-4 col-lg-6 col-md-12">
									<div className="form-group city-outer-bx has-feedback">
										<label>Region</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="region"
												type="text"
												placeholder="Greater Region"
											/>
											<i className="fs-input-icon fa fa-globe-americas" />
										</div>
									</div>
                            </div> */}

							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>Region</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[6]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
										<i className="fs-input-icon fa fa-globe-americas" />
									</div>
								</div>
							</div>

							{/* <div className="col-xl-4 col-lg-12 col-md-12">
									<div className="form-group city-outer-bx has-feedback">
										<label>GPS Address</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_since"
												type="text"
												placeholder="GA1826363"
											/>
											<i className="fs-input-icon fas fa-map-pin" />
										</div>
									</div>
								</div> */}
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>GPS Address</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[7]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
										<i className="fs-input-icon fas fa-map-pin" />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-12 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>Postal Code</label>
									<div className="ls-inputicon-box">
										<InputField
											field={USERPROFILEFIELD.fieldDetail[8]}
											value={formData}
											change={(data, field) => {
												handleChange(data, field);
											}}
										/>
										<i className="fs-input-icon fas fa-map-marker-alt" />
									</div>
								</div>
							</div>

							<div className="col-xl-6 col-lg-12 col-md-12">
								{/* <div className="form-group">
									<label>Skills</label>

									<div className="ls-inputicon-box">
										<select
											className="wt-select-box selectpicker form-control"
											data-live-search="true"
											id="j-category"
											data-bv-field="size"
											name="skill_id"
											value={formData.skill_id}
											onChange={handleChange}
										>
											<option className="bs-title-option" value>
												Select Skills
											</option>
											{/* {skills.map((s, i) => (
												<option key={i} value={s.id}>
													{s.skill}
												</option>
											))} *
											<option value={"s.id"}>html</option>
											<option value={"s.id"}>css</option>
											<option value={"s.id"}>js</option>
										</select>
									</div>
								</div> */}

								<SelectField
									field={USERPROFILEFIELD.fieldDetail[9]}
									value={formData}
									options={skills}
									change={handleChange}
								/>
							</div>

							<div className="col-md-12">
								<TextAreaField
									field={USERPROFILEFIELD.fieldDetail[10]}
									value={formData}
									change={handleChange}
								/>
							</div>

							<div className="col-lg-12 col-md-12">
								<div className="text-left">
									<button type="submit" className="site-button">
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default SectionCandicateBasicInfo;
