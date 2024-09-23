import { useEffect } from "react";
import CustomCollectionBanner from "../components/CustomCollectionBanner";
import useAuth from "../hooks/useAuth";
import CollectionOwnedKnivesDisplay from "../components/CollectionOwnedKnivesDisplay";
import CollectionPostsDisplay from "../components/CollectionPostsDisplay";
import Image from "../components/Image";
import { useNavigate } from "react-router-dom";
import useCollection from "../hooks/useCollection";

const UserCollectionPage = () => {
  const { user } = useAuth();
  const { collectionData } = useCollection();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(collectionData);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col lg:pl-[192px] pt-[64px]">
      {/*Collection Banner Image atop of page*/}
      {collectionData?.bannerImg ||
      collectionData?.bannerImg === "" ||
      collectionData === null ? (
        <CustomCollectionBanner />
      ) : (
        <CustomCollectionBanner imageId={collectionData.bannerImg} />
      )}

      {/*Users Collection Info*/}
      <section className="w-full border-b-4 border-black p-4 flex justify-between">
        {/*User Info*/}
        <div className="flex gap-3">
          <div
            className="rounded-full w-36 h-36 border overflow-hidden hover:cursor-pointer"
            onClick={() => navigate("/me")}
          >
            <Image imageId={user?.profileImg!} />
          </div>

          <div
            className="hover:cursor-pointer place-self-center"
            onClick={() => navigate("/me")}
          >
            <h4 className="text-2xl">{user?.displayName}</h4>
            <h5 className="text-shadow text-lg">
              {collectionData?.collectedKnives?.length} Knives
            </h5>
          </div>
        </div>

        {/*Favorite Knife Display*/}
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl border-b-2 pb-1">Favorite Knife</h3>
            <p className="text-shadow">None</p>
          </div>

          <span className="h-full w-1 bg-black"></span>
          <div className="bg-black w-72 h-36"></div>
        </div>
      </section>

      {/*Display Owned Knives and Recent Posts*/}
      <section className="w-full h-full flex sm:flex-col md:flex-row">
        {/*Component for displaying all Owned Knives*/}
        {!collectionData ||
        !collectionData?.collectedKnives ||
        collectionData?.collectedKnives.length === 0 ? (
          <CollectionOwnedKnivesDisplay />
        ) : (
          <CollectionOwnedKnivesDisplay
            ownedKnives={collectionData?.collectedKnives}
          />
        )}

        {/*Component to display all posts specific to user collection*/}
        <CollectionPostsDisplay />
      </section>
    </section>
  );
};

export default UserCollectionPage;
