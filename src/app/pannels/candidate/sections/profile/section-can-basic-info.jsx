import { useState } from "react";

function SectionCandicateBasicInfo() {
  // id,skills_id   yet to be added
  const [formData, setFormData] = useState({});

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
  };

  return (
		<>
			<form>
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
										<input
											className="form-control"
											name="firstname"
											type="text"
											placeholder="David"
											value={formData.firstname}
											onChange={handleChange}
										/>
										<i className="fs-input-icon fa fa-user " />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group">
									<label>Last Name</label>
									<div className="ls-inputicon-box">
										<input
											className="form-control"
											name="lastname"
											type="text"
											placeholder=" Smith"
											value={formData.lastname}
											onChange={handleChange}
										/>
										<i className="fs-input-icon fa fa-user " />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group">
									<label>Phone</label>
									<div className="ls-inputicon-box">
										<input
											className="form-control"
											name="telephone"
											type="text"
											placeholder="(+233) 554-456-789"
											value={formData.telephone}
											onChange={handleChange}
										/>
										<i className="fs-input-icon fa fa-phone-alt" />
									</div>
								</div>
							</div>
							{/* <div className="col-xl-6 col-lg-6 col-md-12">
									<div className="form-group">
										<label>Email Address</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_Email"
												type="email"
												placeholder="Devid@example.com"
											/>
											<i className="fs-input-icon fas fa-at" />
										</div>
									</div>
                            </div> */}

							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>Experience</label>
									<div className="ls-inputicon-box">
										<input
											className="form-control"
											name="experience"
											type="text"
											placeholder="05 Years"
											value={formData.experience}
											onChange={handleChange}
										/>
										<i className="fs-input-icon fa fa-user-edit" />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group">
									<label>Address</label>
									<div className="ls-inputicon-box">
										<input
											className="form-control"
											name="address"
											type="text"
											placeholder="till street"
											value={formData.address}
											onChange={handleChange}
										/>
										<i className="fs-input-icon fa fa-globe-americas" />
									</div>
								</div>
							</div>

							<div className="col-xl-6 col-lg-6 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>Country</label>
									<div className="ls-inputicon-box">
										<input
											className="form-control"
											name="country"
											type="text"
											placeholder="Ghana"
											value={formData.country}
											onChange={handleChange}
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
										<input
											className="form-control"
											name="region"
											type="text"
											placeholder="Greater Region"
											value={formData.region}
											onChange={handleChange}
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
										<input
											className="form-control"
											name="gps_address"
											type="text"
											placeholder="GA1826363"
											value={formData.gps_address}
											onChange={handleChange}
										/>
										<i className="fs-input-icon fas fa-map-pin" />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-12 col-md-12">
								<div className="form-group city-outer-bx has-feedback">
									<label>Postal Code</label>
									<div className="ls-inputicon-box">
										<input
											className="form-control"
											name="postal_code"
											type="text"
											placeholder="GT 560 AB0252"
											value={formData.postal_code}
											onChange={handleChange}
										/>
										<i className="fs-input-icon fas fa-map-marker-alt" />
									</div>
								</div>
							</div>

							<div className="col-xl-6 col-lg-12 col-md-12">
								<div className="form-group">
									<label>Skills</label>
									<div className="ls-inputicon-box">
										<input
											className="form-control"
											name="skills_id"
											type="text"
											placeholder="123"
										/>
										{/* <i className="fs-input-icon fa fa-map-pin" /> */}
									</div>
								</div>
							</div>

							<div className="col-md-12">
								<div className="form-group">
									<label>Experience</label>
									<textarea
										className="form-control"
										rows={3}
										value={formData.experience}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group">
									<label>Bio</label>
									<textarea
										className="form-control"
										rows={3}
										value={formData.bio}
										onChange={handleChange}
									/>
								</div>
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
