import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface params {
  toggleSearchBar: () => void;
}

const SearchBar = ({ toggleSearchBar }: params) => {
  const [showResults, toggleResults] = useState(false);

  const handleOnChange = () => {
    toggleResults(true);
  };

  return (
    <div className="flex">
      <div className="flex items-center py-2 pl-4 pr-3 gap-5 bg-white/5 border border-white/15 focus-within:border-blue-primary rounded-full transition-colors duration-200">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="lg"
          className="text-white/60 hover:cursor-pointer flex-shrink-0"
        />
        <input
          placeholder="Search..."
          className="lg:w-48 md:w-36 xsm:w-32 outline-none text-white bg-transparent placeholder-white/40 text-sm"
          onChange={handleOnChange}
        />
      </div>

      <button
          className="md:hidden ml-3 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer text-sm font-medium"
          type="button"
          onClick={() => toggleSearchBar()}
        >
          Cancel
        </button>

      {!showResults ? (
        <></>
      ) : (
        <div className="absolute bg-white w-full"></div>
      )}
    </div>
  );
};

export default SearchBar;
