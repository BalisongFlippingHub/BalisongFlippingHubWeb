import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface params {
    toggleSearchBar: Function
}

const SearchBar = ({ toggleSearchBar }: params) => {
    const [showResults, toggleResults] = useState(false)

    const handleOnChange = () => {
        toggleResults(true)
    }

    return (
        <div className="relative">
            <div className="flex items-center w-96">
                <input placeholder="Search..." className="p-2 w-full bg-shadow-green-offset" onChange={handleOnChange}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="p-2 bg-black h-7 hover:cursor-pointer" />
                <button className="md:collapse ml-2 text-lg hover:cursor-pointer" type="button" onClick={() => toggleSearchBar()}>X</button>
            </div>

            {
                !showResults
                ?
                <></>
                :
                <div className="absolute bg-white h-10 w-full">

                </div>
            }
        </div>
    )
}

export default SearchBar;