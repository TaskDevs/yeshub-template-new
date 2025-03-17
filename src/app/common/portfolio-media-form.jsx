import React, { useContext } from "react";
// import { PortfolioMediaApiData } from '../context/portfolio-media/portfolioMediaContextApi';
import { PortfolioApiData } from "../context/portfolio/portfolioContextApi";
// import InputField from './input-field';
import { PORTFOLIOFIELD } from "../../globals/portfolio-data";
import NewInputField from "./new-input-field";

function PortfolioMediaForm() {
  const { formData, handleChange } = useContext(PortfolioApiData);

  return (
    //   <div className="col-xl-12 col-lg-12">
    //   <div className="form-group">
    //     <label>Project Link</label>
    //     <div className="ls-inputicon-box">
    //     <InputField
    //                   field={PORTFOLIOFIELD.fieldDetail[6]}
    //                   value={formData}
    //                   change={(data, field) => {
    //                       handleChange(data, field);
    //                   }}
    //                   icon="address-card"
    //               />

    //     </div>
    //   </div>
    // </div>

    <div className="col-xl-12 col-lg-12">
      <div className="p-field p-mb-3">
        <label
          htmlFor={PORTFOLIOFIELD.fieldDetail[6].name}
          className="p-text-secondary p-d-block p-mb-2 p-font-bold"
        >
          Project Link
        </label>
        <div className="ls-inputicon-box">
          <div className="">
            {/* <i className="fs-input-icon fas fa-book-reader" /> */}
            <i className="fs-input-icon fa fa-address-card" />
          </div>
          <NewInputField
            field={PORTFOLIOFIELD.fieldDetail[6]}
            value={formData}
            change={(data, field) => {
              handleChange(data, field);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PortfolioMediaForm;

{
  /* <input
          name="url"
          type="text"
          minLength={3}
          maxLength={50}
          required
          className="form-control"
          placeholder="Enter Project Link"
          value={formData.url}
          onChange={(e) => handleChange("url", e)}
          
        />
        <i className="fs-input-icon fa fa-address-card" /> */
}
