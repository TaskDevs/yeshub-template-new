import React from "react";
import SectionCandidateShortIntro1 from "./detail1/section-can-short-intro1";
import SectionCandidateSkills from "./section-can-skills";

function CandidatePortfolioPage() {
	const handleSubmitPortfolio = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="container">
				<div className="wt-bnr-inr overlay-wraper bg-center">
					<SectionCandidateShortIntro1 />
					{/* <div className="overlay-main site-bg-white opacity-01" /> */}
				</div>
			</div>
			{/* p-t120 p-b90 */}
			<div className="section-full  site-bg-white">
				<div className="container">
					<div className="row">
						<h3 className="twm-s-title">Portfolio</h3>
						<p className="fs-5">
							A showcase of projects and creations, reflecting skills,
							creativity, and problem-solving abilities. Explore a collection of
							work that demonstrates expertise and innovation.
						</p>
						<div className="">
							<SectionCandidateSkills />
						</div>
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
											<input
												type="text"
												placeholder="Add link"
												className="img-portfolio-link"
											/>

											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input
												type="text"
												placeholder="Add link"
												className="img-portfolio-link"
											/>
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input
												type="text"
												placeholder="Add link"
												className="img-portfolio-link"
											/>
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input
												type="text"
												placeholder="Add link"
												className="img-portfolio-link"
											/>
											{/* <p className="img-portfolio-desc">Description </p> */}
										</div>

										<div className="">
											<div className="img-portfolio-details port-page">
												<img
													src="/assets/images/portfolio/homepage.png"
													alt=""
												/>
											</div>

											<input
												type="text"
												placeholder="Add link"
												className="img-portfolio-link"
											/>
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
