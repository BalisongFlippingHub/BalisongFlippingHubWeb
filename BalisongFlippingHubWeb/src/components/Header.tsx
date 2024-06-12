import { useNavigate  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import HeaderNavbar from "./HeaderNavbar";
import HeaderProfileDisplay from "./HeaderProfileDisplay";

const Navbar = () => {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    return (
        <>
        <header className="fixed flex justify-between w-full p-3 z-20 bg-teal-950 border border-black">
            <h1 onClick={() => navigate("/")} className="hover:cursor-pointer pt-2">Balisong Flipping Hub</h1>
            <SearchBar />
            {
                isLoggedIn()
                ?
                <HeaderProfileDisplay />
                :
                <div className="flex">
                    <button onClick={() => navigate("/login")} className="p-2 hover:text-teal-200">Login</button>
                    <button onClick={() => navigate("/register")} className="p-2 border rounded bg-teal-700 hover:bg-inherit">Register Now</button>
                </div>
            }
        </header>
        <HeaderNavbar />
        </>
    )
}

export default Navbar;