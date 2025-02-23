import { useContext, useState, useEffect } from "react";
import JobInputField from "../../../../common/job-input-field";
import { COMPANYPROFILEDATA } from "../../../../../globals/company-profile-data";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal } from "bootstrap"; // Import Bootstrap's modal API
import TextAreaField from "../../../../common/text-area-field";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";

function SectionEditCompanyInfo({ data, submit, id }) {
  const { processUpdateEmployer } = useContext(EmployerApiData);

  //

  const [formData, setFormData] = useState({});

  useEffect(() => {
    //setFormData(weData);
    if (data) {
      setFormData(data);
    }
    //console.log(data);
  }, []);

  const handleInputChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleSubmit = () => {
    //console.log(formData);
    processUpdateEmployer(formData.id, formData);

    // Close modal
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    // Manually remove the modal backdrop & reset body scrolling
    setTimeout(() => {
      document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        backdrop.remove();
      });

      document.body.classList.remove("modal-open"); // Remove Bootstrap modal class
      document.body.style.overflow = "auto"; // Restore scrolling
      document.body.style.paddingRight = ""; // Reset padding if changed
    }, 300);
  };

  return (
    <>
      <div className="modal fade twm-saved-jobs-view" id={id} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={submit}>
              <div className="modal-header">
                <h2 className="modal-title">Edit Company Informations</h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <JobInputField
                      field={COMPANYPROFILEDATA.fieldDetail[0]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                    <JobInputField
                      field={COMPANYPROFILEDATA.fieldDetail[2]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <JobInputField
                      field={COMPANYPROFILEDATA.fieldDetail[1]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                    <JobInputField
                      field={COMPANYPROFILEDATA.fieldDetail[3]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <JobInputField
                      field={COMPANYPROFILEDATA.fieldDetail[5]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                    <JobInputField
                      field={COMPANYPROFILEDATA.fieldDetail[4]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <JobInputField
                      field={COMPANYPROFILEDATA.fieldDetail[6]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <TextAreaField
                      field={COMPANYPROFILEDATA.fieldDetail[7]}
                      value={formData}
                      change={(data, field) => {
                        handleInputChange(data, field);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="site-button outline-primary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="site-button"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionEditCompanyInfo;
