import CollectionOwnedKnivesDisplay from "../components/collectionPageComponents/CollectionOwnedKnivesDisplay";
import CollectionPostsDisplay from "../components/collectionPageComponents/CollectionPostsDisplay";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Image from "../components/Image";

const UserCollectionPage = () => {
  const collectionData = useAppSelector((state) => state.collection.collection);
  const user = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  return (
    <section className="w-full h-screen flex flex-col lg:pl-[192px] pt-[64px]">
      {/*Collection Banner Image*/}
      <section className="w-full h-[25%]">
        {collectionData?.bannerImg ? (
          <Image imageId={collectionData?.bannerImg!} />
        ) : (
          <div
            className="w-full h-full bg-shadow-green-offset flex justify-center items-center text-3xl font-bold hover:cursor-pointer"
            onClick={() => navigate("/me/configure/collection-banner-image")}
          >
            <h5 className="border-2 rounded border-dashed p-10 hover:bg-shadow-green">
              Click To Set Banner
            </h5>
          </div>
        )}
      </section>
      {/*Users Collection Info*/}
      <section className="w-full border-b-4 border-black p-4 flex justify-between">
        {/*User Info*/}
        <div className="flex gap-3">
          <div
            className="rounded-full w-36 h-36 border overflow-hidden hover:cursor-pointer"
            onClick={
              user?.profileImg
                ? () => navigate("/me")
                : () => navigate("/me/configure/profile-image")
            }
          >
            <Image imageId={user?.profileImg!} />
          </div>

          <div
            className="hover:cursor-pointer place-self-center"
            onClick={() => navigate("/me")}
          >
            <h4 className="text-2xl">{user?.displayName}</h4>
            <h5 className="text-shadow text-lg">
              {collectionData?.collectedKnives?.length} knives
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
      <section className="w-full h-full flex xsm:flex-col md:flex-row">
        {/*Display for owned knives*/}
        <CollectionOwnedKnivesDisplay />

        {/*Component to display all posts specific to user collection*/}
        <CollectionPostsDisplay />
      </section>
    </section>
  );
};

export default UserCollectionPage;
