import { useState, useEffect } from "react";

const JobMultiSelectField = ({ field, value, options, change }) => {
  // Ensure the value is always an array (to handle multiple selections)
  const [selectedValues, setSelectedValues] = useState(value[field.name] || []);

  useEffect(() => {
    setSelectedValues(value[field.name] || []);
  }, [value, field.name]);

  const handleInputChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(selectedOptions);
    change(selectedOptions, field.name);
  };

  return (
    <div className="form-group">
      <label>{field.label}</label>
      <div className="ls-inputicon-box">
        <select
          className="wt-select-box selectpicker form-control"
          data-live-search="true"
          id={field.id}
          name={field.name}
          multiple // Enables multi-selection
          value={selectedValues}
          onChange={handleInputChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {field.icon && <i className={field.icon} />}
      </div>
    </div>
  );
};

export default JobMultiSelectField;
