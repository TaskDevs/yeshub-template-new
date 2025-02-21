function TextAreaField({ field, value, change }) {
	const handleInputChange = (e) => {
		change(field.name, e.target.value);
	};

	return (
		<div className="form-group">
			<label>{field.label}</label>
			<textarea
				className="form-control"
				rows={field.rows || 3}
				name={field.name}
				value={value[field.name]}
				onChange={handleInputChange}
			/>
		</div>
	);
}

export default TextAreaField;
