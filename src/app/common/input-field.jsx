
function InputField ({ field, value, change, required=true}) {
  

  const handleInputChange = (e) => {
    if (typeof change === 'function') {
       
        if (change.length === 2) {
            change(field.name, e.target.value);
        } else {
  
            change(e);
        }
    }
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
        // className="p-inputtext p-p-2 p-border-round"
        placeholder={field.placeholder}
        value={value[field.name]}
        onChange={handleInputChange}
    />
</div>
  )
}

export default InputField
