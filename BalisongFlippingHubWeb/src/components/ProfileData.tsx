import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookSquare, faInstagram, faRedditSquare, faTwitterSquare, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";

const ProfileData = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    if (user?.role === "MAKER") {
        return (
            <div>

            </div>
        )
    }
    else {
        return (
            <div className="flex justify-between md:h-48 sm:h-40 xsm:h-36 p-3">
                {/*Display User Data*/}
                <div className="place-self-end flex flex-col">
                    <div className="flex">
                        {/*Display User Identification*/}
                        <div className="flex flex-col ">
                            <h3 className="text-3xl">{user?.displayName}</h3>
                            <h6>3 Months</h6>
                        </div>

                        {/*Display Users Links*/}
                        <div className="flex place-self-end gap-2 ml-5">
                        {
                            user?.instagramLink
                            ?
                            <></>
                            :
                            <FontAwesomeIcon icon={faInstagram} size="xl" />
                        }
                        {
                            user?.facebookLink
                            ?
                            <></>
                            : 
                            <FontAwesomeIcon icon={faFacebookSquare} size="xl"/>
                        }
                        {
                            user?.twitterLink
                            ?
                            <></>
                            :
                            <FontAwesomeIcon icon={faTwitterSquare} size="xl"/>
                        }
                        {
                            user?.youtubeLink
                            ?
                            <></>
                            :
                            <FontAwesomeIcon icon={faYoutubeSquare} size="xl"/>
                        }
                        {
                            user?.discordLink
                            ?
                            <></>
                            :
                            <FontAwesomeIcon icon={faDiscord} size="xl"/>
                        }
                        {
                            user?.redditLink
                            ?
                            <></>
                            :
                            <FontAwesomeIcon icon={faRedditSquare} size="xl"/>
                        }
                        </div>
                    </div>
                </div>
                
                {/*Collection Img Display and Link to Collection Page*/}
                <div className="place-self-center h-5/6 lg:w-80 md:w-72 sm:w-48 xsm:w-36 bg-black rounded-lg flex justify-center items-center hover:cursor-pointer" onClick={() => navigate("/me/collection")}>
                   <h3 className="font-bold md:text-4xl sm:text-2xl">Collection</h3>
                </div>
            </div>
        )
    }
}

export default ProfileData;