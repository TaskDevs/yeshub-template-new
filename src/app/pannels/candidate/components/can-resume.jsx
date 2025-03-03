import { useEffect } from "react";
import SectionCanAccomplishments from "../sections/resume/section-can-accomplishments";
import SectionCanAttachment from "../sections/resume/section-can-attachment";
import SectionCanEducation from "../sections/resume/section-can-education";
import SectionCanKeySkills from "../sections/resume/section-can-keyskills";
import SectionCanProjects from "../sections/resume/section-can-projects";
import SectionCanResumeHeadline from "../sections/resume/section-can-resume-headline";
import { loadScript } from "../../../../globals/constants";
import SectionCanWorkSample from "../sections/resume/section-can-work-sample";


function CanMyResumePage() {
	
    
    useEffect(()=>{
        loadScript("js/custom.js")
    })

    return (
			<>
				<div className="twm-right-section-panel site-bg-gray">
					{/*Resume Headline*/}
					<div className="panel panel-default mb-3">
						<SectionCanResumeHeadline />
					</div>
					{/*Key Skills*/}
					<div className="panel panel-default mb-3">
						<SectionCanWorkSample />
					</div>
					{/*Employment*/}
					<div className="panel panel-default mb-3">
						{/* <SectionCanEmployment /> */}
						<SectionCanKeySkills />
					</div>
					{/*Education*/}
					<div className="panel panel-default mb-3">
						<SectionCanEducation />
					</div>
					{/*IT Skills*/}
					<div className="panel panel-default mb-3">
						{/* <SectionCanITSkills /> */}
					</div>
					{/*Project*/}
					<div className="panel panel-default mb-3">
						<SectionCanProjects />
					</div>
					{/*Desired Career Profile*/}
					<div className="panel panel-default mb-3">
						{/* <SectionCanDesiredProfile /> */}
					</div>
					{/*Personal Details*/}
					<div className="panel panel-default mb-3">
						{/* <SectionCanPersonalDetail /> */}
					</div>
					{/*Attach Resume*/}
					<div className="panel panel-default mb-3">
						<SectionCanAttachment />
					</div>
					{/*Accomplishments*/}
					<div className="panel panel-default mb-3">
						<SectionCanAccomplishments />
					</div>
					{/*Profile Summary*/}
					<div className="panel panel-default mb-3">
						{/* <SectionCanProfileSummary /> */}
					</div>
				</div>
			</>
		);
}

export default CanMyResumePage;