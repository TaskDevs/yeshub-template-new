import axios from 'axios';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../../context/auth/UserContext';

function CandidatePortfolioPage() {

	
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const { user } = useUser();


	const initialData = {
		portfolio_id: "",
		url: ""
	}

	const [formData, setFormData] = useState(initialData);
	const url = `${process.env.REACT_APP_BASE_URL}`
	
	const handleSubmitPortfolio = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {

			const res = await axios.post(url, formData)
			console.log("portfolio", res);
			setFormData(res)
		} catch (err) {
			setError(err || "An error occurred");
		} finally { 
			setError("");
			setSuccess("");
			setFormData(initialData);
		}
		
	 }

	return (
		<>
			<div className="section-full p-t120  p-b90 site-bg-white">
				<div className="container">
					<div className="row">
						<h3 className="twm-s-title">Portfolio</h3>
						<div className="tw-sidebar-tags-wrap">
							<div className="sec-add-portfolio ">
								<form onSubmit={handleSubmitPortfolio}>
									<div className="sub-sec-add-portfolio-container">
										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input type="text" placeholder="link" />
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input type="text" placeholder="link" />
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input type="text" placeholder="link" />
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input type="text" placeholder="link" />
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input type="text" placeholder="link" />
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CandidatePortfolioPage;