function SortSelectField({ field, options, change, value, use }) {
  const handleInputChange = (e) => {
    change(field.name, e.target.value);
  };
  return (
    <select
      className="wt-select-bar-2 selectpicker"
      data-live-search="true"
      data-bv-field="size"
      id={field.id}
      name={field.name}
      value={value[field.name]}
      onChange={handleInputChange}
    >
      {options.map((option, i) => (
        <option key={i}>{use ? use + " " + option : option}</option>
      ))}
    </select>
  );
}

export default SortSelectField;
