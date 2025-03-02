
function InputField ({ field, value, change, required=true}) {
  
  const handleInputChange = (e) => {
		change(field.name, e.target.value);
	};
  
return (
<div className="form-group mb-3">
    <input
        name={field.name}
        type={field.type}
        minLength={3}
				maxLength={50}
        required={required}
        className="form-control"
        placeholder={field.placeholder}
        value={value[field.name]}
        onChange={handleInputChange}
    />
</div>
  )
}

export default InputField
