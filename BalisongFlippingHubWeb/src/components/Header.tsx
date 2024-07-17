import { useNavigate  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import HeaderProfileDisplay from "./HeaderProfileDisplay";

const Navbar = () => {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    return (
        <>
        <header className="flex fixed justify-between h-16 w-full p-3 border border-shadow-green-offset bg-shadow-green">
            <div className="flex hover:cursor-pointer" onClick={() => navigate("/")} >
                <span className="border rounded-full w-10 mr-2"></span>
                <h1 className="pt-2">Balisong Flipping Center</h1>
            </div>
            <SearchBar />
            {
                isLoggedIn()
                ?
                <HeaderProfileDisplay />
                :
                <div className="flex">
                    <button onClick={() => navigate("/login")} className="p-2 hover:underline underline-offset-4">Login</button>
                    <button onClick={() => navigate("/register")} className="p-1 border-2 border-shadow-green-offset rounded hover:bg-shadow-green-offset">Register Now</button>
                </div>
            }
        </header>
        </>
    )
}

export default Navbar;