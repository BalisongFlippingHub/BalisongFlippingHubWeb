import { useLocation, useNavigate  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import HeaderProfileDisplay from "./HeaderProfileDisplay";
import HeaderNavbar from "./HeaderNavbar";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const [navToggle, toggleNav] = useState(false)
    const [searchBarToggle, setSearchBarToggle] = useState(false)
    const [accountToggle, setAccountToggle] = useState(false)

    const [currURL, setCurrURL] = useState("")

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    const location = useLocation()

    const closeNavigation = () => {
        toggleNav(false)
    }

    const toggleSearchBar = () => {
        setSearchBarToggle((prev) => !prev)
    }

    useEffect(() => {
        setCurrURL(location.pathname)
    }, [])

    useEffect(() => {
        if (location.pathname !== currURL) {
            setCurrURL(location.pathname)
            closeNavigation()
        }
    }, [location])

    return (
        <>
            <header className="flex sm:flex-col md:flex-row fixed md:justify-between sm:justify-center sm:items-center md:h-16 w-full p-3 border border-shadow-green-offset bg-shadow-green">
                <div className="flex items-center gap-3 sm:w-full sm:justify-between md:w-auto">
                    <div className="lg:collapse lg:absolute md:visible flex flex-col gap-1 cursor-pointer" onClick={() => toggleNav((prev) => !prev)}>
                        <span className="md:w-6 sm:w-4 h-1 bg-white rounded border"></span>
                        <span className="md:w-6 sm:w-4 h-1 bg-white rounded border"></span>
                        <span className="md:w-6 sm:w-4 h-1 bg-white rounded border"></span>
                    </div>
                    <h1 className="hover:cursor-pointer md:text-2xl sm:text-sm" onClick={() => navigate("/")}>Balisong Flipping Center</h1>
                    <div className="md:collapse sm:visible md:absolute flex gap-2">
                        <button type="button" onClick={toggleSearchBar}>S</button>
                        {
                            isLoggedIn()
                            ?
                            <div>
                                <HeaderProfileDisplay />
                            </div>
                            :
                            <div className="relative">
                                <button type="button" onClick={() => setAccountToggle((prev) => !prev)}>P</button>
                                {
                                    accountToggle
                                    ?
                                    <div className="absolute -translate-x-12 bg-shadow-green-offset p-2 z-5">
                                        <button>Register</button>
                                        <button>Login</button>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className="sm:collapse md:visible sm:absolute md:static">
                    <SearchBar toggleSearchBar={toggleSearchBar} />
                </div>

                <div className="md:collapse sm:visible md:absolute">
                {
                    !searchBarToggle
                    ?
                    <></>
                    :
                    <SearchBar toggleSearchBar={toggleSearchBar} />
                }
                </div>

                <div className="sm:collapse sm:absolute md:static md:visible">
                    <button onClick={() => navigate("/login")} className="p-2 hover:underline underline-offset-4">Login</button>
                    <button onClick={() => navigate("/register")} className="p-1 border-2 border-shadow-green-offset rounded hover:bg-shadow-green-offset">Register Now</button>
                </div>

            </header>

            <aside className="">
                {
                    navToggle
                    ?
                    <HeaderNavbar closeNavigation={closeNavigation} />
                    :
                    <></>
                }
            </aside>

            <aside className="md:collapse sm:collapse lg:visible">
                <HeaderNavbar closeNavigation={closeNavigation} />
            </aside>
        </>
    )
}

export default Navbar;