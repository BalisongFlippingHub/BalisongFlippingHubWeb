import { useLocation, useNavigate,  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import HeaderNavbar from "./Navbar";

const Navbar = () => {
    const { isLoggedIn, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <header className="fixed flex flex-col items-center w-full p-2 z-30 bg-teal-950 border border-black">
            <div className="flex justify-between pl-7 pr-7 w-full">
                <HeaderNavbar />
                <div>
                {
                    isLoggedIn()
                    ?
                        <h3 onClick={() => navigate("/me")} className="hover:cursor-pointer">{user?.companyName}</h3>
                    :
                    <h3 onClick={() => navigate("/login")} className="hover:cursor-pointer">Login</h3>
                }
                </div>
            </div>
            <SearchBar />
        </header>
    )
}

export default Navbar;