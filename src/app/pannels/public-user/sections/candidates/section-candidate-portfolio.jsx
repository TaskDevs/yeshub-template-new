import React from 'react'
// import { DropzoneComponent } from 'react-dropzone-component';

function SectionCandidatePortfolio() {

	// useEffect(() => {
	// 		loadScript("js/custom.js");
	// 	});
	
		// var componentConfig = {
		// 	postUrl: "upload.php",
		// };
	



    return (
			<>
				<h4 className="twm-s-title">Portfolio</h4>
				<div className="tw-sidebar-tags-wrap">
					<div className="sec-add-portfolio">
						<div className="sub-sec-add-portfolio">
							{/* <div className="col-lg-12 col-md-12">
								{/* <div className="form-group">
									<DropzoneComponent config={componentConfig} />
								</div> */}

								{/* section-portfolio *
								<div className="">
									<div className="img-portfolio-details port-page">
										<img src="/assets/images/portfolio/homepage.png" alt="" />
									</div>

									<input
										type="text"
										placeholder="Add link"
										className="img-portfolio-link"
									/>
									{/* <p className="img-portfolio-desc">Description </p> *
								</div>
					</div> */}
					


					<div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>
								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
								
							</div>
							<div className="">
								<div className="img-portfolio-details">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>

								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
							</div>
							<div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>

								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
							</div>
							<div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>
								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
								
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