import { useEffect } from "react";
import SectionCanResumeHeadline from "../sections/resume/section-can-resume-headline";
import { loadScript } from "../../../../globals/constants";
import SectionReviews from "../../public-user/sections/common/section-reviews";

export function CanReviewsPage() {
    
    useEffect(()=>{
        loadScript("js/custom.js")
    })

    return (
			<>
				<div className="twm-right-section-panel site-bg-gray">
					<div className="panel panel-default mb-3">
						<SectionReviews
							receiver="employer"
							criterio1="Clarity of Instructions"
							criterio2="Promptness in Payment"
							criterio3=""
						/>
					</div>
				</div>
			</>
		);
        }



        export function EmpReviewsPage() {
					useEffect(() => {
						loadScript("js/custom.js");
					});

					return (
						<>
							<div className="twm-right-section-panel site-bg-gray">
								<div className="panel panel-default mb-3">
									<SectionReviews
										receiver="candidate"
										criterio1="Quality of Work"
										criterio2="Timeliness"
										criterio3="Communication"
									/>
								</div>
							</div>
						</>
					);
				}

