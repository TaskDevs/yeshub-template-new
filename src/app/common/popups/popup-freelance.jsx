

// contract_popup

import { useContext } from "react";
import { FREELANCERFIELD } from "../../../globals/freelancer-data";
import InputField from "../input-field";
import TextAreaField from "../text-area-field";
import { FreelanceApiData } from "../../context/freelance/freelanceContextApi";

function FreelancePopup({ submit, id }) {
	const {formData, setFormData } = useContext(FreelanceApiData)



	const handleChange = (data, field) => {
        setFormData({
            ...formData,
            [data]: field,
        });
    };

    return (
        <div
            className="modal fade twm-sign-up"
            id={id}
            aria-hidden="true"
            aria-labelledby="sign_up_popupLabel"
            tabIndex={-1}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={submit}>
                        <div className="modal-header">
                            <h4 className="modal-title" id="">
                                Create A Freelance Profile
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
                                                <div className="twm-tabs-style-2">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3">
                                                            <label>Rate</label>
                                                            <InputField
                                                                field={FREELANCERFIELD.fieldDetail[0]}
                                                                value={formData}
                                                                change={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <TextAreaField
                                                            field={FREELANCERFIELD.fieldDetail[1]}
                                                            value={formData}
                                                            change={handleChange}
                                                        />
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
                                                                className="site-button"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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


export default FreelancePopup;