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
    <div className="flex h-9">
      <div className="flex items-center md:w-96 xsm:w-70 border rounded-full overflow-hidden">
        <input
          placeholder="Search..."
          className="w-full bg-black pl-6 pt-2 pb-2 pr-4 outline-none"
          onChange={handleOnChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="hover:cursor-pointer mr-4"
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
