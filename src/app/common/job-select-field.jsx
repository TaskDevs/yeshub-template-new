function JobSelectField({ field, value, options, change }) {
  const handleInputChange = (e) => {
    change(e.target.value, field.name);
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
          value={value[field.name]}
          onChange={handleInputChange}
        >
          <option className="bs-title-option" value="">
            {field.placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {field.icon && <i className={field.icon} />}
      </div>
    </div>
  );
}

export default JobSelectField;
