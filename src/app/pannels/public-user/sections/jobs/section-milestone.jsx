import { useContext } from "react";
import { MilestoneContext } from "../../../../context/candidates/MilestoneContext";

function SectionMilestone() {
	const context = useContext(MilestoneContext)

	if (!context) { 
		throw new Error("Context not found")
	}

	const { handleChange, ...initialData } = context; 


		
		



	return (
		<div className="twm-sec-timelines">
			<div className="twm-timelines">
				<label htmlFor="desc">Description</label>
				<input
					type="text"
					className=" form-control milestone-options"
					required
					name="description"
					value={initialData.description}
					onChange={handleChange}
				/>
			</div>
			<div className="twm-timelines">
				<label htmlFor="date"> Due date</label>
				<input
					type="date"
					className=" form-control milestone-options"
					required
					name="date"
					value={initialData.date}
					onChange={handleChange}
				/>
			</div>
			<div className="twm-timelines">
				<label htmlFor="amount">Amount</label>
				<input
					type="number"
					placeholder="₵0.00"
					className="form-control milestone-options"
					required
					name="amount"
					value={initialData.amount}
					onChange={handleChange}
				/>
			</div>
		</div>
		// </div>
	);
}

export default SectionMilestone;
