import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebookSquare,
  faInstagram,
  faRedditSquare,
  faTwitterSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../../redux/hooks";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const UserProfileData = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (user?.role === "ADMIN") {
    return <div></div>;
  } else {
    return (
      <div className="flex justify-between md:h-48 sm:h-40 xsm:h-36 p-4">
        {/*Display User Data*/}
        <div className="flex flex-col h-full">
          <div className="flex h-full">
            {/*Display User Identification*/}
            <div className="flex flex-col">
              {/*Display Name*/}
              <div className="flex items-center gap-2 text-3xl">
                <FontAwesomeIcon icon={faCircleUser} />
                {user?.displayName && user?.displayName !== "" ? (
                  <h5>{user?.displayName}</h5>
                ) : (
                  <h5>{user?.id}</h5>
                )}
              </div>

              {/*Badges Display*/}
              <div className="w-full flex justify-center">
                <h6>Badges...</h6>
              </div>

              {/*Profile Caption*/}
              <div>
                <h6>Caption...</h6>
              </div>
            </div>

            {/*Display Users Links*/}
            <div className="flex place-self-end gap-2 ml-5">
              {user?.instagramLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              )}
              {user?.facebookLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faFacebookSquare} size="xl" />
              )}
              {user?.twitterLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faTwitterSquare} size="xl" />
              )}
              {user?.youtubeLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faYoutubeSquare} size="xl" />
              )}
              {user?.discordLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faDiscord} size="xl" />
              )}
              {user?.redditLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faRedditSquare} size="xl" />
              )}
            </div>
          </div>
        </div>

        {/*Collection Img Display and Link to Collection Page*/}
        <div
          className="place-self-center h-5/6 lg:w-80 md:w-72 sm:w-48 xsm:w-36 bg-black rounded-lg flex justify-center items-center hover:cursor-pointer"
          onClick={() => navigate("/me/collection")}
        >
          <h3 className="font-bold md:text-4xl sm:text-2xl">Collection</h3>
        </div>
      </div>
    );
  }
};

export default UserProfileData;
