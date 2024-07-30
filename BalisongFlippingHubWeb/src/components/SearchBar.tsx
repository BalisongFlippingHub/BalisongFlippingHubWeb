
interface params {
    toggleSearchBar: Function
}

const SearchBar = ({ toggleSearchBar }: params) => {

    return (
        <div className="">
            <input placeholder="Search..." className="rounded p-2 w-96 bg-teal-700" disabled />
            <button className="md:collapse" type="button" onClick={() => toggleSearchBar()}>X</button>
        </div>
    )
}

export default SearchBar;