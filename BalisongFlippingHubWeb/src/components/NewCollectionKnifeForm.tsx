import {
  faChevronDown,
  faChevronUp,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import KnifeMSRPInput from "./KnifeMSRPInput";
import OverallKnifeLengthInput from "./OverallKnifeLengthInput";
import KnifeWeightInput from "./KnifeWeightInput";
import PivotSystemInput from "./PivotSystemInput";
import LatchTypeInput from "./LatchTypeInput";
import PinSystemInput from "./PinSystemInput";
import BladeStyleInput from "./BladeStyleInput";
import BladeFinishInput from "./BladeFinishInput";
import BladeMaterialInput from "./BladeMaterialInput";
import HandleConstructionInput from "./HandleConstructionInput";
import HandleMaterialInput from "./HandleMaterialInput";
import HandleFinishInput from "./HandleFinishInput";
import KnifeBalanceInput from "./KnifeBalanceInput";
import NewKnifeDisplayNameInput from "./NewKnifeDisplayNameInput";
import KnifeMakerInput from "./KnifeMakerInput";
import BaseKnifeModelInput from "./BaseKnifeModelInput";
import KnifeTypeInput from "./KnifeTypeInput";
import CollectionKnifeCoverPhotoInput from "./CollectionKnifeCoverPhotoInput";
import AqquiredDateInput from "./AqquiredDateInput";
import FavoriteKnifeInput from "./FavoriteKnifeInput";
import FavoriteFlipperInput from "./FavoriteFlipperInput";

interface params {
  setNewKnifeObjOnSubmit: Function;
  setFormNotReadyOnChange: Function;
  setStepManually: Function;
  collectionKnifeObj: CollectionKnifeDTO | null;
}

const NewCollectionKnifeForm = ({
  setNewKnifeObjOnSubmit,
  collectionKnifeObj,
  setStepManually,
  setFormNotReadyOnChange,
}: params) => {
  // states
  // form state values required info
  const [displayName, setDisplayName] = useState("");
  const [knifeMaker, setKNifeMaker] = useState("");
  const [baseKnifeModel, setBaseKnifeModel] = useState("");

  const [knifeType, setKnifeType] = useState("Live Blade");

  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);

  const [selectedDate, setSelectedDate] = useState("");

  const [isFavoriteKnife, setIsFavoriteKnife] = useState(false);
  const [isFavoriteFlipper, setIsFavoriteFlipper] = useState(false);

  // form state values knife info
  const [knifeMSRP, setKnifeMSRP] = useState("");
  const [overallLength, setOverallLength] = useState("");
  const [knifeWeight, setKnifeWeight] = useState("");
  const [pivotSystem, setPivotSystem] = useState("Unknown");
  const [latchType, setLatchType] = useState("Unknown");
  const [pinSystem, setPinSystem] = useState("Unknown");
  const [balance, setBalance] = useState<Number | null>(null);
  const [hasModualtedBalance, setHasModulatedBalance] = useState(false);

  const [bladeStyle, setBladeStyle] = useState("Unknown");
  const [bladeFinish, setBladeFinish] = useState("Unknown");
  const [bladeMaterial, setBladeMaterial] = useState("Unknown");

  const [handleConstruction, setHandleConstruction] = useState("Unknown");
  const [handleMaterial, setHandleMaterial] = useState("Unknown");
  const [handleFinish, setHandleFinish] = useState("Unknown");

  // form state values rankings
  const [averageScore, setAverageScore] = useState<Number | null>(null);

  const [qualityScore, setQualityScore] = useState(5);
  const [flippingScore, setFlippingScore] = useState(5);
  const [feelScore, setFeelScore] = useState(5);
  const [soundScore, setSoundScore] = useState(5);
  const [durabilityScore, setDurabilityScore] = useState(5);

  // form state values mod work

  // additional state values
  const [displayAdditionalKnifeInfo, toggleDisplayAdditionalKnifeInfo] =
    useState(false);
  const [displayRankingsInfo, toggleDisplayRankingsInfo] = useState(false);
  const [displayModWork, toggleDisplayModWork] = useState(false);

  const fillForm = () => {
    if (collectionKnifeObj !== null) {
      setDisplayName(collectionKnifeObj.displayName);
      setKNifeMaker(collectionKnifeObj.knifeMaker);
      setBaseKnifeModel(collectionKnifeObj.baseKnifeModel);
      setKnifeType(collectionKnifeObj.knifeType);
      setSelectedDate(collectionKnifeObj.aqquiredDate);
      setIsFavoriteKnife(collectionKnifeObj.isFavoriteKnife);
      setIsFavoriteFlipper(collectionKnifeObj.isFavoriteFlipper);
      setSelectedCoverFile(collectionKnifeObj.coverPhoto);

      setKnifeMSRP(collectionKnifeObj.msrp);
      setOverallLength(collectionKnifeObj.overallLength);
      setKnifeWeight(collectionKnifeObj.weight);
      setPivotSystem(collectionKnifeObj.pivotSystem);
      setLatchType(collectionKnifeObj.latchType);
      setPinSystem(collectionKnifeObj.pinSystem);
      setHasModulatedBalance(collectionKnifeObj.hasModularBalance);
      setBalance(collectionKnifeObj.balanceValue);

      setBladeStyle(collectionKnifeObj.bladeStyle);
      setBladeFinish(collectionKnifeObj.bladeFinish);
      setBladeMaterial(collectionKnifeObj.bladeMaterial);

      setHandleConstruction(collectionKnifeObj.handleConstruction);
      setHandleMaterial(collectionKnifeObj.handleMaterial);
      setHandleFinish(collectionKnifeObj.handleFinish);

      setAverageScore(collectionKnifeObj.averageScore);
      setQualityScore(collectionKnifeObj.qualityScore);
      setFlippingScore(collectionKnifeObj.flippingScore);
      setFeelScore(collectionKnifeObj.feelScore);
      setDurabilityScore(collectionKnifeObj.durabilityScore);
      setSoundScore(collectionKnifeObj.soundScore);
    }
  };

  const updateParent = () => {
    const obj = {
      displayName: displayName,
      knifeMaker: knifeMaker,
      baseKnifeModel: baseKnifeModel,
      knifeType: knifeType,
      coverPhoto: selectedCoverFile,
      aqquiredDate: selectedDate,

      isFavoriteFlipper: isFavoriteFlipper,
      isFavoriteKnife: isFavoriteKnife,

      msrp: knifeMSRP,
      overallLength: overallLength,
      weight: knifeWeight,
      pivotSystem: pivotSystem,
      latchType: latchType,
      pinSystem: pinSystem,
      hasModularBalance: hasModualtedBalance,
      balanceValue: balance,

      bladeStyle: bladeStyle,
      bladeFinish: bladeFinish,
      bladeMaterial: bladeMaterial,

      handleConstruction: handleConstruction,
      handleMaterial: handleMaterial,
      handleFinish: handleFinish,

      averageScore: averageScore,
      qualityScore: qualityScore,
      flippingScore: flippingScore,
      feelScore: feelScore,
      soundScore: soundScore,
      durabilityScore: durabilityScore,
    } as CollectionKnifeDTO;

    console.log("new knife obj: ", obj);
    setNewKnifeObjOnSubmit(obj);
  };

  // on form submit
  const handleFormSubmit = (e: any) => {
    if (e) e.preventDefault();

    updateParent();
  };

  // on change functions
  const setDisplayNameOnChange = (input: string) => {
    setDisplayName(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setKnifeMakerOnChange = (input: string) => {
    setKNifeMaker(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setBaseKnifeModelOnChange = (input: string) => {
    setBaseKnifeModel(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setKnifeTypeOnchange = (input: string) => {
    setKnifeType(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setCoverFileOnChange = (input: File | null) => {
    setSelectedCoverFile(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setAqquiredDateOnChange = (input: string) => {
    setSelectedDate(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setIsFavoriteKnifeOnChange = () => {
    setIsFavoriteKnife((prev) => !prev);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setIsFavoriteFlipperOnChange = () => {
    setIsFavoriteFlipper((prev) => !prev);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const qualityScaleOnChange = (e: any) => {
    setQualityScore(e.target.value);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }

    if (averageScore == null) {
      setAverageScore(0);
    }
  };

  const flippingScaleOnChange = (e: any) => {
    setFlippingScore(e.target.value);

    if (averageScore == null) {
      setAverageScore(0);
    }

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const feelScaleOnChange = (e: any) => {
    setFeelScore(e.target.value);

    if (averageScore == null) {
      setAverageScore(0);
    }

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const soundScaleOnChange = (e: any) => {
    setSoundScore(e.target.value);

    if (averageScore == null) {
      setAverageScore(0);
    }

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const durabilityScaleOnChange = (e: any) => {
    setDurabilityScore(e.target.value);

    if (averageScore == null) {
      setAverageScore(0);
    }

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setKnifeMSRPOnChange = (input: string) => {
    setKnifeMSRP(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setOverallLengthOnChange = (input: string) => {
    setOverallLength(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setKnifeWeightOnChange = (input: string) => {
    setKnifeWeight(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setPivotSystemOnChange = (input: string) => {
    setPivotSystem(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setLatchTypeOnChange = (input: string) => {
    setLatchType(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setPinSystemOnChange = (input: string) => {
    setPinSystem(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setHasModulatedBalanceOnChange = (input: boolean) => {
    setHasModulatedBalance(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setBalanceOnChange = (input: number) => {
    setBalance(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
    console.log("called");
  };

  const setBladeStyleOnChange = (input: string) => {
    setBladeStyle(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setBladeFinishOnChange = (input: string) => {
    setBladeFinish(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setBladeMaterialOnChange = (input: string) => {
    setBladeMaterial(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setHandleConstructionOnChange = (input: string) => {
    setHandleConstruction(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setHandleMaterialOnChange = (input: string) => {
    setHandleMaterial(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  const setHandleFinishOnChange = (input: string) => {
    setHandleFinish(input);

    if (collectionKnifeObj !== null) {
      setFormNotReadyOnChange();
    }
  };

  useEffect(() => {
    if (averageScore != null)
      setAverageScore(
        (+qualityScore +
          +flippingScore +
          +feelScore +
          +soundScore +
          +durabilityScore) /
          5
      );
  }, [qualityScore, flippingScore, feelScore, soundScore, durabilityScore]);

  // on mount
  useEffect(() => {
    fillForm();
  }, []);

  return (
    <section className="max-w-[1450px] w-full h-full lg:ml-48 mt-30 flex flex-col pt-24 items-center gap-10 md:pb-10">
      <div className="flex lg:w-5/6 md:w-[92%] xsm:w-full relative justify-center">
        <h2 className="justify-self-center md:text-4xl xsm:text-3xl">
          Add New Knife
        </h2>

        {collectionKnifeObj === null ? (
          <button
            type="button"
            disabled
            className="flex items-center gap-2 md:text-2xl xsm:text-lg border p-2 absolute md:right-0 xsm:right-4"
          >
            <h3>Gallery</h3>
            <FontAwesomeIcon icon={faCircleArrowRight} />
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center gap-2 md:text-2xl xsm:text-lg border p-2 absolute md:right-0 xsm:right-4 hover:bg-shadow-green-offset"
            onClick={() => setStepManually("2")}
          >
            <h3>Gallery</h3>
            <FontAwesomeIcon icon={faCircleArrowRight} />
          </button>
        )}
      </div>

      <form
        className="lg:w-5/6 md:w-[92%] xsm:w-full bg-shadow-green-offset p-4 xsm:pb-8 md:pb-4 flex flex-col gap-3 mb-20 rounded"
        onSubmit={handleFormSubmit}
      >
        {/*Major Info*/}
        <div className="flex xsm:flex-col-reverse md:flex-row md:justify-between xsm:justify-center xsm:items-center gap-4">
          <div className="w-full flex flex-col gap-3">
            {/*Display Name for new knife*/}
            <NewKnifeDisplayNameInput
              setDisplayNameOnChange={setDisplayNameOnChange}
              parentDisplayName={displayName}
            />

            {/*Knife Manufactuer Info*/}
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold">Manufactuer Info</h3>

              <div className="border-4 border-black border-dashed p-3 flex flex-col gap-2">
                {/*Knife Manufactuer*/}
                <KnifeMakerInput
                  setKnifeMakerOnChange={setKnifeMakerOnChange}
                  parentKnifeMaker={knifeMaker}
                />

                {/*Base Knife Model*/}
                <BaseKnifeModelInput
                  setBaseKnifeModelOnChange={setBaseKnifeModelOnChange}
                  parentBaseKnifeModel={baseKnifeModel}
                />

                {/*Radio Button Selection for Live Blade, Trainer, or Both*/}
                <KnifeTypeInput
                  setKnifeTypeOnChange={setKnifeTypeOnchange}
                  parentKnifeType={knifeType}
                />
              </div>
            </div>
          </div>

          {/*Cover Image Input and Display for Image*/}
          <CollectionKnifeCoverPhotoInput
            setCoverFileOnChange={setCoverFileOnChange}
            parentCoverFile={selectedCoverFile}
          />
        </div>

        {/*Extra Required Knife Info*/}
        <div className="flex xsm:flex-col md:flex-row xsm:items-center xsm:gap-4 justify-between">
          {/*Aqquired Date*/}
          <AqquiredDateInput
            setAqquiredDateOnChange={setAqquiredDateOnChange}
            parentAqquiredDate={selectedDate}
          />

          <div className="flex justify-between md:w-2/3 xsm:w-full">
            {/*Mark As Favorite Knife*/}
            <FavoriteKnifeInput
              setIsFavoriteKnifeOnChange={setIsFavoriteKnifeOnChange}
              parentIsFavoriteKnife={isFavoriteKnife}
            />

            {/*Mark As Favorite Flipper*/}
            <FavoriteFlipperInput
              setIsFavoriteFlipperOnChange={setIsFavoriteFlipperOnChange}
              parentIsFavoriteFlipper={isFavoriteFlipper}
            />
          </div>
        </div>

        <span className="w-full h-2 bg-shadow-green rounded"></span>

        {/*Additional Knife Info*/}
        <div>
          <div
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={() => toggleDisplayAdditionalKnifeInfo((prev) => !prev)}
          >
            <h3 className="text-lg font-bold">Additional Knife Info</h3>
            {!displayAdditionalKnifeInfo ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>

          {displayAdditionalKnifeInfo ? (
            <div className="flex flex-col">
              {/*Knife Specs*/}
              <div className="flex flex-col items-center gap-2">
                <div className="text-xl font-bold border-b-4 border-dashed border-shadow-green w-full flex justify-center p-1">
                  <h4>Specs</h4>
                </div>

                <div className="w-full flex xsm:flex-col md:flex-row justify-between items-center">
                  <KnifeMSRPInput
                    setKnifeMSRPOnChange={setKnifeMSRPOnChange}
                    parentMSRP={knifeMSRP}
                  />

                  <OverallKnifeLengthInput
                    setOverallLengthOnChange={setOverallLengthOnChange}
                    parentKnifeLength={overallLength}
                  />

                  <KnifeWeightInput
                    setKnifeWeightOnChange={setKnifeWeightOnChange}
                    parentWeight={knifeWeight}
                  />
                </div>

                <div className="w-full flex md:flex-row xsm:flex-col justify-between xsm:items-center gap-4">
                  <PivotSystemInput
                    setPivotSystemOnChange={setPivotSystemOnChange}
                    parentPivotSystem={pivotSystem}
                  />

                  <LatchTypeInput
                    setLatchTypeOnChange={setLatchTypeOnChange}
                    parentLatchType={latchType}
                  />

                  <PinSystemInput
                    setPinSystemOnChange={setPinSystemOnChange}
                    parentPinSystem={pinSystem}
                  />
                </div>

                <KnifeBalanceInput
                  setBalanceOnChange={setBalanceOnChange}
                  setHasModulatedBalanceOnChange={
                    setHasModulatedBalanceOnChange
                  }
                  parentBalanceValue={balance}
                  parentHasModulatedBalance={hasModualtedBalance}
                />
              </div>

              {/*Blade Info*/}
              <div className="flex flex-col items-center gap-6 mb-6">
                <div className="text-xl font-bold border-b-4 border-shadow-green border-dashed w-full flex justify-center p-1">
                  <h4>Blade</h4>
                </div>

                <div className="flex md:flex-row xsm:flex-col justify-evenly items-center w-full gap-4">
                  <BladeStyleInput
                    setBladeStyleOnChange={setBladeStyleOnChange}
                    parentBladeStyle={bladeStyle}
                  />

                  <BladeFinishInput
                    setBladeFinishOnChange={setBladeFinishOnChange}
                    parentBladeFinish={bladeFinish}
                  />

                  <BladeMaterialInput
                    setBladeMaterialOnChange={setBladeMaterialOnChange}
                    parentBladeMaterial={bladeMaterial}
                  />
                </div>
              </div>

              {/*Handles Info*/}
              <div className="flex flex-col items-center gap-2">
                <div className="text-xl font-bold border-b-4 border-dashed border-shadow-green w-full flex justify-center p-1">
                  <h4>Handles</h4>
                </div>

                <div className="flex md:flex-row xsm:flex-col justify-evenly items-center w-full pt-5 pb-5 gap-4">
                  <HandleConstructionInput
                    setHandleConstructionOnChange={
                      setHandleConstructionOnChange
                    }
                    parentHandleConstruction={handleConstruction}
                  />

                  <HandleMaterialInput
                    setHandleMaterialOnChange={setHandleMaterialOnChange}
                    parentHandleMaterial={handleMaterial}
                  />

                  <HandleFinishInput
                    setHandleFinishOnChange={setHandleFinishOnChange}
                    parentHandleFinish={handleFinish}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <span className="w-full h-2 bg-shadow-green rounded"></span>

        {/*Rankings*/}
        <div>
          <div
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={() => toggleDisplayRankingsInfo((prev) => !prev)}
          >
            <h3 className="text-lg font-bold">Rankings</h3>
            {!displayRankingsInfo ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>

          {displayRankingsInfo ? (
            <div className="w-full flex flex-col gap-2">
              {/*Overall Score*/}
              <div className="flex flex-col items-center justify-center gap-1 text-lg">
                <h5>Overall Score</h5>
                <h6>
                  {averageScore == null ? "-" : averageScore.toString()}/10
                </h6>
              </div>

              {/*Quality Scale*/}
              <div className="flex flex-col items-center">
                <label>Quality</label>
                <h3>{qualityScore}</h3>
                <div className="w-full flex justify-evenly items-center gap-2">
                  <h6>Poor</h6>
                  <input
                    type="range"
                    className="w-full"
                    min={0}
                    max={10}
                    value={qualityScore}
                    onChange={(e) => {
                      qualityScaleOnChange(e);
                    }}
                  />
                  <h6>Fantastic</h6>
                </div>
              </div>

              {/*Flippability Scale*/}
              <div className="flex flex-col items-center">
                <label>Flipping</label>
                <h3>{flippingScore}</h3>
                <div className="w-full flex justify-evenly items-center gap-2">
                  <h6>Poor</h6>
                  <input
                    type="range"
                    className="w-full"
                    min={0}
                    max={10}
                    value={flippingScore}
                    onChange={(e) => {
                      flippingScaleOnChange(e);
                    }}
                  />
                  <h6>Fantastic</h6>
                </div>
              </div>

              {/*Feel Scale*/}
              <div className="flex flex-col items-center">
                <label>Feel</label>
                <h3>{feelScore}</h3>
                <div className="w-full flex justify-evenly items-center gap-2">
                  <h6>Poor</h6>
                  <input
                    type="range"
                    className="w-full"
                    min={0}
                    max={10}
                    value={feelScore}
                    onChange={(e) => {
                      feelScaleOnChange(e);
                    }}
                  />
                  <h6>Fantastic</h6>
                </div>
              </div>

              {/*Sound Scale*/}
              <div className="flex flex-col items-center">
                <label>Sound</label>
                <h3>{soundScore}</h3>
                <div className="w-full flex justify-evenly items-center gap-2">
                  <h6>Poor</h6>
                  <input
                    type="range"
                    className="w-full"
                    min={0}
                    max={10}
                    value={soundScore}
                    onChange={(e) => {
                      soundScaleOnChange(e);
                    }}
                  />
                  <h6>Fantastic</h6>
                </div>
              </div>

              {/*Durability Scale*/}
              <div className="flex flex-col items-center">
                <label>Durability</label>
                <h3>{durabilityScore}</h3>
                <div className="w-full flex justify-evenly items-center gap-2">
                  <h6>Poor</h6>
                  <input
                    type="range"
                    className="w-full"
                    min={0}
                    max={10}
                    value={durabilityScore}
                    onChange={(e) => {
                      durabilityScaleOnChange(e);
                    }}
                  />
                  <h6>Fantastic</h6>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <span className="w-full h-2 bg-shadow-green"></span>

        {/*Mod Work*/}
        <div>
          <div
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={() => toggleDisplayModWork((prev) => !prev)}
          >
            <h3 className="text-lg font-bold">Mod Work</h3>
            {!displayModWork ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>

          {displayModWork ? <>display</> : <></>}
        </div>

        <span className="w-full h-2 bg-shadow-green"></span>

        {/*Submit Button*/}
        {!(
          displayName === "" ||
          knifeMaker === "" ||
          baseKnifeModel === "" ||
          selectedCoverFile === null ||
          selectedDate === ""
        ) ? (
          <button
            type="submit"
            className="bg-shadow-green w-1/4 m-auto p-4 rounded border border-black text-lg font-bold"
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            disabled
            className="p-4 bg-shadow border border-black rounded w-1/4 m-auto text-lg text-black font-bold"
          >
            Submit
          </button>
        )}
      </form>
    </section>
  );
};

export default NewCollectionKnifeForm;
