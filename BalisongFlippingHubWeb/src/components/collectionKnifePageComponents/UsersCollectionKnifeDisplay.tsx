import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { CollectionKnife } from "../../modals/CollectionKnife";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import CoverPhotoEditAndDisplay from "./main/CoverPhotoEditAndDisplay";
import DisplayNameEditAndDisplayName from "./main/DisplayNameEditAndDisplay";
import BaseModelEditAndDisplay from "./main/BaseModelEditAndDisplay";
import KnifeMakerEditAndDisplay from "./main/KnifeMakerEditAndDisplay";
import KnifeTypeEditAndDisplay from "./main/KnifeTypeEditAndDisplay";
import MSRPEditAndDisplay from "./main/MSRPEditAndDisplay";
import PersonalRatingDisplayAndToggle from "./main/PersonalRatingDisplayAndToggle";
import HandleConstructionEditAndDisplay from "./handleDetails/HandleConstructionEditAndDisplay";
import BalancePointEditAndToggle from "./main/BalancePointDisplayAndToggle";
import PivotSystemEditAndDisplay from "./hardware/PivotSystemEditAndDisplay";
import PinSystemEditAndDisplay from "./hardware/PinSystemEditAndDisplay";
import LatchTypeEditAndDisplay from "./hardware/LatchTypeEditAndDisplay";
import BladeTypeEditAndDisplay from "./bladeDetails/BladeTypeEditAndDisplay";
import BladeFinishEditAndDisplay from "./bladeDetails/BladeFinishEditAndDisplay";
import BladeMaterialEditAndDisplay from "./bladeDetails/BladeMaterialEditAndDisplay";
import KnifeWeightEditAndDisplay from "./main/KnifeWeightEditAndDisplay";
import OverallLengthEditAndDisplay from "./main/OverallLengthEditAndDisplay";
import HandleMaterialEditAndDisplay from "./handleDetails/HandleMaterialEditAndDisplay";
import HandleFinishEditAndDisplay from "./handleDetails/HandleFinishEditAndDisplay";

const UsersCollectionKnifeDisplay = () => {
  const [pageState, setPageState] = useState<"loading" | "error" | "success">(
    "loading"
  );

  const [collectionKnife, setCollectionKnife] =
    useState<CollectionKnife | null>(null);

  const [showDetails, toggleShowDetails] = useState(true);

  const { knife } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const collectionKnives = useAppSelector(
    (state) => state.collection.collectionKnives
  );

  useEffect(() => {
    const foundKnife = collectionKnives.find((obj) => obj.displayName == knife);
    setCollectionKnife(foundKnife!);

    console.log("knife: ", foundKnife);
    if (collectionKnife) {
      setPageState("success");
    } else {
      setPageState("error");
    }
  }, [collectionKnife]);

  if (pageState == "loading") {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (pageState == "error") {
    return (
      <div>
        <p>Error: Couldn't locate knife.</p>
      </div>
    );
  } else {
    return (
      <section className="lg:pl-[192px] pt-[64px] w-full flex flex-col items-center">
        {/*Go Back Btn*/}
        <div className="w-full p-10">
          <button
            type="button"
            className="text-xl font-bold bg-shadow p-4 rounded hover:bg-shadow-green-offset flex items-center gap-2"
            onClick={() =>
              navigate(
                `/${user?.displayName}/${user?.identifierCode}/collection`
              )
            }
          >
            <FontAwesomeIcon icon={faCircleLeft} />
            <h4>Back To Collection</h4>
          </button>
        </div>

        {/*Main Display*/}
        <div className="flex flex-col items-center bg-black max-w-[1200px] w-full mt-20 p-6 pt-0 rounded-lg relative">
          {/*Display for tags*/}
          <div className="w-full flex justify-end p-2">
            <div className="flex gap-2">
              <p>{!collectionKnife?.isFavoriteFlipper ? "Flipper" : ""}</p>
              <p>{!collectionKnife?.isFavoriteKnife ? "Favorite" : ""}</p>
            </div>
          </div>

          <div className="flex flex-row-reverse justify-between w-full">
            {/*Cover Photo Display*/}
            <div className="flex justify-center items-center w-1/2">
              <CoverPhotoEditAndDisplay
                editable
                coverPhoto={collectionKnife?.coverPhoto!}
              />
            </div>

            {/*Primary Info*/}
            <div className="w-1/2 border flex flex-col items-center p-4 gap-4 rounded-lg">
              {/*Display Name*/}
              <DisplayNameEditAndDisplayName
                editable
                displayName={collectionKnife?.displayName!}
              />

              {/*Base Model*/}
              <BaseModelEditAndDisplay
                baseModel={collectionKnife?.baseKnifeModel!}
                editable
              />

              <KnifeMakerEditAndDisplay
                knifeMaker={collectionKnife?.knifeMaker!}
                editable
              />

              <KnifeTypeEditAndDisplay
                knifeType={collectionKnife?.knifeType!}
                editable
              />

              <KnifeWeightEditAndDisplay
                editable
                knifeWeight={collectionKnife?.weight!}
              />

              <OverallLengthEditAndDisplay
                editable
                overallLength={collectionKnife?.overallLength!}
              />

              <MSRPEditAndDisplay msrp={collectionKnife?.msrp!} editable />

              <PersonalRatingDisplayAndToggle
                personalRating={collectionKnife?.averageScore!}
                editable
              />

              <BalancePointEditAndToggle
                balancePoint={
                  collectionKnife?.hasModularBalance
                    ? JSON.stringify("MODULAR")
                    : collectionKnife?.balanceValue!
                }
                editable
              />
            </div>
          </div>

          {/*Aqquired Date*/}
          <div className="mt-3 mb-3">
            <p className="text-shadow font-semibold text-lg">
              Aqquired: {collectionKnife?.aqquiredDate}
            </p>
          </div>

          {/*Addional Info: Blade Details, Handle Details, Ratings*/}
          {showDetails ? (
            <div className="w-full flex justify-evenly gap-4">
              <div className="w-1/4 border rounded-lg p-4 flex flex-col gap-4 text-lg font-semibold">
                <div className="w-full flex justify-center text-2xl font-bold">
                  <h6 className="border-b">Hardware</h6>
                </div>

                <PivotSystemEditAndDisplay
                  pivotSystem={collectionKnife?.pivotSystem!}
                  editable
                />

                <PinSystemEditAndDisplay
                  editable
                  pinSystem={collectionKnife?.pinSystem!}
                />

                <LatchTypeEditAndDisplay
                  editable
                  latchType={collectionKnife?.latchType!}
                />
              </div>

              <div className="w-1/4 border rounded-lg p-4 flex flex-col gap-4 text-lg font-semibold">
                <div className="w-full flex justify-center text-2xl font-bold">
                  <h6 className="border-b">Blade Details</h6>
                </div>

                <BladeTypeEditAndDisplay
                  editable
                  bladeType={collectionKnife?.bladeStyle!}
                />

                <BladeFinishEditAndDisplay
                  editable
                  bladeFinish={collectionKnife?.bladeFinish!}
                />

                <BladeMaterialEditAndDisplay
                  editable
                  bladeMaterial={collectionKnife?.bladeMaterial!}
                />
              </div>

              <div className="w-1/4 border rounded-lg p-4 flex flex-col gap-4 text-lg font-semibold">
                <div className="w-full flex justify-center text-2xl font-bold">
                  <h6 className="border-b">Handle Details</h6>
                </div>

                <HandleConstructionEditAndDisplay
                  editable
                  handleConstruction={collectionKnife?.handleConstruction!}
                />

                <HandleMaterialEditAndDisplay
                  editable
                  handleMaterial={collectionKnife?.handleMaterial!}
                />

                <HandleFinishEditAndDisplay
                  editable
                  handleFinish={collectionKnife?.handleFinish!}
                />
              </div>

              <div className="w-1/4 border rounded-lg p-4">
                <div className="w-full flex justify-center text-2xl font-bold">
                  <h6 className="border-b">Ratings</h6>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/*Toggle More Info*/}
          <div className="absolute bottom-0 w-full flex justify-center items-center bg-black translate-y-3">
            <button
              type="button"
              className="bg-black border-b-2 border-shadow-green-offset translate-y-5 w-96 rounded-b-lg hover:bg-shadow-green-offset"
              onClick={() => toggleShowDetails((prev) => !prev)}
            >
              {showDetails ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
          </div>
        </div>

        {/*Gallery Display*/}
        <div className="mt-20 text-3xl">
          <h6>Gallery</h6>
        </div>
      </section>
    );
  }
};

export default UsersCollectionKnifeDisplay;
