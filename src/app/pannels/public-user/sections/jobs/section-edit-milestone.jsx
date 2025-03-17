import React, { useContext, useEffect } from "react";
// import SectionMilestone from "./section-milestone";
import { MILESTONEFIELD } from "../../../../../globals/milestone-data";
import { MilestoneApiData } from "../../../../context/milestone/milestoneContextApi";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import toast from "react-hot-toast";



function SectionEditMilestone({  data, milestone, setMilestone }) {
    const {  processUpdateMilestone, fetchMilestones } = useContext(MilestoneApiData);
    const { setIsSubmitting, setIsLoading } = useContext(GlobalApiData)
   
    
    // console.log("data-edit-mile", data)
    // console.log("milestone-edit-mile", milestone)

   

    useEffect(() => {
      if(data) {
          setMilestone({
            title: data?.title,
            amount: data?.amount,
            description: data?.description,
            freelance_id: data?.freelance_id,
            employer_status: data?.employer_status,
            freelancer_status: data?.freelancer_status,
            pay_status: data?.pay_status,
            job_id: data?.job_id,
            user_id: data?.user_id,
            id: data?.id
          })
      }
  },[data])

  const handleInputChange = (e, fieldDetail) => {
      setMilestone({
          ...milestone,
          [fieldDetail.name]: e.target.value,
      });
  };

  const handleUpdateMilestone = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
        setIsLoading(true);
    }, 200);

    try {
        const res = await processUpdateMilestone(milestone?.id, {
            ...milestone, 
        });

        if (res) {
          console.log("edit-milesone-res", res)
            await fetchMilestones();
            toast.success("Milestone updated successfully");
        }
    } catch (error) {
        console.error("Error updating milestone:", error);
        toast.error("Failed to update milestone");
    } finally {
        setIsSubmitting(false);
        setIsLoading(false);
        setMilestone({
          title: "",
          amount: "",
          description: ""
        })
    }
};



  return (

    <div
				className="modal fade twm-sign-up"
				id="edit-milestone"
				aria-hidden="true"
				aria-labelledby="sign_up_popupLabel"
				tabIndex={-1}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form onSubmit={handleUpdateMilestone} >
							<div className="modal-header">
								<h4 className="modal-title" id="">
									Edit Milestone
								</h4>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>

							<div className="modal-body">
								<div className="apl-job-inpopup">
									<div className="panel panel-default">
										<div className="panel-body wt-panel-body p-a20 ">
											<div className="tab-content" id="myTabContent">
												<div className="row">
                                                {MILESTONEFIELD.fieldDetail.slice(0,3).map((field, fieldIndex) => (
                
                <div className="twm-timelines" key={fieldIndex}>
                <label htmlFor={field.label}>{field.label}</label>
                <input
                
                name={field.name}
                type={field.type}
                minLength={field.minLength}
                maxLength={field.maxLength}
                required={field.required}
                className="p-inputtext p-p-2 p-border-round"
                placeholder={field.placeholder}
                // value={field.name === "title" ? data?.title : field.name === "amount" ? data?.amount : data?.description || ''}
                // onChange={(e) => handleInputChange(e, field)}
                value={milestone?.[field.name] || ''} // Use milestone here
                onChange={(e) => handleInputChange(e, field)}
            />
                </div>
            
            
        ))}
													
														
													</div>
												</div>
											</div>

											<div className="py-4">
												<div className="d-flex justify-end gap-3">
													<button
														type="button"
														className="site-button outline-primary"
														data-bs-dismiss="modal"
													>
														Cancel
													</button>
													<button
														type="submit"
														className="site-button "
														data-bs-dismiss="modal"
														
													>
														Save
													</button>
												</div>
											</div>
										</div>
									</div>
							</div>
							
						</form>
					</div>
				</div>
                </div>




   
  );
}

export default SectionEditMilestone;




/* <div
className="modal fade twm-sign-up"
id="edit-milestone"
aria-hidden="true"
tabIndex={-1}
>
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      />
    </div>
    <div className="modal-body">
      <h4 className="modal-title">Edit Milestone</h4>

      <div className="milestone-section">
      <div className="twm-sec-timelines">
      {MILESTONEFIELD.fieldDetail.slice(0,3).map((field, fieldIndex) => (
          
              <div className="twm-timelines" key={fieldIndex}>
              <label htmlFor={field.label}>{field.label}</label>
              <input
              
              name={field.name}
              type={field.type}
              minLength={field.minLength}
              maxLength={field.maxLength}
              required={field.required}
              // className="form-control"
              className="p-inputtext p-p-2 p-border-round"
              placeholder={field.placeholder}
              value={field.name === "title" ? data?.title : field.name === "amount" ? data?.amount : data?.description || ''}
              onChange={(e) => handleInputChange(e, field)}
          />
              </div>
          
          
      ))}
      </div>
  </div>

    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="site-button"
        data-bs-dismiss="modal"
      >
        Cancel
      </button>
      <button
        type="button"
        className="site-button outline-primary"
        data-bs-dismiss="modal"
      >
        Save
      </button>
    </div>
  </div>
</div>
</div> */










			