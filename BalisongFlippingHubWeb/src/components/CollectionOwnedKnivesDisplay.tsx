import { useNavigate } from "react-router-dom";
import Image from "./Image";
import { CollectionKnife } from "../modals/CollectionKnife";

interface params {
  ownedKnives?: Array<CollectionKnife>;
}

const CollectionOwnedKnivesDisplay = ({ ownedKnives }: params) => {
  const navigate = useNavigate();

  return (
    <div className="md:w-2/3 sm:w-full sm:h-full md:h-auto flex flex-col items-center p-5">
      <div className="w-full flex justify-center text-3xl border-b-2 border-shadow pb-5">
        <h3>Knives</h3>
      </div>
      {!ownedKnives ? (
        <div className="w-full h-full text-3xl relative pt-5">
          <h5 className="text-shadow absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            Empty Collection
          </h5>
          <button
            type="button"
            className="h-80 w-52 bg-shadow"
            onClick={() => navigate("/me/collection/add-knife")}
          >
            <p>Add</p>
            <p>+</p>
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-wrap p-5 gap-2">
          <button
            type="button"
            className="h-80 w-52 bg-shadow rounded"
            onClick={() => navigate("/me/collection/add-knife")}
          >
            <p>Add</p>
            <p>+</p>
          </button>

          {ownedKnives.map((knife, i) => {
            return (
              <div
                key={i}
                className="h-80 w-52 flex items-center justify-center bg-shadow-green-offset rounded overflow-hidden relative"
              >
                <Image imageId={knife.coverPhoto} />

                <div className=" bg-black opacity-0 hover:opacity-80 hover:cursor-pointer w-full h-full absolute flex flex-col p-2">
                  <div className="w-full flex justify-center text-xl border-b">
                    <h5>{knife.displayName}</h5>
                  </div>

                  <div className="w-full flex flex-col justify-center items-center">
                    <h6>{knife.baseKnifeModel}</h6>
                    <h6>{knife.knifeMaker}</h6>
                    <h6>{knife.aqquiredDate}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionOwnedKnivesDisplay;
