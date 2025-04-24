import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import CollectionOwnedKnivesDisplay from "./CollectionOwnedKnivesDisplay";
import CollectionPostsDisplay from "./CollectionPostsDisplay";
import CollectionBannerComponent from "./collectionBannerComponent";
import useWindowSize from "../../hooks/useWindowSize";

const UsersCollectionPageComponent = () => {
  const collectionData = useAppSelector((state) => state.collection.collection);
  const user = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const windowSize = useWindowSize();

  return (
    <section className="w-full flex flex-col">
      {/*Collection Banner Image*/}
      <CollectionBannerComponent />

      {/*Users Collection Info*/}
      <section className="w-full p-4 flex justify-between text-white">
        {/*User Info*/}
        <div className="flex gap-3 items-center">
          <div
            className="rounded-full md:w-36 md:h-36 xsm:w-24 xsm:h-24 border overflow-hidden hover:cursor-pointer"
            onClick={
              user?.profileImg
                ? () =>
                    navigate(`/${user?.displayName}/${user?.identifierCode}`)
                : () => navigate("/configure/profile-image")
            }
          >
            <Image imageId={user?.profileImg!} />
          </div>

          <div
            className="hover:cursor-pointer place-self-center"
            onClick={() =>
              navigate(`/${user?.displayName}/${user?.identifierCode}`)
            }
          >
            <h4 className="text-2xl">{user?.displayName}</h4>
            <h5 className="text-shadow text-lg">
              {collectionData?.collectedKnives?.length} knives
            </h5>
          </div>
        </div>

        {/*Favorite Knife Display On Big Screens*/}
        {windowSize.at(1)! > 950 ? (
          <div className="flex gap-3 items-center">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl border-b-2 pb-1">Favorite Knife</h3>
              <p className="text-shadow">None</p>
            </div>

            <div className="bg-black rounded-lg md:w-72 xsm:w-52 h-36"></div>
          </div>
        ) : (
          <></>
        )}
      </section>

      {/*Display Owned Knives and Recent Posts*/}
      <section className="w-full h-full flex xsm:flex-col md:flex-row">
        {/*Display for owned knives*/}
        <CollectionOwnedKnivesDisplay />

        {/*Component to display all posts specific to user collection*/}
        <CollectionPostsDisplay />
      </section>
    </section>
  );
};

export default UsersCollectionPageComponent;
