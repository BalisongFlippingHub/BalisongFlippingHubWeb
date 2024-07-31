import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface params {
    relevant: boolean
}

const HeaderProfileDisplay = ({ relevant }: params) => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="flex gap-2">
            <button type="button"><FontAwesomeIcon icon={faBell}/></button>
            <div className="flex gap-2 hover:cursor-pointer" onClick={() => navigate("/me")}>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black rounded-full">
                {
                    user?.profileImg === null
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
        </div>
    )
}

export default HeaderProfileDisplay;