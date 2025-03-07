import { useContext } from "react";
// import InputField from "../../../../common/input-field";
import { MILESTONEFIELD } from "../../../../../globals/milestone-data";
import { MilestoneApiData } from "../../../../context/milestone/milestoneContextApi";


function SectionMilestone({ index, milestone }) {
    const { handleChange } = useContext(MilestoneApiData);

    const handleInputChange = (e, fieldDetail) => {
        handleChange(index, e.target.value, fieldDetail);
    };

    return (
        <div className="milestone-section">
			<div className="twm-sec-timelines">
            {MILESTONEFIELD.fieldDetail.map((field, fieldIndex) => (
                
					<div className="twm-timelines" key={fieldIndex}>
					<label htmlFor={field.label}>{field.label}</label>
					<input
                    
                    name={field.name}
                    type={field.type}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    required={field.required}
                    className="form-control"
                    placeholder={field.placeholder}
                    value={milestone[field.name] || ''}
                    onChange={(e) => handleInputChange(e, field)}
                />
					</div>
				
				
            ))}
			</div>
        </div>
    );
}

export default SectionMilestone;
