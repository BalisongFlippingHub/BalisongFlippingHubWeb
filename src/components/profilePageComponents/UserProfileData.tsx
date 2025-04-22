import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faDiscord,
//   faFacebookSquare,
//   faInstagram,
//   faRedditSquare,
//   faTwitterSquare,
//   faYoutubeSquare,
// } from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../../redux/hooks";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "../Image";

const UserProfileData = () => {
  const user = useAppSelector((state) => state.auth.user);
  const collectionData = useAppSelector((state) => state.collection.collection);

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 text-white">
      <div className="flex flex-col gap-4">
        <div className="flex">
          {/*Display User Identification*/}
          <div className="flex flex-col justify-center">
            {/*Display Name && Social Media Links*/}
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faCircleUser} size="2xl" />

              <div className="text-2xl font-bold">
                {user?.displayName && user?.displayName !== "" ? (
                  <h5>{user?.displayName}</h5>
                ) : (
                  <h5>{user?.id}</h5>
                )}
              </div>

              {/*Badges Display*/}
              <ul className="flex gap-3 ml-2">
                <li className="">»</li>
                <li>·</li>
                <li>Š</li>
              </ul>
            </div>

            {/*Profile Caption*/}
            <div className="w-80">
              <h6>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod."
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/*Collection Img Display and Link to Collection Page*/}
      <div className="h-full flex items-end">
        <button
          type="button"
          className="bg-black p-1 rounded-lg flex justify-center items-center relative md:w-72 md:h-32 xsm:w-36 xsm:h-24"
          onClick={() =>
            navigate(`/${user?.displayName}/${user?.identifierCode}/collection`)
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
};

export default UserProfileData;
