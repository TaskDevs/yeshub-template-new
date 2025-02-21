import { useContext, useEffect, useState } from "react";
import { CategoryApiData } from "../../../../context/category/categoryContextApi";
import CategoryForm from "./category-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import YesNoPopup from "../../../../common/popups/popup-yes-no";
import { popupType } from "../../../../../globals/constants";
import { GlobalApiData } from "../../../../context/global/globalContextApi";

function CategoryDetails() {

	const [category, setCategory] = useState({});
	const { showDetailsId } = useContext(GlobalApiData);
	const { processCategoryProfile, handleUpdateCategory, setFormData } =
		useContext(CategoryApiData);
		
	

	console.log("cat-single-data", !category)
	// console.log("showDetailsId", showDetailsId);

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

	const handleEditClick = () => {
		setFormData({
			category_name: category.category_name,
			description: category.description,
		});
	}
	

	return (
		<>
			<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
				<h4 className="panel-tittle m-a0">Category Details</h4>
			</div>

			<div className="panel-body wt-panel-body p-a20 ">
				<div className="twm-panel-inner">
					{!category.id ? (
						<p>No Category Selected. </p>
					)
						: (
							showDetailsId === category.id && (
						<>
							<div className="category">
								<p>{category?.category_name}</p>
							</div>

							<div className="">
								<p>{category?.description}</p>
							</div>

							<div className="actions">
								<button
									className="site-button  actions"
									data-bs-target="#delete-category"
									data-bs-toggle="modal"
									data-bs-dismiss="modal"
								>
									<FaRegTrashCan color="white" />
									<span className="admin-nav-text">Delete</span>
								</button>

								<button
									className="site-button  actions "
									data-bs-target="#edit-category"
									data-bs-toggle="modal"
											data-bs-dismiss="modal"
											onClick={() => handleEditClick()}
								>
									<MdOutlineEdit color="white" />
									<span>Edit</span>
								</button>
							</div>
						</>
					)
				)}

					
					
				</div>
			</div>

			<YesNoPopup
				id="delete-category"
				type={popupType.DELETE_CATEGORY}
				msg={"Are you sure you want to delete this category?"}
			/>

			<CategoryForm submit={handleUpdateCategory} id="edit-category" />
		</>
	);
}

export default CategoryDetails;
