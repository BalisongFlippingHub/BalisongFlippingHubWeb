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
      <div className="flex items-center justify-end pt-1 pb-1 pl-6 pr-3 gap-2 border rounded-full">
        <input
          placeholder="Search..."
          className="md:w-96 xsm:w-70 outline-none text-white bg-blue bg-opacity-0 pb-px pt-px"
          onChange={handleOnChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="xl"
          className="hover:cursor-pointer"
        />
      </div>

      <button
          className="md:collapse ml-2 hover:cursor-pointer"
          type="button"
          onClick={() => toggleSearchBar()}
        >
          X
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
