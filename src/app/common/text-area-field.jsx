function TextAreaField({ field, value, change, required=false }) {
	const handleInputChange = (e) => {
		change(field.name, e.target.value);
	};

	return (
		<div className="form-group">
			<label
				htmlFor={field.name}
				className="p-text-secondary p-d-block p-mb-2 p-font-bold"
			>
				{field.label}
			</label>
			<textarea
				// className="form-control"
				className="p-inputtext p-p-2 p-border-round new-input-field new-form-control"
				rows={field.rows || 3}
				name={field.name}
				value={value[field.name]}
				onChange={handleInputChange}
				required={required} 
				style={{ width: '100%', fontSize: '1rem' }}
			/>
		</div>
	);
}

export default TextAreaField;
