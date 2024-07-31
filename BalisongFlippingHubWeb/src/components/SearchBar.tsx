import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface params {
    toggleSearchBar: Function
}

const SearchBar = ({ toggleSearchBar }: params) => {

    return (
        <div className="flex items-center">
            <input placeholder="Search..." className="p-2 w-96 bg-teal-700" disabled />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="p-2 bg-black h-7" />
            <button className="md:collapse ml-2 text-lg" type="button" onClick={() => toggleSearchBar()}>X</button>
        </div>
    )
}

export default SearchBar;