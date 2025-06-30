import React, { useState } from "react";
import { SearchInput } from "../../../../common/search-box";
import { IoSearch } from "react-icons/io5";

function MobileFindSavedWork({ children }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    console.log("Searching for:", value);
  };

  return (
    <div className="w-full px-4 pb-10">
      {/* Search Box */}
      <div className="relative w-full mb-4">
        <SearchInput
          className="w-full"
          rightIcon={null}
          value={searchValue}
          onSearch={handleSearch}
          onChange={setSearchValue}
          placeholder="Search here..."
          leftIcon={<IoSearch size={18} />}
          leftIconClassName="absolute -ml-7 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>


      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-4">
        {children}
      </div>
    </div>
  );
}

export default MobileFindSavedWork;
