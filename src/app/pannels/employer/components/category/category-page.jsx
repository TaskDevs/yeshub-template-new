import AddCategories from "./add-category";
import CategoryDetails from "./category-details";


function CategoryPage() {
	return (
		<>
			<div className="wt-admin-right-page-header clearfix">
				<h2> Job Category</h2>
				<div className="breadcrumbs">
					<a href="/">Home</a>

					<span>Job Category</span>
				</div>
			</div>

			<div className="twm-right-section-panel site-bg-gray">
				{/*Add category*/}
				<div className="panel panel-default mb-3">
					<AddCategories />
				</div>
				{/* get categories list  */}
				{/* <div className="panel panel-default mb-3">
					<CategoryDetails />
				</div> */}
				{/* get each category details */}
				<div className="panel panel-default mb-3"></div>
			</div>
		</>
	);
}

export default CategoryPage;
