import Header1 from "../app/common/header/header1";
import CandidateRoutes from "../routing/candidate-routes";
import SignUpPopup from "../app/common/popups/popup-signup";
import SignInPopup from "../app/common/popups/popup-signin";
import CanSidebarSection from "../app/pannels/candidate/sections/common/can-sidebar";
import InnerPageBanner from "../app/common/inner-page-banner";
import Footer1 from "../app/common/footer/footer1";
import { setBanner } from "../globals/banner-data";
import { useLocation } from "react-router-dom";
import { getHeaderConfig, setFooterType, showFooter } from "../globals/layout-config";
import YesNoPopup from "../app/common/popups/popup-yes-no";
import { popupType } from "../globals/constants";
import { useContext } from "react";
import { EducationApiData } from "../app/context/education/educationContextApi";
// import SectionReviews from "../app/pannels/public-user/sections/common/section-reviews";

function CandidateLayout() {
	const currentpath = useLocation().pathname;

	

    return (
			<>
				<div className="page-wraper">
					<Header1 _config={getHeaderConfig(currentpath)} />

					<div className="page-content">
						{/* <InnerPageBanner _data={setBanner(currentpath)} /> */}

						<div className="section-full p-t120  p-b90 site-bg-white">
							<div className="container">
								<div className="row">
									<div className="col-xl-3 col-lg-4 col-md-12 rightSidebar m-b30">
										<div className="side-bar-st-1">
											<CanSidebarSection />
										</div>
									</div>
									<div className="col-xl-9 col-lg-8 col-md-12 m-b30">
										<CandidateRoutes />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Footer */}
					{/* <Footer1 /> */}
					{/* {showFooter(currentpath) && setFooterType(currentpath)} */}

					{/* BUTTON TOP START */}
					<button className="scroltop">
						<span className="fa fa-angle-up  relative" id="btn-vibrate" />
					</button>

					<SignUpPopup />
					<SignInPopup />
					<YesNoPopup
						id="delete-dash-profile"
						type={popupType.DELETE}
						msg={"Do you want to delete your profile?"}
					/>
					<YesNoPopup
						id="logout-dash-profile"
						type={popupType.LOGOUT}
						msg={"Do you want to Logout your profile?"}
					/>
					<YesNoPopup
						id="delete-education"
						type={popupType.DELETE_EDUCATION}
						msg={"Are you sure you want to delete your education?"}
					/>
				</div>
			</>
		);
}

export default CandidateLayout;
