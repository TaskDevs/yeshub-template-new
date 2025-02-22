import { useContext } from "react";
import InputField from "../../../../common/input-field";
import { MILESTONEFIELD } from "../../../../../globals/milestone-data";
import { MilestoneApiData } from "../../../../context/milestone/milestoneContextApi";

function SectionMilestone() {

	const { formData, setFormData } = useContext(MilestoneApiData)

	const handleChange = (field, data) => {
		setFormData({
			...formData,
			[field]: data,
		});
	};
	
	return (
		<div className="twm-sec-timelines">
			<div className="twm-timelines">
				<label htmlFor="desc">Description</label>
				{/* <input
					type="text"
					className=" form-control milestone-options"
					required
					name="description"
					// value={initialData.description}
					// onChange={handleChange}
				/> */}
				<InputField
					field={MILESTONEFIELD.fieldDetail[0]}
					value={formData}
					change={(data, field) => {
						handleChange(data, field);
					}}
				/>
			</div>
			<div className="twm-timelines">
				<label htmlFor="date"> Due date</label>
				{/* <input
					type="date"
					className=" form-control milestone-options"
					required
					name="date"
					// value={initialData.date}
					// onChange={handleChange}
				/> */}
				<InputField
					field={MILESTONEFIELD.fieldDetail[1]}
					value={formData}
					change={(data, field) => {
						handleChange(data, field);
					}}
				/>
			</div>
			<div className="twm-timelines">
				<label htmlFor="amount">Amount</label>
				{/* <input
					type="number"
					placeholder="₵0.00"
					className="form-control milestone-options"
					required
					name="amount"
					// value={initialData.amount}
					// onChange={handleChange}
				/> */}
				<InputField
					field={MILESTONEFIELD.fieldDetail[2]}
					value={formData}
					change={(data, field) => {
						handleChange(data, field);
					}}
				/>
			</div>
		</div>
		// </div>
	);
}

export default SectionMilestone;
