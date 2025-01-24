import React from 'react'
import { NavLink } from 'react-router-dom';

function CandidatePortfolioPage() {
	return (
		<>
			<div className="section-full p-t120  p-b90 site-bg-white">
				<div className="container">
					<div className="row">
						<h3 className="twm-s-title">Portfolio</h3>
						<div className="tw-sidebar-tags-wrap">
							<div className="sec-add-portfolio ">
								<div className="sub-sec-add-portfolio-container">
									<NavLink className="" to="#">
										<div className="img-portfolio-details port-page">
											<img src="/assets/images/portfolio/homepage.png" alt="" />
										</div>

										<p className="img-portfolio-desc">Description </p>
									</NavLink>

									<NavLink className="" to="#">
										<div className="img-portfolio-details port-page">
											<img src="/assets/images/portfolio/homepage.png" alt="" />
										</div>

										<p className="img-portfolio-desc">Description </p>
									</NavLink>

									<NavLink className="" to="#">
										<div className="img-portfolio-details port-page">
											<img src="/assets/images/portfolio/homepage.png" alt="" />
										</div>

										<p className="img-portfolio-desc">Description </p>
									</NavLink>
									<NavLink className="" to="#">
										<div className="img-portfolio-details port-page">
											<img src="/assets/images/portfolio/homepage.png" alt="" />
										</div>

										<p className="img-portfolio-desc">Description </p>
									</NavLink>
									<NavLink className="port-item" to="#">
										<div className="img-portfolio-details port-page">
											<img src="/assets/images/portfolio/homepage.png" alt="" />
										</div>

										<p className="img-portfolio-desc">Description </p>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CandidatePortfolioPage;