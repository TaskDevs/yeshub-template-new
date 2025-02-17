import AddSkills from "./add-skills";
import SkillsDetails from "./skills-details";

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
				{/*Add category*/}
				<div className="panel panel-default mb-3">
					<AddSkills />
				</div>
				{/* get categories list  */}
				<div className="panel panel-default mb-3">
					<SkillsDetails />
				</div>
				{/* get each category details */}
				<div className="panel panel-default mb-3"></div>
			</div>
		</>
	);
}

export default SkillsPage;
