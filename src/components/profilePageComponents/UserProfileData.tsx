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
import Image from "../Image";

const UserProfileData = () => {
  const user = useAppSelector((state) => state.auth.user);
  const collectionData = useAppSelector((state) => state.collection.collection);

  const navigate = useNavigate();

  if (user?.role === "ADMIN") {
    return <div></div>;
  } else {
    return (
      <div className="flex justify-between h-full p-4 xsm:pt-16 md:pt-4">
        {/*Display User Data*/}
        <div className="flex flex-col h-full">
          <div className="flex h-full">
            {/*Display User Identification*/}
            <div className="flex flex-col">
              {/*Display Name*/}
              <div className="flex items-center gap-2 md:text-3xl xsm:text-2xl">
                <FontAwesomeIcon icon={faCircleUser} size="xl" />
                {user?.displayName && user?.displayName !== "" ? (
                  <h5>{user?.displayName}</h5>
                ) : (
                  <h5>{user?.id}</h5>
                )}
              </div>

              {/* Badges Display
              <div className="w-full flex justify-center">
                <h6>Badges...</h6>
              </div> */}

              {/*Profile Caption*/}
              <div className="w-full flex justify-center">
                <h6>Caption...</h6>
              </div>
            </div>

            {/*Display Users Links*/}
            <div className="flex place-self-end gap-2 ml-5">
              {!user?.instagramLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              )}
              {!user?.facebookLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faFacebookSquare} size="xl" />
              )}
              {!user?.twitterLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faTwitterSquare} size="xl" />
              )}
              {!user?.youtubeLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faYoutubeSquare} size="xl" />
              )}
              {!user?.discordLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faDiscord} size="xl" />
              )}
              {!user?.redditLink ? (
                <></>
              ) : (
                <FontAwesomeIcon icon={faRedditSquare} size="xl" />
              )}
            </div>
          </div>
        </div>

        {/*Collection Img Display and Link to Collection Page*/}
        <div className="h-full flex items-end">
          <button
            type="button"
            className="bg-black p-1 rounded-lg flex justify-center items-center relative md:w-80 md:h-40 xsm:w-36 xsm:h-24"
            onClick={() =>
              navigate(
                `/${user?.displayName}/${user?.identifierCode}/collection`
              )
            }
          >
            <h4 className="absolute md:text-4xl font-bold xsm:text-lg">
              Collection
            </h4>
            {collectionData?.bannerImg && collectionData.bannerImg !== "" ? (
              <Image imageId={collectionData.bannerImg!} />
            ) : (
              <></>
            )}
          </button>
        </div>
      </div>
    );
  }
};

export default UserProfileData;
