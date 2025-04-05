import { IoSearch } from "react-icons/io5";
import { SearchInput } from "../search-box";
import { BiFilterAlt } from "react-icons/bi";

// Search and Filter Component
export const TableTop = ({label, searchValue, setSearchValue, handleSearch }) => {
  return (
    <div className="flex justify-between items-center px-5 mb-4 w-full">
      <h2 className="text-xl font-semibold">{label}</h2>
      <div className="flex">
        {/* Search with left icon */}
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Search contract history..."
          leftIcon={<IoSearch size={18} />}
          rightIcon={null}
        />
        <button className="px-4 py-2 border rounded-md flex items-center">
          <BiFilterAlt className="mr-1" /> Filter
        </button>
      </div>
    </div>
  );
};