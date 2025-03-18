const SearchField = ({ field, value, change }) => {
  const handleInputChange = (e) => {
    change(field.name, e.target.value);
  };

  return (
    <input
      className="form-control"
      name={field.name}
      type="search"
      placeholder={field.placeholder}
      value={value[field.name]}
      onChange={handleInputChange}
    />
  );
};

export default SearchField;
