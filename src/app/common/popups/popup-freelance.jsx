// contract_popup

import { useContext } from "react";
import { FREELANCERFIELD } from "../../../globals/freelancer-data";
// import InputField from "../input-field";
// import TextAreaField from "../text-area-field";
import { FreelanceApiData } from "../../context/freelance/freelanceContextApi";
import { PortfolioApiData } from "../../context/portfolio/portfolioContextApi";
import Select from "react-select";
import NewInputField from "../new-input-field";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function FreelancePopup({ submit, id }) {
  const { formData, setFormData, selectedItems, setSelectedItems } =
    useContext(FreelanceApiData);
  const { portfolios } = useContext(PortfolioApiData);

  // console.log("portfolios-freelancer", portfolios)

  const formattedPortfolios =
    portfolios?.map((portfolio) => ({
      value: portfolio.id,
      label: portfolio.project_title,
    })) || [];

  const handleSelectChange = (selectedOptions) => {
    setSelectedItems(selectedOptions);

    const selectedPortfoliosIds = selectedOptions
      ? selectedOptions.map((item) => item.value)
      : [];
    setFormData({
      ...formData,
      portfolio_id: selectedPortfoliosIds.join(","),
    });
  };

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
                          {/* <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <label>Rate</label>
                              <InputField
                                field={FREELANCERFIELD.fieldDetail[0]}
                                value={formData}
                                change={handleChange}
                              />
                            </div>
                          </div> */}

                          <div className="col-lg-12 ">
                    <div className="p-field p-mb-3">
                      <label
                        htmlFor={FREELANCERFIELD.fieldDetail[0].name}
                        className="p-text-secondary p-d-block p-mb-2 p-font-bold"
                      >
                        Rate
                      </label>
                      <div className="ls-inputicon-box">
                        {/* <div className="">
                          <i className="fs-input-icon fas fa-map-marker-alt" />
                        </div> */}
                        <NewInputField
                          field={FREELANCERFIELD.fieldDetail[0]}
                          value={formData}
                          change={(data, field) => {
                            handleChange(data, field);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                          <div className=" col-lg-12 col-md-12">
                            <div className="ls-inputicon-box ">
                              <div className="form-group">
                                <label>Portfolio</label>
                                {/* selectpicker wt-select-box  form-control */}
                                <div className="p-inputtext p-p-2 p-border-round new-input-field new-form-control">
                                  <Select
                                    isMulti={true}
                                    options={formattedPortfolios}
                                    value={selectedItems}
                                    onChange={(data) =>
                                      handleSelectChange(data)
                                    }
                                    styles={{
                                      control: (base) => ({
                                        ...base,
                                        border: 0,
                                        boxShadow: "none", // Disables the blue border
                                        backgroundColor: "none",
                                      }),
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-md-12">
                            <TextAreaField
                              field={FREELANCERFIELD.fieldDetail[1]}
                              value={formData}
                              change={handleChange}
                            />
                          </div> */}

                          <div className="col-md-12">
                <p  className="p-text-secondary p-d-block p-mb-2 p-font-bold">Description</p>
                <ReactQuill
                  theme="snow"
                  value={formData[FREELANCERFIELD.fieldDetail[1].name] || ""}
                  onChange={(content) =>
                    handleChange(FREELANCERFIELD.fieldDetail[1].name, content)
                  }
                  style={{ height: "200px" }}
                  className="mb-5 pb-5"
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
