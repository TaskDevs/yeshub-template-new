import SectionLocation from "./section-location";
import SectionProfile from "./section-profile";
import SectionVerification from "./section-verification";

function SectionEmployersCandidateSidebar({ type }) {
    return (
			<>
				<div className="side-bar-2">
					{type === "1" ? (
						<>
							{/* <div className="twm-s-map mb-5">
                                <SectionLocation />
                            </div> */}
							<div className="twm-s-info-wrap mb-5">
								<SectionProfile />
							</div>
						</>
					) : (
						<>
							<div className="twm-s-map mb-5">
								<SectionProfile />
							</div>
							<div className="twm-s-info-wrap mb-5">
								<SectionLocation />
							</div>
						</>
					)}
					<div className="twm-s-contact-wrap mb-5">
						{/* <SectionContact /> */}
						<SectionVerification />
					</div>
				</div>
			</>
		);
}

export default SectionEmployersCandidateSidebar;