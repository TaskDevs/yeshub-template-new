import React from 'react'

function SectionCandidatePortfolio() {
    return (
			<>
				<h4 className="twm-s-title">Portfolio</h4>
				<div className="tw-sidebar-tags-wrap">
					<div className="sec-add-portfolio">
						<div className="sub-sec-add-portfolio">
							<div className="">
								<div className="img-portfolio-details">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>

								<p className="img-portfolio-link">Link: </p>
							</div>
							<div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>

								<p className="img-portfolio-link">Link: </p>
							</div>
							<div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>

								<p className="img-portfolio-link">Link: </p>
							</div>
						</div>
					</div>
					{/* twm-candi-self-bottom */}
					<div className="btn-show-more">
						<a href="/can-portfolio" className="site-button ">
							Show more
						</a>
						{/* <a href="#" className="site-button secondry">Download CV</a> */}
					</div>
				</div>
			</>
		);
}

export default SectionCandidatePortfolio;