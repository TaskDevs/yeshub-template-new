import React, { useState } from "react";
// import SearchSelectField from "../../../../common/search-select-field";
import SortSelectField from "../../../../common/sort-select-field";
import { SEARCHFORMFIELD } from "../../../../../globals/search-form-data";

function SectionRecordsFilter({ _config, processDataActionControls }) {
  const [formData] = useState({});
  const jobTypeArray = [
    "All",
    "Freelance",
    "Full Time",
    "Internship",
    "Part Time",
    "Temporary",
  ];

  const noToshow = ["10", "2", "4", "6", "8"];

  const handleSortByJobType = (data, field) => {
    console.log(`the field is ${field} and the data is ${data}`);

    if (data !== "All") {
      let filteredData = processDataActionControls[1].filter(
        (item) => item.job_type == data
      );
      processDataActionControls[0](filteredData);
    } else {
      processDataActionControls[0](processDataActionControls[1]);
    }
  };

  const handleShowBasedOnNumber = (data, field) => {
    console.log(`the field is ${field} and the data is ${data}`);
    let number = data.match(/\d+/)[0];
    let expData = processDataActionControls[1];
    let filteredData = expData.slice(0, number);
    processDataActionControls[0](filteredData);
  };

  return (
    <>
      <div className="product-filter-wrap d-flex justify-content-between align-items-center m-b30">
        <span className="woocommerce-result-count-left">
          {_config.prefix}
          {_config.showRange ? " 1-" + _config.showingUpto + " of " : " "}
          {_config.total + " " + _config.type}
        </span>
        <form className="woocommerce-ordering twm-filter-select" method="get">
          <span className="woocommerce-result-count">Short By</span>
          <SortSelectField
            field={SEARCHFORMFIELD.fieldDetail[0]}
            value={formData}
            options={jobTypeArray}
            change={(data, field) => {
              handleSortByJobType(field, data);
            }}
          />
          {/* <SearchSelectField
            field={SEARCHFORMFIELD.fieldDetail[0]}
            value={formData}
            use={"forPagination"}
            options={jobTypeArray}
            change={(data, field) => {
              handleFilter(field, data);
            }}
          /> */}

          <SortSelectField
            field={SEARCHFORMFIELD.fieldDetail[0]}
            value={formData}
            use={"show"}
            options={noToshow}
            change={(data, field) => {
              handleShowBasedOnNumber(field, data);
            }}
          />
        </form>
      </div>
    </>
  );
}

export default SectionRecordsFilter;
