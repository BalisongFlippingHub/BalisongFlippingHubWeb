import { useLocation, useNavigate,  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import HeaderNavbar from "./Navbar";

const Navbar = () => {
    const { isLoggedIn, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <header className="fixed flex flex-col items-center w-full p-3 z-30 bg-teal-950 border border-black">
            <div className="flex justify-between w-full">
                <HeaderNavbar />
                <div>
                {
                    isLoggedIn()
                    ?
                        <h3 onClick={() => navigate("/me")} className="hover:cursor-pointer">{user?.displayName}</h3>
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