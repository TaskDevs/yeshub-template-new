import React from 'react'

function SectionJobTerms() {
  return (
		<div>
			<div className="">
				<h4 className="twm-s-title">Terms</h4>
			</div>
			<form >
				<div className="">
					<p className="twm-s-title-text">How do you want to be paid?</p>
					<div className="">
						<div className="twm-pay-terms">
							<div className="">
								<input type="radio" className="terms-radio" />
							</div>

							<div className="twm-terms-one">
								<p>By milestone</p>
								<p>
									Split the project into more manageable parts, known as
									milestones. Following completion and approval of each
									milestone, you will be compensated.
								</p>
							</div>
						</div>

						<div className="twm-pay-terms">
							<div className="">
								<input type="radio" />
							</div>
							<div className="twm-terms-one">
								<p>By project</p>
								<p>
									Receive your full money after all of the work has been
									completed.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="twm-sec-main">
					<p className="twm-s-title-text">
						How many milestones do you want to include?
					</p>

					<div className="twm-sec-timelines">
						<div className="twm-timelines">
							<label htmlFor="desc">Description</label>
							<input type="text" className=" form-control" />
						</div>
						<div className="twm-timelines">
							<label htmlFor="date"> Due date</label>
							<input type="date" className=" form-control" />
						</div>
						<div className="twm-timelines">
							<label htmlFor="amount">Amount</label>
							<input
								type="number"
								placeholder="₵0.00"
								className="form-control"
							/>
						</div>
					</div>
				</div>


				<div className="twm-terms-one">
					<p className="twm-s-title-text">How long will this project take?</p>
					<select
						name=""
						id=""
						value="Select a duration"
						placeholder="Select a duration"
						className="twm-select-duration form-control"
					>
						<option value="">more than 8 months</option>
						<option value="">3 to 6 months</option>
						<option value="">1 to 3 months</option>
						<option value="">less than 1 month</option>
					</select>
				</div>
			</form>
		</div>
	);
}

export default SectionJobTerms



	
		/* <div className="">
					<div className="twm-timelines">
						<label htmlFor="date"> Due date</label>
						<input type="date" />
					</div>

					<div className="twm-timelines">
						<label htmlFor="amount">Amount</label>
						<input type="number" placeholder="₵0.00" />
					</div>
				</div>

				<div className="">
					<div className="">
						<p>total price of a project</p>
						<p>
							this includes all milestones, and is the amount your client will
							see
						</p>
					</div>

					<div className="">
						<input type="number" placeholder="₵0.00" />
					</div>
				</div> */
	