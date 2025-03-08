import { useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";

const JobMultiSelectField = ({ field, value, options, change }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    // Convert stored skill names back to IDs for correct display
    if (Array.isArray(value[field.name])) {
      const ids = options
        .filter(option => value[field.name].includes(option.name)) // Match names to IDs
        .map(option => option.id);
      setSelectedIds(ids);
    }
  }, [value, field.name, options]);

  const handleInputChange = (e) => {
    const selectedIds = e.value; // Selected skill IDs

    // Convert IDs to skill names for database storage
    const selectedNames = options
      .filter(option => selectedIds.includes(option.id))
      .map(option => option.name);

    setSelectedIds(selectedIds); // Maintain IDs for UI display
    change(selectedNames, field.name); // Send names to backend
  };

  return (
    <div className="p-field p-mb-3 p-pb-3">
      <label htmlFor={field.name} className="p-text-secondary p-d-block p-mb-2 p-font-bold">
        {field.label}
      </label>
      <div className="p-inputgroup p-shadow-3 p-rounded-lg">
        {field.icon && (
          <div className="p-inputgroup-addon p-d-flex p-ai-center p-jc-center p-px-3">
            <i className={field.icon} style={{ fontSize: "1.4rem", color: "#6c757d" }} />
          </div>
        )}
        <MultiSelect
          id={field.id}
          name={field.name}
          value={selectedIds} // Maintain IDs for UI selection
          options={options}
          onChange={handleInputChange}
          placeholder={field.placeholder || "Select options"}
          className="p-multiselect p-p-3 p-border-round p-shadow-1"
          optionLabel="name"
          optionValue="id"
          display="chip"
          filter
          showClear
          style={{ width: "100%", fontSize: "1rem" }}
          pt={{
            item: { style: { padding: "8px 12px" } }, // Padding for each option
          }}
        />
      </div>
    </div>
  );
};

export default JobMultiSelectField;
