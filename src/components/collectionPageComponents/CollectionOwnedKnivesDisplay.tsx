import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { CollectionKnife } from "../../modals/CollectionKnife";
import OwnedKnifeCard from "./OwnedKnifeCard";

const CollectionOwnedKnivesDisplay = () => {
  const ownedKnives: Array<CollectionKnife> = useAppSelector(
    (state) => state.collection.collectionKnives
  );

  const navigate = useNavigate();

  return (
    <div className="md:w-2/3 sm:w-full sm:h-full md:h-auto flex flex-col items-center p-5">
      <div className="w-full flex justify-center text-3xl pb-5 text-white">
        <h3>Knives</h3>
      </div>
      {!ownedKnives || ownedKnives.length < 1 ? (
        <div className="w-full h-full text-3xl relative pt-5">
          <h5 className="text-shadow absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            Empty Collection
          </h5>
          <button
            type="button"
            className="h-80 w-52 bg-shadow"
            onClick={() => navigate("/add-collection-knife")}
          >
            <p>Add</p>
            <p>+</p>
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-wrap pt-5 gap-2">
          <button
            type="button"
            className="h-80 w-52 bg-shadow rounded"
            onClick={() => navigate("/add-collection-knife")}
          >
            <p>Add</p>
            <p>+</p>
          </button>

          {ownedKnives.map((knife, i) => {
            return <OwnedKnifeCard knife={knife} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionOwnedKnivesDisplay;
