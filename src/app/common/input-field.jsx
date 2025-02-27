
function InputField ({ field, value, change}) {
  
  const handleInputChange = (e) => {
		change(e);
	};

return (
<div className="form-group mb-3">
    <input
        name={field.name}
        type={field.type}
        minLength={3}
				maxLength={50}
        required
        className="form-control"
        placeholder={field.placeholder}
        value={value[field.name]}
        onChange={handleInputChange}
    />
</div>
  )
}

export default InputField
