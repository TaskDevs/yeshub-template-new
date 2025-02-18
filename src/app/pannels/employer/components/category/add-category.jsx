import { useCallback, useContext, useEffect, useState } from "react";
import { CategoryApiData } from "../../../../context/category/categoryContextApi";
import CategoryForm from "./category-form";
import { GlobalApiData } from "../../../../context/global/globalContextApi";

function AddCategories() {
	const { processGetAllCategory, handleAddCategory } =
		useContext(CategoryApiData);

	const { handleClicked,  } =
		useContext(GlobalApiData);

	const [allcategories, setAllCategories] = useState([]);

	

	console.log("allcategories", allcategories);

	useEffect(() => {
		const fetchAllCategories = async () => {
			try {
				const res = await processGetAllCategory();
				console.log("all-categories", res);

				const data = res.data.data;
				setAllCategories(data);
			} catch (err) {
				console.error("could not fetch categories", err);
			}
		};
		fetchAllCategories();
	}, [processGetAllCategory]);

	


	return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">Categories</h4>
				<a
					data-bs-toggle="modal"
					href="#Category"
					role="button"
					title="Edit"
					className="site-text-primary"
				>
					<span className="fa fa-edit" />
				</a>
			</div>
			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					{allcategories.length === 0 && <p> No categories created.</p>}
					<ul>
						
						{allcategories?.map((category) => (
							<li key={category.id} className="category">
								<div className="" onClick={() => handleClicked(category.id)}>
									<p>{category.category_name}</p>
								</div>

								{/* <div className="actions">
									<div className="delete">DELETE</div>
									<div className="edit">EDIT</div>
								</div> */}
							</li>
						))}
					</ul>
				</div>
			</div>

			<CategoryForm submit={handleAddCategory} id="Category" />
		</>
	);
}

export default AddCategories;
