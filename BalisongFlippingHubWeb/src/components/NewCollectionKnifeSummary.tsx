import {
  faCircleArrowLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface params {
  galleryFiles: Array<File> | null;
  newKnifeObj: CollectionKnifeDTO | null;
  setStepManually: Function;
}

const NewCollectionKnifeSummary = ({
  galleryFiles,
  newKnifeObj,
  setStepManually,
}: params) => {
  const getBalancePoint = () => {
    console.log(newKnifeObj?.balanceValue);
    switch (newKnifeObj?.balanceValue?.toString()) {
      case "0":
        return "Heavy Blade Bias";
      case "1":
        return "Blade Bias";
      case "2":
        return "Moderate Blade Bias";
      case "3":
        return "Nuetral";
      case "4":
        return "Moderate Handle Bias";
      case "5":
        return "Handle Bias";
      case "6":
        return "Heavy Handle Bias";
      default:
        return "Error";
    }
  };

  return (
    <section className="w-full flex flex-col items-center pt-[64px] lg:pl-[192px]">
      {/*Top Navigation*/}
      <div className="w-full max-w-[1225px] p-4 flex justify-center relative">
        <button
          type="button"
          className="absolute left-4 border p-2 text-2xl flex items-center hover:bg-shadow-green-offset gap-2"
          onClick={() => setStepManually("2")}
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} />
          <h5>Gallery</h5>
        </button>

        <h3 className="text-4xl font-bold">Summary</h3>
      </div>

      <section className="w-full max-w-[1225px] flex flex-col gap-4 mt-3 rounded">
        {/*Form Data Display*/}
        <div
          className="w-full bg-black p-4 rounded flex flex-col items-center gap-4 relative"
          onClick={() => setStepManually("1")}
        >
          {/*Display Name*/}
          <div className="text-2xl font-bold border-b-2 p-1">
            <h4>{newKnifeObj?.displayName}</h4>
          </div>

          {/*Edit form btn*/}
          <button
            className="absolute top-4 right-4"
            onClick={() => setStepManually("1")}
            type="button"
          >
            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
          </button>

          <div className="flex md:flex-row xsm:flex-col-reverse items-center w-full gap-4">
            <div className="flex flex-col md:w-2/3 xsm:w-full gap-4">
              {/*Base Knife Model and Knife Maker*/}
              <div className="flex justify-evenly sm:flex-row xsm:flex-col items-center">
                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>Base Knife Model:</h5>
                  <h5 className="text-shadow">{newKnifeObj?.baseKnifeModel}</h5>
                </div>

                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>Knife Maker:</h5>
                  <h5 className="text-shadow">{newKnifeObj?.knifeMaker}</h5>
                </div>
              </div>

              {/*Knife Type*/}
              <div className="flex justify-center">
                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>{`Knife Type (Trainer, Live Blade, Both):`}</h5>
                  <h5 className="text-shadow">{newKnifeObj?.knifeType}</h5>
                </div>
              </div>

              {/*Marked as Favorite Knife and Favorite Flipper*/}
              <div className="flex sm:flex-row xsm:flex-col justify-around items-center">
                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>Marked As Favorite Knife:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.isFavoriteKnife ? "True" : "False"}
                  </h5>
                </div>

                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>Marked As Favorite Flipper:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.isFavoriteFlipper ? "True" : "False"}
                  </h5>
                </div>
              </div>

              {/*Knife MSRP, Overall Length, and Weight*/}
              <div className="flex justify-evenly">
                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>Knife MSRP:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.msrp && +newKnifeObj.msrp > 0
                      ? "$" + newKnifeObj.msrp
                      : "---"}
                  </h5>
                </div>

                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>Overall Length:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.overallLength &&
                    +newKnifeObj.overallLength > 0
                      ? newKnifeObj.overallLength + `"`
                      : "---"}
                  </h5>
                </div>

                <div className="flex gap-2 md:text-xl xsm:text-lg">
                  <h5>Weight:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.weight && +newKnifeObj.weight > 0
                      ? newKnifeObj.weight + "g"
                      : "---"}
                  </h5>
                </div>
              </div>

              {/*Pin System, Latch Type, Pivot System*/}
              <div className="flex justify-around">
                <div className="flex gap-2 text-xl">
                  <h5>Pivot System:</h5>
                  <h5 className="text-shadow">{newKnifeObj?.pivotSystem}</h5>
                </div>

                <div className="flex gap-2 text-xl">
                  <h5>Latch Type:</h5>
                  <h5 className="text-shadow">{newKnifeObj?.latchType}</h5>
                </div>

                <div className="flex gap-2 text-xl">
                  <h5>Pin System:</h5>
                  <h5 className="text-shadow">{newKnifeObj?.pinSystem}</h5>
                </div>
              </div>

              {/*Knife Balance*/}
              <div className="w-full flex justify-center">
                {newKnifeObj?.hasModularBalance ? (
                  <div className="flex gap-2 text-xl">
                    <h5>Has Modular Balance:</h5>
                    <h5 className="text-shadow">True</h5>
                  </div>
                ) : (
                  <div className="flex w-full justify-center gap-20">
                    <div className="flex gap-2 text-xl">
                      <h5>Has Modular Balance:</h5>
                      <h5 className="text-shadow">False</h5>
                    </div>

                    <div className="flex gap-2 text-xl">
                      <h5>Balance:</h5>
                      <h5 className="text-shadow">{getBalancePoint()}</h5>
                    </div>
                  </div>
                )}
              </div>

              {/*Blade Details*/}
              <div className="w-full border-t relative flex mt-4">
                <div className="absolute -top-5 flex w-full justify-center text-2xl">
                  <h4 className="bg-black">Blade Details</h4>
                </div>

                <div className="flex justify-around w-full mt-4">
                  <div className="flex gap-2 text-xl">
                    <h5>Blade Finish:</h5>
                    <h5 className="text-shadow">{newKnifeObj?.bladeFinish}</h5>
                  </div>

                  <div className="flex gap-2 text-xl">
                    <h5>Blade Material:</h5>
                    <h5 className="text-shadow">
                      {newKnifeObj?.bladeMaterial}
                    </h5>
                  </div>

                  <div className="flex gap-2 text-xl">
                    <h5>Blade Style:</h5>
                    <h5 className="text-shadow">{newKnifeObj?.bladeStyle}</h5>
                  </div>
                </div>
              </div>

              {/*Handle Details*/}
              <div className="w-full border-t relative flex mt-4">
                <div className="absolute -top-5 flex w-full justify-center text-2xl">
                  <h4 className="bg-black">Handle Details</h4>
                </div>

                <div className="flex justify-around w-full mt-4">
                  <div className="flex gap-2 text-xl">
                    <h5>Handle Finish:</h5>
                    <h5 className="text-shadow">{newKnifeObj?.handleFinish}</h5>
                  </div>

                  <div className="flex gap-2 text-xl">
                    <h5>Handle Construction:</h5>
                    <h5 className="text-shadow">
                      {newKnifeObj?.handleConstruction}
                    </h5>
                  </div>

                  <div className="flex gap-2 text-xl">
                    <h5>Handle Material:</h5>
                    <h5 className="text-shadow">
                      {newKnifeObj?.handleMaterial}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/*Cover Photo*/}
            <div className="w-1/3 h-full">
              <div className="w-full flex justify-center mb-4 text-xl">
                <h5>Cover Photo</h5>
              </div>
              {newKnifeObj && newKnifeObj.coverPhoto ? (
                <img
                  src={URL.createObjectURL(newKnifeObj.coverPhoto)}
                  className="object-cover w-full h-96 rounded hover:cursor-pointer"
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/*Knife Rankings*/}
          <div className="w-full border-t flex flex-col relative items-center">
            <div className="absolute -top-5 flex w-full justify-center">
              <h4 className="text-2xl bg-black">Rankings</h4>
            </div>

            <div className="text-2xl flex gap-2 mt-4">
              <h5>Overall Score:</h5>
              <h5 className="text-shadow">
                {newKnifeObj?.averageScore
                  ? newKnifeObj.averageScore + "/10"
                  : "--/10"}
              </h5>
            </div>

            {newKnifeObj?.averageScore ? (
              <div className="flex flex-col gap-4 mt-2 w-2/3">
                <div className="flex justify-around w-full">
                  <div className="flex flex-col items-center text-lg font-semibold">
                    <h5>Quality Score</h5>
                    <h5 className="text-shadow">
                      {newKnifeObj.qualityScore}/10
                    </h5>
                  </div>

                  <div className="flex flex-col items-center text-lg font-semibold">
                    <h5>Flipping Score</h5>
                    <h5 className="text-shadow">
                      {newKnifeObj.flippingScore}/10
                    </h5>
                  </div>

                  <div className="flex flex-col items-center text-lg font-semibold">
                    <h5>Feel Score</h5>
                    <h5 className="text-shadow">{newKnifeObj.feelScore}/10</h5>
                  </div>
                </div>

                <div className="flex w-full justify-around">
                  <div className="flex flex-col items-center text-lg font-semibold">
                    <h5>Sound Score</h5>
                    <h5 className="text-shadow">{newKnifeObj.soundScore}/10</h5>
                  </div>

                  <div className="flex flex-col items-center text-lg font-semibold">
                    <h5>Durability Score</h5>
                    <h5 className="text-shadow">
                      {newKnifeObj.durabilityScore}/10
                    </h5>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/*Aqquired Date*/}
          <div className="flex gap-2">
            <h5>Aqquired Date:</h5>
            <h5>{newKnifeObj?.aqquiredDate}</h5>
          </div>
        </div>

        {/*Gallery Files Display*/}
        {galleryFiles && galleryFiles.length > 0 ? (
          <section
            className="bg-black rounded relative pb-10"
            onClick={() => setStepManually("2")}
          >
            <div className="mt-4 mb-4 w-full flex justify-center text-2xl font-bold">
              <h4 className="border-b-2 pb-1">Gallery Files</h4>
            </div>

            {/*Edit Gallery Btn*/}
            <button
              className="absolute top-4 right-4"
              onClick={() => setStepManually("2")}
              type="button"
            >
              <FontAwesomeIcon icon={faPenToSquare} size="xl" />
            </button>

            {/*Selected Files Display*/}
            <div className="flex w-full flex-wrap">
              {galleryFiles.map((file, i) => {
                return (
                  <div key={i} className="h-52 w-1/5 hover:cursor-pointer">
                    <img
                      src={URL.createObjectURL(file)}
                      className="object-cover w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <></>
        )}

        {/*Submit Button*/}
        <div className="w-full flex justify-center items-center lg:mb-24 xsm:mb-32 mt-6">
          <button
            type="button"
            onClick={() => setStepManually("4")}
            className="p-4 rounded border hover:bg-shadow-green-offset md:text-2xl xsm:text-lg font-bold"
          >
            Submit Knife
          </button>
        </div>
      </section>
    </section>
  );
};

export default NewCollectionKnifeSummary;
