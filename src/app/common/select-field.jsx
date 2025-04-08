function SelectField({
  field,
  value,
  options,
  change,
  noIcon,
  icon = "user-edit",
}) {
  const handleInputChange = (e) => {
    change(field.name, e.target.value);
  };

  return (
    <div className="form-group">
      <label>{field.label}</label>
      <div className={!noIcon && "ls-inputicon-box"}>
        <select
          className={
            !noIcon
              ? "p-inputtext p-p-2 wt-select p-border-round new-input-field new-form-control"
              : "form-control"
          }
          data-live-search="true"
          id={field.id}
          name={field.name}
          value={value[field.name]}
          onChange={handleInputChange}
          style={{ width: "100%", fontSize: "1rem" }}
        >
            <option>select item...</option>
          {options.map((option, i) => (
              <>
            
              <option key={i}>{option}</option></>
          ))}
        </select>
        {!noIcon && <i className={`fs-input-icon fa fa-${icon}`} />}
      </div>
    </div>
  );
}

export default SelectField;
