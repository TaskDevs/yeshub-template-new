function TextAreaField({ field, value, change, required=false }) {
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
				required={required} 
			/>
		</div>
	);
}

export default TextAreaField;
