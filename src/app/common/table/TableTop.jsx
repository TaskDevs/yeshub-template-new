import { IoSearch } from "react-icons/io5";
import { SearchInput } from "../search-box";
import { BiFilterAlt } from "react-icons/bi";

export const TableTop = ({ label, searchValue, setSearchValue, handleSearch }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-5 gap-4 mb-4 w-full">
      {/* Label */}
      <h2 className="text-lg sm:text-xl font-semibold">{label}</h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <div className="w-full sm:w-auto">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            placeholder="Search contract history..."
            leftIcon={<IoSearch size={18} />}
            rightIcon={null}
          />
        </div>
        <button className="px-4 py-2 border rounded-md flex items-center text-sm sm:text-base">
          <BiFilterAlt className="mr-1" /> Filter
        </button>
      </div>
    </div>
  );
};
