import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../../../../context/auth/UserContext";

function SectionCandicateBasicInfo() {
	// id,skills_id   yet to be added

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState("");

	const [showTopMessage, setShowTopMessage] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const { user } = useUser();

	const initialFormData = {
		id: "",
		user_id: "",
		skills_id: "",
		firstname: "",
		lastname: "",
		telephone: "",
		bio: "",
		experience: "",
		job_category_id: "",
		country: "",
		region: "",
		address: "",
        postal_code: "",
        gps_address: "",
       
	};

	const [formData, setFormData] = useState(initialFormData);
	const postProfileUrl = `${process.env.REACT_APP_BASE_URL}`;

	const postSuccess = () => toast("Job posted successfully!");
	const postError = () => toast("Error!, Failed to post job!");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmitProfile = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		setTimeout(() => {
			setLoading(true);
		}, 200);

		try {
			const res = axios.post(postProfileUrl, formData);
			postSuccess();

			console.log("post-job", res);

			const jobsData = res.data;
			setFormData(jobsData);
		} catch (error) {
			postError();
			setError(error || "An error occurred, try again");
			setShowTopMessage(true);
			// setTimeout(() => {}, 1000);
		} finally {
			setError("");
			setSuccess("");
			setFormData(initialFormData);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
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
							{/* <div className="col-xl-6 col-lg-6 col-md-12">
									<div className="form-group">
										<label>Qualification</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_since"
												type="text"
												placeholder="BTech"
											/>
											<i className="fs-input-icon fa fa-user-graduate" />
										</div>
									</div>
								</div> */}
							{/* <div className="col-xl-6 col-lg-6 col-md-12">
									<div className="form-group">
										<label>Language</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_since"
												type="text"
												placeholder="e.x English, Spanish"
											/>
											<i className="fs-input-icon fa fa-language" />
										</div>
									</div>
								</div> */}
							{/* <div className="col-xl-6 col-lg-6 col-md-12">
									<div className="form-group city-outer-bx has-feedback">
										<label>Job Category</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_since"
												type="text"
												placeholder="IT & Software"
											/>
											<i className="fs-input-icon fa fa-border-all" />
										</div>
									</div>
								</div> */}

							{/* <div className="col-xl-4 col-lg-6 col-md-12">
									<div className="form-group city-outer-bx has-feedback">
										<label>Current Salary</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_since"
												type="text"
												placeholder="65K"
											/>
											<i className="fs-input-icon fa fa-dollar-sign" />
										</div>
									</div>
								</div> */}
							{/* <div className="col-xl-4 col-lg-6 col-md-12">
									<div className="form-group city-outer-bx has-feedback">
										<label>Expected Salary</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_since"
												type="text"
												placeholder="75K"
											/>
											<i className="fs-input-icon fa fa-dollar-sign" />
										</div>
									</div>
								</div> */}
							{/* <div className="col-xl-4 col-lg-12 col-md-12">
									<div className="form-group city-outer-bx has-feedback">
										<label>Age</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="company_since"
												type="text"
												placeholder="35 Years"
											/>
											<i className="fs-input-icon fa fa-child" />
										</div>
									</div>
								</div>  */}
							{/* col-xl-4 col-lg-6 col-md-12 */}
							{/* <div className="col-xl-4 col-lg-6 col-md-12">
									<div className="form-group city-outer-bx has-feedback">
										<label>Country</label>
										<div className="ls-inputicon-box">
											<input
												className="form-control"
												name="country"
												type="text"
												placeholder="Ghana"
											/>
											<i className="fs-input-icon fa fa-globe-americas" />
										</div>
									</div>
								</div> */}

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
							<div className="col-xl-12 col-lg-12 col-md-12">
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
							<div className="col-md-12">
								<div className="form-group">
									<label>Bio</label>
									<textarea
										className="form-control"
										rows={3}
										defaultValue={
											"Greetings! when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
										}
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
