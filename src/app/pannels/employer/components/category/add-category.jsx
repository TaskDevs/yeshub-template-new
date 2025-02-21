import {  useContext, useEffect, useState } from "react";
import { CategoryApiData } from "../../../../context/category/categoryContextApi";
import CategoryForm from "./category-form";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import YesNoPopup from "../../../../common/popups/popup-yes-no";
import { popupType } from "../../../../../globals/constants";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

function AddCategories() {
	const { processGetAllCategory, handleAddCategory } =
		useContext(CategoryApiData);

	const { handleClicked,  } =
		useContext(GlobalApiData);

	const [allcategories, setAllCategories] = useState([]);
	const [category, setCategory] = useState({});
	const { showDetailsId } = useContext(GlobalApiData);
	const { processCategoryProfile, handleUpdateCategory, setFormData } =
		useContext(CategoryApiData);



	useEffect(() => {
		const fetchCategory = async () => {
			if (!showDetailsId) {
				return;
			}
			try {
				const res = await processCategoryProfile(showDetailsId);

				console.log("category", res);
				const data = res.data.data;
				setCategory(data);
			} catch (error) {
				console.error("could not fetch category", error);
			}
		};
		fetchCategory();
	}, [showDetailsId, processCategoryProfile]);

	

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
					{allcategories.length === 0 ? (
						<p>No categories created</p>
					) : (
						<ul className="p-a20 category">
							{allcategories?.map((category) => (
								<li key={category.id} className="">
									

									<div
										onClick={() => handleClicked(category.id)}
										className={`section-panel ${
											showDetailsId === category.id ? "show-actions" : ""
										}`}
									>
										<div className="cat-lists">
											<p>{category.category_name}</p>
										</div>

										<div className="sec-cat-details">
											<div>
												<p>{category?.description}</p>
											</div>

											<div className="actions">
												<button
													className="site-button button-sm cat-btns"
													data-bs-target="#delete-category"
													data-bs-toggle="modal"
												>
													<FaRegTrashCan color="white" />
												</button>

												<button
													className="site-button button-sm cat-btns"
													data-bs-target="#edit-category"
													data-bs-toggle="modal"
													onClick={() => handleEditClick(category.id)}
												>
													<MdOutlineEdit color="white" />
												</button>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
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
