import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
// import { DropzoneComponent } from 'react-dropzone-component';

function SectionCandidatePortfolio() {
	const ref = useRef(null);
	const fileInputRef = useRef(null);
	const [preview, setPreview] = useState(null);

	// toast.promise({
	// 	loading: "Creating post...",
	// 	success: "Post created!",
	// 	error: "Failed to create post",
	// });

	return (
		<>
			<h4 className="twm-s-title">Portfolio</h4>
			<div className="tw-sidebar-tags-wrap">
				<div className="">
					
					<div className="mb-5">

						<form
							ref={ref}
							action={(formData) => {
								// const promise = handlePostAction(formData);
							}}
						>
							<div className="twm-sec-add">
								<input
									ref={fileInputRef}
									type="file"
									name="image"
									accept="image/*"
									hidden
									// onChange={handleImageChange}
								/>
								<div className="">
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="sec-port-add-btn"
									>
										{preview ? "Change" : "Add"} image
									</button>

									{preview && (
										<button
											variant="outline"
											type="button"
											onClick={() => setPreview(null)}
										>
											Remove image
										</button>
									)}
								</div>
							</div>

							{/* {preview && (
										<div className="mt-3">
											<img
												src={preview}
												alt="preview"
												className="w-full object-cover"
												width={10}
												height={10}
											/>
										</div>
									)} */}

							
						</form>

						{/* show images */}

					
						<div className="mt-5">
							{/* <div className="">
								<img
									src={""}
									width={500}
									alt="Post"
									height={500}
									className="w-full mx-auto"
								/>
							</div> */}
							<div className="">
								<img src="/assets/images/portfolio/homepage.png" alt="" />
							</div>

							<input
								type="text"
								placeholder="Add link"
								className="img-portfolio-link"
							/>
						</div>
					</div>
				</div>

				{/* twm-candi-self-button */}
				<div className="btn-show-more">
					<a href="/can-portfolio" className="site-button ">
						Show more
					</a>
					{/* <a href="#" className="site-button secondry">Download CV</a> */}
				</div>
			</div>
		</>
	);
}

export default SectionCandidatePortfolio;







	/* <div className="col-lg-12 col-md-12">
								{/* <div className="form-group">
									<DropzoneComponent config={componentConfig} />
								</div> */



	/* <div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>
								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
								
							</div>
							<div className="">
								<div className="img-portfolio-details">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>

								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
							</div>
							<div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>

								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
							</div>
							<div className="">
								<div className="">
									<img src="/assets/images/portfolio/homepage.png" alt="" />
								</div>
								<input
									type="text"
									placeholder="Add link"
									className="img-portfolio-link"
								/>
								
							</div>*/





{/* flex justify-end mt-2 space-x-2 */}
							// <div className="">
							// 	<button
							// 		type="button"
							// 		onClick={() => fileInputRef.current?.click()}
							// 		className="sec-port-add-btn"
							// 	>
							// 		{preview ? "Change" : "Add"} image
							// 	</button>

							// 	{/* Add a remove preview button */}

							// 	{preview && (
							// 		<button type="button" onClick={() => setPreview(null)}>
							// 			Remove image
							// 		</button>
							// 	)}
							// </div>

							// <div className="sub-sec-add-portfolio">
							// 	<div className="col-lg-12 col-md-12 tw-sidebar-tags-wrap">
							// 		<div className="form-group">
							// 			<form
							// 				ref={ref}
							// 				action={(formData) => {
							// 					// const promise = handlePostAction(formData);
							// 				}}
							// 				className="p-2 bg-white rounded-lg"
							// 			>
							// 				{/* {preview && (
							// 			<div className="mt-3">
							// 				<img
							// 					src={preview}
							// 					alt="preview"
							// 					className="w-full object-cover"
							// 					width={10}
							// 					height={10}
							// 				/>
							// 			</div>
							// 		)} */}

							// 				<div className="">
							// 					<button
							// 						type="button"
							// 						onClick={() => fileInputRef.current?.click()}
							// 						className="sec-port-add-btn"
							// 					>
							// 						{preview ? "Change" : "Add"} image
							// 					</button>

							// 					{/* Add a remove preview button */}

							// 					{preview && (
							// 						<button
							// 							variant="outline"
							// 							type="button"
							// 							onClick={() => setPreview(null)}
							// 						>
							// 							Remove image
							// 						</button>
							// 					)}
							// 				</div>

							// 				{/* show images */}

							// 				{/* {post.imageUrl && ( */}

							// 				<div className="">
							// 					<img
							// 						src={"post.imageUrl"}
							// 						width={500}
							// 						alt="Post"
							// 						height={500}
							// 						className="w-full mx-auto"
							// 					/>
							// 				</div>

							// 				{/* placeholder image */}

							// 				<div className="">
							// 					<div className="">
							// 						<img
							// 							src="/assets/images/portfolio/homepage.png"
							// 							alt=""
							// 						/>
							// 					</div>

							// 					<input
							// 						type="text"
							// 						placeholder="Add link"
							// 						className="img-portfolio-link"
							// 					/>
							// 				</div>
							// 			</form>
							// 		</div>
							// 	</div>
							// </div>
