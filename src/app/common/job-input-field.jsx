function JobInputField({ field, value, change }) {
  const handleInputChange = (e) => {
    change(e.target.value, field.name);
  };
  return (
    <div className="form-group">
      <label>{field.label}</label>
      <div className="ls-inputicon-box">
        <input
          className="form-control"
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={value[field.name]}
          onChange={handleInputChange}
        />
        <i className={field.icon} />
      </div>
    </div>
  );
}

export default JobInputField;
