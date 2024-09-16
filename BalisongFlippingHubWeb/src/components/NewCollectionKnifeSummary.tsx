import {
  faCircleArrowLeft,
  faCircleArrowRight,
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
  return (
    <section className="w-full flex flex-col items-center pt-[64px] lg:pl-[192px]">
      {/*Top Navigation*/}
      <div className="w-full max-w-[1225px] p-4 flex justify-center relative">
        <button
          type="button"
          className="absolute right-4 border p-2 text-2xl flex items-center hover:bg-shadow-green-offset gap-2"
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
          <div className="text-2xl font-bold border-b-2 p-1">
            <h4>{newKnifeObj?.displayName}</h4>
          </div>

          <button
            className="absolute top-4 right-4"
            onClick={() => setStepManually("2")}
            type="button"
          >
            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
          </button>

          <div className="flex w-full gap-4">
            <div className="flex flex-col w-2/3 gap-4">
              <div className="flex justify-evenly">
                <div className="flex gap-2 text-xl">
                  <h5>Base Knife Model:</h5>
                  <h5 className="text-shadow">{newKnifeObj?.baseKnifeModel}</h5>
                </div>

                <div className="flex gap-2 text-xl">
                  <h5>Knife Maker:</h5>
                  <h5 className="text-shadow">{newKnifeObj?.knifeMaker}</h5>
                </div>
              </div>

              <div className="flex justify-evenly">
                <div className="flex gap-2 text-xl">
                  <h5>{`Knife Type (Trainer, Live Blade, Both):`}</h5>
                  <h5 className="text-shadow">{newKnifeObj?.knifeType}</h5>
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex gap-2 text-xl">
                  <h5>Marked As Favorite Knife:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.isFavoriteKnife ? "True" : "False"}
                  </h5>
                </div>

                <div className="flex gap-2 text-xl">
                  <h5>Marked As Favorite Flipper:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.isFavoriteFlipper ? "True" : "False"}
                  </h5>
                </div>
              </div>

              <div className="flex justify-evenly">
                <div className="flex gap-2 text-xl">
                  <h5>Knife MSRP:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.msrp && +newKnifeObj.msrp > 0
                      ? "$" + newKnifeObj.msrp
                      : "---"}
                  </h5>
                </div>

                <div className="flex gap-2 text-xl">
                  <h5>Overall Length:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.overallLength &&
                    +newKnifeObj.overallLength > 0
                      ? newKnifeObj.overallLength + `"`
                      : "---"}
                  </h5>
                </div>

                <div className="flex gap-2 text-xl">
                  <h5>Weight:</h5>
                  <h5 className="text-shadow">
                    {newKnifeObj?.weight && +newKnifeObj.weight > 0
                      ? newKnifeObj.weight + "g"
                      : "---"}
                  </h5>
                </div>
              </div>

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

            <div className="w-1/3 h-full">
              {newKnifeObj && newKnifeObj.coverPhoto ? (
                <img
                  src={URL.createObjectURL(newKnifeObj.coverPhoto)}
                  className="object-cover w-full h-full rounded"
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="w-full border-t flex flex-col relative items-center">
            <div className="absolute -top-5 flex w-full justify-center">
              <h4 className="text-2xl bg-black">Rankings</h4>
            </div>

            <div className="text-xl flex gap-2 mt-4">
              <h5>Overall Score:</h5>
              <h5 className="text-shadow">
                {newKnifeObj?.averageScore ? newKnifeObj.averageScore : "--"}
              </h5>
            </div>
          </div>

          <div className="flex gap-2">
            <h5>Aqquired Date:</h5>
            <h5>{newKnifeObj?.aqquiredDate}</h5>
          </div>
        </div>

        {/*Gallery Files Display*/}
        {galleryFiles && galleryFiles.length > 0 ? (
          <section
            className="bg-black rounded"
            onClick={() => setStepManually("2")}
          >
            <div className="mt-4 mb-4 w-full flex justify-center text-2xl font-bold">
              <h4 className="border-b-2 pb-1">Gallery Files</h4>
            </div>

            <div className="flex w-full flex-wrap">
              {galleryFiles.map((file, i) => {
                return (
                  <div key={i} className="h-52 w-1/5">
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
        <div className="w-full flex justify-center items-center mb-24 mt-6">
          <button
            type="button"
            onClick={() => setStepManually("4")}
            className="p-2 rounded bg-black hover:bg-shadow-green-offset text-xl"
          >
            Submit Knife
          </button>
        </div>
      </section>
    </section>
  );
};

export default NewCollectionKnifeSummary;
