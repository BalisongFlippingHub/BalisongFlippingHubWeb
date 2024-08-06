import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileData = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="flex justify-between md:h-48 sm:h-40 xsm:h-36 p-3">
            <div className="flex items-end">
                {/*Displays Profile Basic Data*/}
                {
                    user?.role === "USER"
                    ?
                    <div>
                        <h3 className="text-3xl">{user.displayName}</h3>
                        <h4 className="text-sm">3 Months</h4>
                    </div>
                    :
                    <div>
                        <h3>{user?.compnayName}</h3>
                    </div>
                }
                {/*Displays Links*/}
            </div>
            
            {/*Collection Img Display and Link to Collection Page*/}
            <div className="place-self-center h-5/6 lg:w-80 md:w-72 sm:w-48 xsm:w-36 bg-black rounded-lg flex justify-center items-center hover:cursor-pointer" onClick={() => navigate("/me/collection")}>
               <h3 className="font-bold md:text-4xl sm:text-2xl">Collection</h3>
            </div>
        </div>
    )
}

export default ProfileData;