
interface params {
    toggleSearchBar: Function
}

const SearchBar = ({ toggleSearchBar }: params) => {

    return (
        <div className="">
            <input placeholder="Search..." className="rounded p-2 w-80 bg-teal-700" disabled />
        </div>
    )
}

export default SearchBar;