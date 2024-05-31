import { useNavigate,  } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    const homeNavigate = () => {
        if (isLoggedIn()) {
            navigate("/me")
        } 
        else {
            navigate("/")
        }
    }

    return (
        <header className="fixed flex justify-between w-full border p-3 z-30 bg-blue-200">
            <h1 onClick={() => homeNavigate()} className="hover:cursor-pointer">Balisong Flipping Hub</h1>
            <input placeholder="Search..."/>
            <h3 onClick={() => navigate("/login")}>Login</h3>
        </header>
    )
}

export default Navbar;