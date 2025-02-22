import AddSkills from "./add-skills";


function SkillsPage() {
	return (
		<>
			<div className="wt-admin-right-page-header clearfix">
				<h2> Skills </h2>
				<div className="breadcrumbs">
					<a href="/">Home</a>

					<span>Skills</span>
				</div>
			</div>

			<div className="twm-right-section-panel site-bg-gray">
				
				<div className="panel panel-default mb-3">
					{/* <div className="section-panel"></div> */}
					<AddSkills />
					
				</div>

				{/* <div className="panel panel-default mb-3">
					<SkillsDetails />
				</div> */}

				<div className="panel panel-default mb-3"></div>
			</div>
		</>
	);
}

export default SkillsPage;
