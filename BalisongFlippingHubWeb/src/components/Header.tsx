import { useLocation, useNavigate  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import HeaderProfileDisplay from "./HeaderProfileDisplay";
import HeaderNavbar from "./HeaderNavbar";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faMagnifyingGlass, faUserPlus, faCircleUser } from "@fortawesome/free-solid-svg-icons";

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

            if (accountToggle) {
                setAccountToggle(false)
            }
        }
    }, [location])

    return (
        <>
            <header className="flex xsm:flex-col md:flex-row fixed md:justify-between xsm:justify-center xsm:items-center h-16 w-full p-3 border border-shadow-green-offset bg-shadow-green">
            {
                searchBarToggle
                ?
                <>
                    <div className="md:collapse md:absolute xsm:visible xsm:static">
                        <SearchBar toggleSearchBar={toggleSearchBar} />
                    </div>

                    <div className="flex items-center gap-3 xsm:collapse xsm:absolute md:visible md:static">
                    
                    {
                        !navToggle
                        ?
                        <FontAwesomeIcon icon={faBarsStaggered} onClick={() => toggleNav((prev) => !prev)} className="hover:cursor-pointer" />
                        :
                        <button type="button" onClick={() => toggleNav((prev) => !prev)} >X</button>
                    }

                    <h1 className="hover:cursor-pointer md:text-2xl sm:text-md" onClick={() => navigate("/")}>Balisong Flipping Center</h1>
                    </div>

                    <div className="xsm:collapse md:visible xsm:absolute md:static">
                        <SearchBar toggleSearchBar={toggleSearchBar} />
                    </div>

                    <div className="xsm:collapse xsm:absolute md:static md:visible">
                        <button onClick={() => navigate("/login")} className="p-2 hover:underline underline-offset-4">Login</button>
                        <button onClick={() => navigate("/register")} className="p-1 border-2 border-shadow-green-offset rounded hover:bg-shadow-green-offset">Register Now</button>
                    </div>
                </>
                :
                <>
                    <div className="flex items-center gap-3 xsm:w-full xsm:justify-between md:w-auto">
                        {
                            !navToggle
                            ?
                            <FontAwesomeIcon icon={faBarsStaggered} onClick={() => toggleNav((prev) => !prev)} className="hover:cursor-pointer" />
                            :
                            <button type="button" onClick={() => toggleNav((prev) => !prev)}>X</button>
                        }

                        <h1 className="hover:cursor-pointer sm:text-2xl xsm:text-xl" onClick={() => navigate("/")}>Balisong Flipping Center</h1>
                        
                        <div className="md:collapse xsm:visible md:absolute flex gap-2">
                            <button type="button" onClick={toggleSearchBar} className="mr-1"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                            {
                                isLoggedIn()
                                ?
                                <div>
                                    <HeaderProfileDisplay relevant={true}/>
                                </div>
                                :
                                <div className="relative">
                                    <button type="button" onClick={() => setAccountToggle((prev) => !prev)}><FontAwesomeIcon icon={faCircleUser}/></button>
                                    {
                                        accountToggle
                                        ?
                                        <div className="absolute w-32 -right-3 bg-shadow-green-offset p-2 z-5 text-lg translate-y-5">
                                            <button className="flex flex-row-reverse items-center justify-between w-full h-full" onClick={() => navigate("/register")}><FontAwesomeIcon icon={faUserPlus}/><h3>Register</h3></button>
                                            <button className="flex flex-row-reverse items-center justify-between w-full h-full" onClick={() => navigate("/login")}><FontAwesomeIcon icon={faCircleUser}/><h3>Login</h3></button>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <div className="xsm:collapse md:visible xsm:absolute md:static">
                        <SearchBar toggleSearchBar={toggleSearchBar} />
                    </div>

                    {
                        isLoggedIn()
                        ?
                        <div className="xsm:absolute xsm:collapse md:static md:visible">
                            <HeaderProfileDisplay relevant={false} />
                        </div>
                        :
                        <div className="xsm:collapse xsm:absolute md:static md:visible">
                            <button onClick={() => navigate("/login")} className="p-2 hover:underline underline-offset-4">Login</button>
                            <button onClick={() => navigate("/register")} className="p-1 border-2 border-shadow-green-offset rounded hover:bg-shadow-green-offset">Register Now</button>
                        </div>
                    }
                </>
            }

            </header>

            <aside className="">
                {
                    navToggle
                    ?
                    <HeaderNavbar />
                    :
                    <></>
                }
            </aside>

            <aside className="xsm:collapse lg:visible">
                <HeaderNavbar  />
            </aside>
        </>
    )
}

export default Navbar;