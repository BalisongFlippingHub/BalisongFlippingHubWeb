import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface params {
  toggleSearchBar: Function;
}

const SearchBar = ({ toggleSearchBar }: params) => {
  const [showResults, toggleResults] = useState(false);

  const handleOnChange = () => {
    toggleResults(true);
  };

  return (
    <div className="">
      <div className="flex items-center w-96 border rounded-full overflow-hidden">
        <input
          placeholder="Search..."
          className="w-full bg-black"
          onChange={handleOnChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="hover:cursor-pointer"
        />
        <button
          className="md:collapse ml-2 hover:cursor-pointer"
          type="button"
          onClick={() => toggleSearchBar()}
        >
          X
        </button>
      </div>

      {!showResults ? (
        <></>
      ) : (
        <div className="absolute bg-white w-full"></div>
      )}
    </div>
  );
};

export default SearchBar;
