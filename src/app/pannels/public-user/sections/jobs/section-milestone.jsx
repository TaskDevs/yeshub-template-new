


function SectionMilestone () {


    return (
   

											<div className="twm-sec-timelines">
												<div className="twm-timelines">
													<label htmlFor="desc">Description</label>
													<input
														type="text"
					className=" form-control milestone-options"
					required
													/>
												</div>
												<div className="twm-timelines">
													<label htmlFor="date"> Due date</label>
													<input
														type="date"
														className=" form-control milestone-options"
														required
													/>
												</div>
												<div className="twm-timelines">
													<label htmlFor="amount">Amount</label>
													<input
														type="number"
														placeholder="₵0.00"
														className="form-control milestone-options"
														required
													/>
												</div>
											</div>
										// </div>
    )
}

export default SectionMilestone;