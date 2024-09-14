import {
  faCircleArrowLeft,
  faCircleArrowRight,
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

      <section className="w-full max-w-[1225px] flex flex-col gap-4">
        {/*Form Data Display*/}
        <div className="w-full bg-black p-4 rounded flex flex-col items-center">
          <div className="text-2xl font-bold border-b-2 p-1">
            <h4>{newKnifeObj?.displayName}</h4>
          </div>

          <div className="flex w-full justify-between flex-row-reverse items-center">
            <div className="flex gap-2">
              <h5>Cover Photo:</h5>
              {newKnifeObj?.coverPhoto === null ||
              newKnifeObj?.coverPhoto === undefined ? (
                <div className="w-60 h-60">
                  <h5>Error</h5>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(newKnifeObj?.coverPhoto)}
                  className="object-cover w-60 h-60"
                />
              )}
            </div>

            <div className="flex gap-2">
              <h5>Base Model:</h5>
              <h5>{newKnifeObj?.baseKnifeModel}</h5>
            </div>

            <div className="flex gap-2">
              <h5>Knife Maker:</h5>
              <h5>{newKnifeObj?.knifeMaker}</h5>
            </div>
          </div>

          <div className="flex gap-2">
            <h5>Aqquired Date:</h5>
            <h5>{newKnifeObj?.aqquiredDate}</h5>
          </div>
        </div>

        {/*Gallery Files Display*/}
        {galleryFiles && galleryFiles.length > 0 ? (
          <div className="bg-black rounded">
            <div className="p-2">
              <h4>Gallery Files</h4>
            </div>

            <div className="flex w-full flex-wrap">
              {galleryFiles.map((file, i) => {
                return (
                  <div
                    key={i}
                    className="h-52 w-1/5"
                    onClick={() => setStepManually("2")}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      className="object-cover w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/*Submit Button*/}
        <div className="w-full flex justify-center items-center">
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
