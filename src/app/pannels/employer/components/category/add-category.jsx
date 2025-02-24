import { useContext, useEffect, useState } from "react";
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

	const [allCategories, setAllCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const { setSelectedId } = useContext(GlobalApiData);
	const { processCategoryProfile, handleUpdateCategory, setFormData } =
		useContext(CategoryApiData);


	useEffect(() => {
		const fetchAllCategories = async () => {
			try {
				const res = await processGetAllCategory();
				const data = res.data.data;
				setAllCategories(data);

				
				if (data.length > 0 && !selectedCategory) {
					handleSelected(data[0].id);
				}
			} catch (err) {
				console.error("could not fetch categories", err);
			}
		};
		fetchAllCategories();
	}, [processGetAllCategory]);

	useEffect(() => {
		const fetchCategory = async () => {
			if (!selectedCategory?.id) return;

			try {
				const res = await processCategoryProfile(selectedCategory.id);
				const data = res.data.data;

				if (JSON.stringify(selectedCategory) !== JSON.stringify(data)) {
					setSelectedCategory(data);
				}
			} catch (error) {
				console.error("could not fetch category", error);
			}
		};
		fetchCategory();
	}, [selectedCategory?.id, processCategoryProfile]);

	const handleSelected = (id) => {
		if (selectedCategory?.id === id) return; 

		const selected = allCategories.find(cat => cat.id === id);
		setSelectedCategory(selected);
		setSelectedId(id);
	};

	const handleEditClick = () => {
		if (!selectedCategory) return;
		
		setFormData({
			category_name: selectedCategory.category_name,
			description: selectedCategory.description,
		});
	};

	const handleResetForm = () => {
		setFormData({
			category_name: "",
			description: "",
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
					onClick={() => handleResetForm()}
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
								<ul className="category-list">
									{allCategories?.map((category) => (
										<li
											key={category.id}
											className={`category-items ${
												selectedCategory?.id === category.id
													? "selected-category"
												: ""
										}`}
											onClick={() => handleSelected(category.id)}
										>
											<div className="">
												<p>{category.category_name}</p>
											</div>
										</li>
									))}
								</ul>
							</div>

							<div className="">
								<p className="cat-headings">Details</p>
								{selectedCategory && (
									<div className="sec-cat-details">
										<div className="category-desc">
											<p>{selectedCategory?.description}</p>
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
												onClick={() => handleEditClick()}
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
