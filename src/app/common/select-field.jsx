function SelectField({
	field,
	value,
	options,
	change,
	valueKey = "id",
	labelKey = "",
}) {
	const handleInputChange = (e) => {
		change(field.name, e.target.value);
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
						<option key={option.id} value={option[valueKey] || ""}>
							{console.log("labelkey", option[labelKey])}
							{option[labelKey] || option[valueKey]}
						</option>
					))}
				</select>
				<i className="fs-input-icon fa fa-user-edit" />
			</div>
		</div>
	);
}

export default SelectField;
