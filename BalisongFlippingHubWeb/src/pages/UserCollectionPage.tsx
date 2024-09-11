import { cloneElement, useEffect, useState } from "react";
import CustomCollectionBanner from "../components/CustomCollectionBanner";
import { Collection } from "../modals/Collection";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import CollectionOwnedKnivesDisplay from "../components/CollectionOwnedKnivesDisplay";
import CollectionPostsDisplay from "../components/CollectionPostsDisplay";
import Image from "../components/Image";
import { useNavigate } from "react-router-dom";

const UserCollectionPage = () => {
  const [collection, setCollection] = useState<Collection | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getCollectionData = async () => {
      setIsLoading(true);
      await axios
        .request({
          url: `/collection/any/${user?.collectionId}`,
          method: "get",
        })
        .then((res) => {
          console.log("getting collection data response", res);
          setCollection(res.data);
        })
        .catch((err) => {
          console.log("Update Collection img error: ", err);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getCollectionData();
  }, []);

  return (
    <section className="w-full h-full flex flex-col lg:pl-[192px] pt-[64px]">
      {/*Collection Banner Image atop of page*/}
      {collection?.bannerImg ||
      collection?.bannerImg === "" ||
      collection === null ? (
        <CustomCollectionBanner />
      ) : (
        <CustomCollectionBanner imageId={collection.bannerImg} />
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
            <h5 className="text-shadow text-lg">0 Knives</h5>
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
        {!collection ||
        !collection?.ownedKnives ||
        collection?.ownedKnives.length === 0 ? (
          <CollectionOwnedKnivesDisplay />
        ) : (
          <CollectionOwnedKnivesDisplay ownedKnives={collection?.ownedKnives} />
        )}

        {/*Component to display all posts specific to user collection*/}
        <CollectionPostsDisplay />
      </section>
    </section>
  );
};

export default UserCollectionPage;
