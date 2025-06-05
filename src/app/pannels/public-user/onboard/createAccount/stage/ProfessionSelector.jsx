import React from 'react';
import Select from 'react-select';

const ProfessionSelector = ({ selectedProfession, setSelectedProfession, professionList }) => {
  const options = professionList.map((job) => ({
    label: job,
    value: job,
  }));

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Search and Select Your Profession
      </label>
      <Select
        options={options}
        value={selectedProfession}
        onChange={setSelectedProfession}
        placeholder="Start typing a job title..."
        isClearable
      />
    </div>
  );
};

export default ProfessionSelector;
