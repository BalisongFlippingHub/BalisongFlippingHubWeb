import { useLocation, useNavigate,  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import HeaderNavbar from "./HeaderNavbar";

const Navbar = () => {
    const { isLoggedIn, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <>
        <header className="fixed flex justify-between w-full p-3 z-20 bg-teal-950 border border-black">
            <h1 onClick={() => navigate("/")} className="hover:cursor-pointer pt-2">Balisong Flipping Hub</h1>
            <SearchBar />
            {
                isLoggedIn()
                ?
                <h3>{user?.companyName}</h3>
                :
                <h3 onClick={() => navigate("/login")} className="hover:cursor-pointer pt-2">Login</h3>
            }
        </header>
        <HeaderNavbar />
        </>
    )
}

export default Navbar;