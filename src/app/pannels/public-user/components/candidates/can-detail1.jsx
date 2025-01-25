import SectionCandidateShortIntro1 from "../../sections/candidates/detail1/section-can-short-intro1";
import SectionCandidateAbout1 from "../../sections/candidates/detail1/section-can-about1";
import SectionCandidateSkills from "../../sections/candidates/section-can-skills";
import SectionCandidateExperience from "../../sections/candidates/section-can-experience";
import SectionCandidateEducation from "../../sections/candidates/section-can-education";
import { useEffect } from "react";
import { loadScript, publicUrlFor } from "../../../../../globals/constants";
import SectionEmployersCandidateSidebar from "../../sections/common/section-emp-can-sidebar";
import SectionCandidatePortfolio from "../../sections/candidates/section-candidate-portfolio";
import SectionReview from "../../sections/common/section-review";

function CandidateDetail1Page() {

    useEffect(()=>{
        loadScript("js/custom.js")
    })

    // <InnerPageBanner _data={setBanner(currentpath)} />

    return (
			<>
				<div className="container">
					<div
						className="wt-bnr-inr overlay-wraper bg-center"
						// className="twm-candi-self-wrap overlay-wraper"
						// style={{
						// 	backgroundImage: `url(${publicUrlFor(
						// 		"images/candidates/candidate-bg.jpg"
						// 	)})`,
						// }}
					>
						<SectionCandidateShortIntro1 />
						<div className="overlay-main site-bg-white opacity-01" />
					</div>
				</div>

				<div className="section-full p-t10 p-b90 bg-white">
					<div className="container">
						{/* BLOG SECTION START */}
						<div className="section-content">
							<div className="row d-flex justify-content-center">
								<div className="col-lg-8 col-md-12">
									{/* Candidate detail START */}
									<div className="cabdidate-de-info">
										{/* <SectionCandidateShortIntro1 /> */}

										<SectionCandidateAbout1 />

										<SectionCandidateSkills />

										<SectionCandidatePortfolio />
										<SectionReview />
										

										{/* <SectionCandidateExperience /> */}

										{/* <SectionCandidateEducation /> */}
									</div>
								</div>

								{/* <div className="col-lg-4 col-md-12 rightSidebar">
                                
                            </div> */}
								<div className=" col-lg-4 rightSidebar">
									<SectionEmployersCandidateSidebar type="1" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
}

export default CandidateDetail1Page;