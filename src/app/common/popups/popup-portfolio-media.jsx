import React, { useContext } from "react";
import { PortfolioApiData } from "../../context/portfolio/portfolioContextApi";
import { PortfolioMediaApiData } from "../../context/portfolio-media/portfolioMediaContextApi";
import Select from "react-select";


function PopupPortfolioMedia({ submit, id }) {
  const { portfolios } = useContext(PortfolioApiData);
  const { formData, setFormData, selectedItems, setSelectedItems } = useContext(
    PortfolioMediaApiData
  );

  // console.log("portfolios-freelancer", portfolios)

  const formattedPortfolios =
    portfolios?.map((portfolio) => ({
      value: portfolio.id,
      label: portfolio.project_title,
    })) || [];

  

  const handleSelectChange = (selectedOption) => {
    setSelectedItems(selectedOption); // Set the single selected item

    // Check if selectedOption is not null
    if (selectedOption) {
        setFormData({
            ...formData,
            portfolio_id: selectedOption.value, // Directly use the value of the selected option
        });
    } else {
        // Handle the case where no option is selected
        setFormData({
            ...formData,
            portfolio_id: "", // Clear the portfolio_id if nothing is selected
        });
    }
};

  const handleChange = (name, e) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  

  return (
    <div className="modal fade twm-saved-jobs-view" id={id} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={submit}>
            <div className="modal-header">
              <h2 className="modal-title">Add Project</h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className=" col-lg-12 col-md-12">
                  <div className="ls-inputicon-box ">
                    <div className="form-group">
                      <label>Portfolio</label>
                      {/* selectpicker wt-select-box  form-control */}
                      <div className="form-control">
                        <Select
                          isMulti={false}
                          options={formattedPortfolios}
                          value={selectedItems}
                          onChange={(data) => handleSelectChange(data)}
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

                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Project Link</label>
                    <div className="ls-inputicon-box">
                      {/* <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Project Link"
                      /> */}
                      <input
                        name="url"
                        type="text"
                        minLength={3}
                        maxLength={50}
                        required
                        className="form-control"
                        placeholder="Enter Project Link"
                        value={formData.url}
                        onChange={(e) => handleChange("url", e)}
                        // {(data, field) => {
                        //     handleChange(data, field);
                        //   }}
                      />
                      <i className="fs-input-icon fa fa-address-card" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="site-button"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="site-button" data-bs-dismiss="modal">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupPortfolioMedia;

// <div className="col-xl-12 col-lg-12">
// <div className="form-group">
//     <label>Education</label>
//     <div className="ls-inputicon-box">
//         <select className="wt-select-box selectpicker" data-live-search="true" title="" data-bv-field="size">
//             <option className="bs-title-option" value>Select Category</option>
//             <option>Graduation/Diploma</option>
//             <option>Masters/Post-Graduation</option>
//         </select>
//         <i className="fs-input-icon fa fa-user-graduate" />
//     </div>
// </div>
// </div>
// <div className="col-xl-12 col-lg-12">
// <div className="form-group">
//     <label>Client</label>
//     <div className="ls-inputicon-box">
//         <input className="form-control" type="text" placeholder="Enter Client Name" />
//         <i className="fs-input-icon fa fa-user" />
//     </div>
// </div>
// </div>
// <div className="col-xl-12 col-lg-12">
// <div className="form-group">
//     <label>Project Status</label>
//     <div className="row twm-form-radio-inline">
//         <div className="col-md-6">
//             <input className="form-check-input" type="radio" name="flexRadioDefault" id="In_Progress" />
//             <label className="form-check-label" htmlFor="In_Progress">
//                 In Progress
//             </label>
//         </div>
//         <div className="col-md-6">
//             <input className="form-check-input" type="radio" name="flexRadioDefault" id="Finished" defaultChecked />
//             <label className="form-check-label" htmlFor="Finished">
//                 Finished
//             </label>
//         </div>
//     </div>
// </div>
// </div>

// <div className="col-md-6">
// <div className="form-group">
//     <label>Started Working From</label>
//     <div className="ls-inputicon-box">
//         <input className="form-control datepicker" data-provide="datepicker" name="company_since" type="text" placeholder="mm/dd/yyyy" />
//         <i className="fs-input-icon far fa-calendar" />
//     </div>
// </div>
// </div>

// <div className="col-md-6">
// <div className="form-group">
//     <label>Worked Till</label>
//     <div className="ls-inputicon-box">
//         <input className="form-control datepicker" data-provide="datepicker" name="company_since" type="text" placeholder="mm/dd/yyyy" />
//         <i className="fs-input-icon far fa-calendar" />
//     </div>
// </div>
// </div>
// <div className="col-md-12">
// <div className="form-group mb-0">
//     <label>Detail of Projects</label>
//     <textarea className="form-control" rows={3} placeholder="Describe your Job" defaultValue={""} />
// </div>
// </div>
