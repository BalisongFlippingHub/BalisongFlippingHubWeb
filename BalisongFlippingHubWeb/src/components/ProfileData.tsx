import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileData = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="flex justify-between pl-5 pr-5 pb-2 h-1/3">
            <div className="flex items-end">
                {/*Displays Profile Basic Data*/}
                {
                    user?.role === "USER"
                    ?
                    <div>
                        <h3 className="text-3xl">{user.displayName}</h3>
                        <h4 className="text-sm">Age: 3 Months</h4>
                    </div>
                    :
                    <div>
                        <h3>{user?.compnayName}</h3>
                    </div>
                }
                {/*Displays Links*/}
            </div>
            
            {/*Collection Img Display and Link to Collection Page*/}
            <div className="place-self-center h-2/3 w-1/5 rounded-lg bg-black relative hover:cursor-pointer" onClick={() => navigate("/me/collection")}>
               
            </div>
        </div>
    )
}

export default ProfileData;