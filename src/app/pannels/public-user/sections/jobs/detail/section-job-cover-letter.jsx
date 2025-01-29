import React from 'react'

function SectionJobCoverLetter() {
  return (
		<div lassName="">
			<div className="">
				<div className="">
					<h4 className="twm-s-title">Cover letter</h4>
					<div className="twm-sec-text-area">
						<textarea name="" id="" className="twm-text-area"></textarea>
					</div>
				</div>
				<div className="">
					<h4 className="twm-s-title">Profile Highlights</h4>
					<p className="twm-s-title-text">
						Emphasise the most relevant data from your profile to highlight your
						abilities and experience. Up to four highlights are possible.
					</p>

					<div className="twm-pay-terms image-upload">
						<div className="twm-sec-add">
							<label htmlFor="project">Add portfolio project</label>
							<input type="file" name="project" accept="image/*" />
							{/* <button type="submit">Add Portfolio projects</button> */}
						</div>

						<div className="twm-sec-add">
							<label htmlFor="cert">Add a certificate</label>
							<input name="cert" type="file" accept="image/*" />
							{/* <button type="submit">Add a Certificate</button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SectionJobCoverLetter