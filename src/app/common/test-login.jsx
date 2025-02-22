/* <ul className="p-a20 category">
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




styles

.section-panel {
  display: grid;
  grid-template-columns: 150px 1fr ; 
  align-items: start;
  width: 100%;
  cursor: pointer;
  padding: 10px;
  transition: background 0.3s ease;
  gap: 2rem;
  text-transform: capitalize;  
}

.sec-cat-details{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.section-panel:hover, .section-panel-skills:hover {
  background: #d6d6d6;
}

.category-list {
  display: flex;
} 

.cat-lists {
  font-weight: bold;
  
  width: 100%;
}


.section-panel div:nth-child(2) {
  flex-grow: 1;
  font-weight: 400; 
  width: 100%
}

.section-panel .actions {
  display: flex;
  gap: 8px;
  width: 100%;
  min-width: 100px; 
  justify-content: flex-end;
  visibility: hidden;    
 
}

.section-panel.show-actions .actions {
  visibility: visible; 
}

.sec-actions-btn {
  /* background: red; 
  display: flex;
  gap: 0.5rem;
  width: 100%;
} */

//   <ul className="p-a20 category">
// 		{allcategories?.map((category) => (
// 			<li key={category.id} className="">
// 				{/* <div
// 					onClick={() => handleClicked(category.id)}
// 					className={`section-panel ${
// 						showDetailsId === category.id ? "show-actions" : ""
// 					}`}
// 				> */}
// 					<div className="cat-lists">
// 						<p>{category.category_name}</p>
// 					</div>

// 					<div className="sec-cat-details">
// 						<div>
// 							<p>{category?.description}</p>
// 						</div>

// 						<div className="actions">
// 							<button
// 								className="site-button button-sm cat-btns"
// 								data-bs-target="#delete-category"
// 								data-bs-toggle="modal"
// 							>
// 								<FaRegTrashCan color="white" />
// 							</button>

// 							<button
// 								className="site-button button-sm cat-btns"
// 								data-bs-target="#edit-category"
// 								data-bs-toggle="modal"
// 								onClick={() => handleEditClick(category.id)}
// 							>
// 								<MdOutlineEdit color="white" />
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</li>
// 		))}
// 	</ul>;
