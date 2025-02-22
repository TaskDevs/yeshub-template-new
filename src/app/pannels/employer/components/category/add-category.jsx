import {  useContext, useEffect, useState } from "react";
import { CategoryApiData } from "../../../../context/category/categoryContextApi";
import CategoryForm from "./category-form";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import YesNoPopup from "../../../../common/popups/popup-yes-no";
import { popupType } from "../../../../../globals/constants";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

function  AddCategories() {
	const { processGetAllCategory, handleAddCategory } =
		useContext(CategoryApiData);

	const { handleClicked } = useContext(GlobalApiData);
		

	const [allCategories, setAllCategories] = useState([]);
	const [category, setCategory] = useState({});
	// const { showCategoryDetailsId } = useContext(GlobalApiData);
	const { processCategoryProfile, handleUpdateCategory, setFormData } =
		useContext(CategoryApiData);
    const [showCategoryDetailsId, setShowCategoryDetailsId] = useState("1")


	useEffect(() => {
		const fetchCategory = async () => {
			if (!showCategoryDetailsId) {
				return;
			}
			try {
				const res = await processCategoryProfile(showCategoryDetailsId);

				console.log("category", res);
				const data = res.data.data;
				setCategory(data);
			} catch (error) {
				console.error("could not fetch category", error);
			}
		};
		fetchCategory();
	}, [showCategoryDetailsId, processCategoryProfile]);

	

	console.log("allcategories", allCategories);

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

	const handleEditClick = () => {
		setFormData({
			category_name: category.category_name,
			description: category.description,
		});
	};

	


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
					{allCategories.length === 0 ? (
						<p>No categories created</p>
					) : (
						<div className="section-panel">
							<div>
								<p className="cat-headings">List</p>
								<ul className=" category-list">
									{allCategories?.map((category) => (
										<li
											key={category.id}
											className="category-items"
											onClick={() => setShowCategoryDetailsId(category.id)}
										>
											<div className="">
												{console.log("category-name", category.category_name)}
												<p>{category.category_name}</p>
											</div>
										</li>
									))}
								</ul>
							</div>

							<div className="">
								<p className="cat-headings">Details</p>

								{showCategoryDetailsId === category.id && (
									<div className="sec-cat-details">
										<div className="category-desc">
											<p>{category?.description}</p>
										</div>

										<div className="actions">
											<button
												className="site-button button-sm "
												data-bs-target="#delete-category"
												data-bs-toggle="modal"
											>
												<FaRegTrashCan color="white" />
											</button>

											<button
												className="site-button button-sm "
												data-bs-target="#edit-category"
												data-bs-toggle="modal"
												onClick={() => handleEditClick(category.id)}
											>
												<MdOutlineEdit color="white" />
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			<CategoryForm submit={handleAddCategory} id="Category" />
			<YesNoPopup
				id="delete-category"
				type={popupType.DELETE_CATEGORY}
				msg={"Are you sure you want to delete this category?"}
			/>

			<CategoryForm submit={handleUpdateCategory} id="edit-category" />
		</>
	);
}

export default AddCategories;
