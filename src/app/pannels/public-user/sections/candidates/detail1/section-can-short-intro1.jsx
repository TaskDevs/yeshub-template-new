import JobZImage from "../../../../../common/jobz-img";
import { publicUrlFor } from "../../../../../../globals/constants";

function SectionCandidateShortIntro1() {
    return (
			<>
				<div
					className="twm-candi-self-wrap overlay-wraper"
					style={{
						backgroundImage: `url(${publicUrlFor(
							"images/candidates/candidate-bg.jpg"
						)})`,
					}}
				>
					<div className="overlay-main site-bg-primary opacity-01" />
					<div className="twm-candi-self-info">
						<div className="twm-candi-self-top">
							<div className="twm-candi-fee">₵20 / Day</div>
							<div className="twm-media can-banner-logo">
								<JobZImage src="images/candidates/pic2.jpg" alt="#" />
							</div>
							<div className="twm-mid-content">
								<h4 className="twm-job-title">Wanda Montgomery </h4>
								<p>Senior UI / UX Designer and Developer at Google INC</p>
								<p className="twm-candidate-address">
									<i className="feather-map-pin" />
									Ghana
								</p>
							</div>
						</div>
						<div className="twm-candi-self-bottom">
							<a
								// href="#contract_up_popup"
								className="site-button outline-white"
								// className="twm-nav-sign-up"
								data-bs-toggle="modal"
								href="#contract_up_popup"
								role="button"
							>
								Hire Me Now
							</a>

							{/* <button
								className="twm-backto-login"
								data-bs-target="#sign_up_popup"
								data-bs-toggle="modal"
								data-bs-dismiss="modal"
							>
								Hire Me Now
							</button> */}
							{/* <a href="#" className="site-button secondry">Download CV</a> */}
						</div>
					</div>
				</div>
			</>
		);
}

export default SectionCandidateShortIntro1;