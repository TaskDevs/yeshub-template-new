import React, { useState } from 'react'
import { SearchInput } from "../../../../common/search-box";
import { IoSearch } from "react-icons/io5";
// import styles from "./find-work.module.css";

function MobileFindSavedWork({children}) {
    const [searchValue, setSearchValue] = useState("");

    
  const handleSearch = (value) => {
    console.log("Searching for:", value);
  };


  return (
    <div className="w-full ">
        <div className="w-full relative  flex-1 bg-[#F3F4F6] px-6 py-2 rounded-full mb-4">
            <SearchInput
              className="w-full bg-[#F3F4F6]  "
              rightIcon={null}
              value={searchValue}
              onSearch={handleSearch}
              onChange={setSearchValue}
              placeholder="Search here..."
              leftIcon={<IoSearch size={18} />}
              leftIconClassName="absolute -ml-8"
            />
          </div>
          <h1 className="text-2xl font-medium mobile-title mt-4 mb-6">Popular Jobs</h1>
     


          <div className="w-full">
            <div className="grid grid-cols-1 gap-4 w-full">
                  { children }
                </div>
            </div>
    </div>
  )
}

export default MobileFindSavedWork