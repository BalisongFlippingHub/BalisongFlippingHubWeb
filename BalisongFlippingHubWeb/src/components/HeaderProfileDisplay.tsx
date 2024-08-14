import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface params {
    relevant: boolean
}

const HeaderProfileDisplay = ({ relevant }: params) => {
    const [userNav, displayUserNav] = useState(false)
    const [currURL, setCurrURL] = useState("")
    
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        setCurrURL(location.pathname)
    }, [])

    useEffect(() => {
        if (location.pathname !== currURL) {
            setCurrURL(location.pathname)
            displayUserNav(false)
        }
    }, [location])
    
    return (
        <div className="flex gap-2">
            <button type="button"><FontAwesomeIcon icon={faBell}/></button>
            <div className="flex gap-2 hover:cursor-pointer" onClick={() => displayUserNav((prev) => !prev)}>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black rounded-full">
                {
                    user?.profileImg === null || user?.profileImg === ""
                    ?
                    <FontAwesomeIcon icon={faUser} />
                    :
                    <img />
                }
                </div>

                {
                    relevant
                    ?
                    <></>
                    :
                    <div className="flex items-center xsm:collapse xsm:absolute md:visible md:static">
                        <h3>{user?.displayName}</h3>
                    </div>
                }
            </div>

            {
                userNav
                ?
                <div className="absolute bg-shadow mt-[49px] w-36 right-0">
                    <ul>
                        <li className="flex p-2 hover:cursor-pointer hover:bg-shadow-green border-b" onClick={() => navigate("/me")}>Profile</li>
                        <li className="flex p-2 hover:cursor-pointer hover:bg-shadow-green border-b" onClick={() => navigate("/me/configure")}>Settings</li>
                        <li className="flex p-2 hover:cursor-pointer hover:bg-shadow-green" onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
                :
                <></>
            }
        </div>
    )
}

export default HeaderProfileDisplay;