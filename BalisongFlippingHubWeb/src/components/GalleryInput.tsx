import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

interface params {
  updateGalleryFiles: Function;
  setStepManually: Function;
  galleryFiles: Array<File> | null;
}

const GalleryInput = ({
  updateGalleryFiles,
  setStepManually,
  galleryFiles,
}: params) => {
  const filesInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(
    galleryFiles
  );
  const [selectedFilesNames, setSelectedFilesNames] = useState<Array<string>>(
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const checkSelectedFileExistance = (file: File) => {
    if (selectedFiles !== null) {
      for (var i = 0; i < selectedFiles?.length!; i++) {
        if (
          file.size === selectedFiles[i].size &&
          file.type === selectedFiles[i].type
        )
          return true;
      }
    }

    return false;
  };

  const handleOnChange = (e: any) => {
    const files = e.target.files;
    const arr: Array<File> = [];
    const arrNames: Array<string> = [];

    if (selectedFiles?.length! >= 10) return;

    for (var i = 0; i < files.length; i++) {
      // check to make sure size doesn't get above 10
      if (selectedFiles !== null) {
        if (selectedFiles.length + arr.length === 10) break;
      } else {
        if (arr.length === 10) break;
      }

      // check for file already existing in selected files
      if (checkSelectedFileExistance(files[i])) continue;

      arr.push(files[i]);
      arrNames.push(files[i].name);
    }

    if (selectedFiles === null) {
      setSelectedFiles(arr);
    } else {
      const combinedArr: Array<File> = [...selectedFiles, ...arr];
      setSelectedFiles(combinedArr);
    }

    setSelectedFilesNames([]);
  };

  const removeFile = (index: number) => {
    if (selectedFiles !== null) {
      if (currentIndex === selectedFiles.length - 1) {
        if (currentIndex !== 0) setCurrentIndex((prev) => prev - 1);
      }

      const newArr: Array<File> = selectedFiles.filter((_file, i) => {
        return index !== i;
      });

      setSelectedFiles(newArr);
    }
  };

  useEffect(() => {
    console.log("running effect");
    updateGalleryFiles(selectedFiles);
  }, [removeFile, setSelectedFiles]);

  return (
    <section className="flex flex-col pt-[58px] h-screen w-full lg:pl-[192px]">
      {/*Title*/}
      <div className="text-3xl font-bold w-full flex justify-around p-4 mt-2">
        <button
          className="flex items-center gap-2 border p-2 hover:bg-shadow-green-offset"
          type="button"
          onClick={() => setStepManually("1")}
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} />
          <h3 className="xsm:collapse xsm:absolute sm:static sm:visible text-2xl">
            Form
          </h3>
        </button>

        <h4 className="text-4xl">Gallery</h4>

        <button
          className="flex items-center gap-2 border p-2 hover:bg-shadow-green-offset"
          type="button"
          onClick={() => setStepManually("3")}
        >
          <h3 className="xsm:collapse xsm:absolute sm:static sm:visible text-2xl">
            Post
          </h3>
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </button>
      </div>

      {/*Files Display*/}
      <div className="flex xsm:flex-col md:flex-row w-full h-full pb-[3rem]">
        {/*Hidden Input for files*/}
        <input
          type="file"
          ref={filesInputRef}
          onChange={(e) => handleOnChange(e)}
          hidden
          multiple
          value={selectedFilesNames}
          accept="jpeg, png, mov"
        />

        {/*Big display for selected file*/}
        {selectedFiles && selectedFiles.length > 0 ? (
          <div className="md:w-1/2 xsm:w-full md:h-full xsm:h-4/6 bg-black">
            <img
              src={URL.createObjectURL(selectedFiles[currentIndex])}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="md:w-1/2 xsm:w-full h-full flex items-center justify-center bg-black">
            <h3 className="text-shadow text-3xl">No Files Selected</h3>
          </div>
        )}

        {/*Selection of files and file uploads*/}
        <div className="flex flex-col xsm:h-2/6 md:h-full xsm:w-full md:w-1/2 items-center">
          {/*Gallery Files Navigation*/}
          <div className="flex flex-col items-center w-full bg-shadow-green-offset">
            <div className="w-full flex justify-center p-2 border-b-2 border-black">
              <button
                type="button"
                className="bg-black p-2 text-lg rounded hover:bg-shadow-green"
                onClick={() => filesInputRef.current?.click()}
              >
                Select Files
              </button>
            </div>

            <div className="flex flex-col items-center text-lg p-4">
              <p>**Optional**</p>

              <p>
                Chose up to 10 images or videos to fill the gallery, showing off
                your new knife.
              </p>

              <div className="w-full flex justify-end">
                {selectedFiles && selectedFiles.length > 0 ? (
                  <button
                    type="button"
                    className="text-lg font-bold bg-shadow-green p-2 rounded hover:bg-black"
                    onClick={() => setStepManually("3")}
                  >
                    To Next Step
                  </button>
                ) : (
                  <button
                    type="button"
                    className="underline text-lg text-black font-bold hover:text-white"
                    onClick={() => setStepManually("3")}
                  >
                    Skip To Next Step
                  </button>
                )}
              </div>
            </div>
          </div>
          {/*Visual display for all currenly selected files*/}
          {selectedFiles ? (
            <div className="flex flex-wrap h-full w-full xsm:pb-24 md:pb-0">
              {selectedFiles?.map((file, i) => {
                return (
                  <div
                    className="w-1/5 h-1/2 relative hover:cursor-pointer"
                    key={i}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      className="h-full w-full object-cover"
                    />

                    <div
                      className="bg-black absolute top-0 bottom-0 left-0 right-0 flex justify-center hover:opacity-75 opacity-0"
                      onMouseOver={() => setCurrentIndex(i)}
                    >
                      <button
                        type="button"
                        className="w-full h-full"
                        onClick={() => removeFile(i)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryInput;
