import React from "react";
import { useLocation } from "react-router-dom";

// import { DropzoneComponent } from 'react-dropzone-component';

function SectionCandidatePortfolio() {
  const currentpath = useLocation().pathname;
  const location = currentpath.split("/")[1];
  console.log("currentpath", location);

  // const ref = useRef(null);
  // const fileInputRef = useRef(null);
  // const [preview, setPreview] = useState(null);

  // const handleImageChange = (event) => {
  // 	const file = event.target.files?.[0];

  // 	if (file) {
  // 		setPreview(URL.createObjectURL(file));
  // 	}
  // };

  return (
    <>
      {/* <h4 className="twm-s-title">Portfolio</h4> */}
      <h4 className="twm-s-title">Profile Highlights</h4>
      {location === "apply-job" && (
        <p className="twm-s-title-text">
          Emphasise the most relevant data from your profile to highlight your
          abilities and experience. Up to four highlights are possible.
        </p>
      )}
      <div className="tw-sidebar-tags-wrap">
        <div className="">
          <div className="mb-5">
            {/* <form ref={ref}>
							<div className="twm-sec-add">
								<input
									ref={fileInputRef}
									type="file"
									name="image"
									accept="image/*"
									hidden
									onChange={handleImageChange}
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
										<button type="button" onClick={() => setPreview(null)}>
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
									)} *
						</form> */}

            {/* show images */}

            {/* <div className="mt-5">
							<div className="sec-add-portfolio">
								<div className="sub-sec-add-portfolio">
									<div className="">
										<div className="img-portfolio">
											<img src="/assets/images/portfolio/homepage.png" alt="" />
										</div>

										<p className="img-portfolio-link">Link: </p>
										<input
											type="text"
											className="img-portfolio-link"
											placeholder="Add link"
										/>
									</div>
									<div className="">
										<div className="img-portfolio">
											<img src="/assets/images/portfolio/homepage.png" alt="" />
										</div>

										<p className="img-portfolio-link">Link: </p>
										<input
											type="text"
											className="img-portfolio-link"
											placeholder="Add link"
										/>
									</div>
								</div>
							</div>
						</div> */}
          </div>
        </div>

        {location === "can-detail" && (
          <div className="btn-show-more">
            <a href="/can-portfolio" className="site-button ">
              Show more
            </a>
            {/* <a href="#" className="site-button secondry">Download CV</a> */}
          </div>
        )}
      </div>
    </>
  );
}

export default SectionCandidatePortfolio;

/* <div className="">
								<img
									src={""}
									width={500}
									alt="Post"
									height={500}
									className="w-full mx-auto"
								/>
							</div> */

/* <div className="">
								<img src="/assets/images/portfolio/homepage.png" alt="" />
							</div>
							<div className="">
								<img src="/assets/images/portfolio/homepage.png" alt="" />
							</div>

							<input
								type="text"
								placeholder="Add link"
								className="img-portfolio-link"
							/> */

/* new app-job-pg */

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

/* flex justify-end mt-2 space-x-2 */
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
