import { useEffect, useRef, useState } from "react";
import GalleryInputSelectedFilesFileCoverDisplay from "./GalleryInputSelectedFilesFileCoverDisplay";

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

  const videoTooLarge = (video: File) => {
    // boolean variable
    var isTooLong: boolean = false;

    // file reader object loads video to vidoe element
    const reader = new FileReader();
    reader.onload = function (e: any) {
      // creates element
      var videoElement = document.createElement("video");

      // sets element src
      videoElement.src = e.target.result;

      // checks video duration upon load
      var timer = setInterval(function () {
        if (videoElement.readyState === 4) {
          console.log(
            "The duration is: " + videoElement.duration.toFixed(2) + " seconds"
          );

          // if duration is larger than 300 seconds or 5 minutes, set to be too long
          if (videoElement.duration > 300) isTooLong = true;

          // stops loop
          clearInterval(timer);
        }
      }, 500);
    };

    // starts reader
    reader.readAsDataURL(video);

    // returns value
    return isTooLong;
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

      let file: File = files[i];

      // check for file already existing in selected files
      if (checkSelectedFileExistance(file)) continue;

      // validate if video file
      console.log(file);
      if (file.type === "video/mp4") {
        if (videoTooLarge(file)) continue;
      }

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

  const changeCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    console.log("running effect");
    updateGalleryFiles(selectedFiles);
  }, [removeFile, setSelectedFiles]);

  return (
    <section className="w-full flex flex-col pt-6 pb-28 px-4 items-center">

      {/* Files Display */}
      <div className="w-full max-w-[900px] lg:min-w-[1050px] lg:max-w-[1400px] flex xsm:flex-col md:flex-row overflow-hidden rounded-2xl border border-white/10 xsm:h-[760px] sm:h-[900px] md:h-[clamp(480px,75vh,800px)]">
        {/* Hidden Input */}
        <input
          type="file"
          ref={filesInputRef}
          onChange={(e) => handleOnChange(e)}
          hidden
          multiple
          value={selectedFilesNames}
          accept="jpeg, png, mov"
        />

        {/* Main preview */}
        {selectedFiles && selectedFiles.length > 0 ? (
          <div className="md:w-1/2 xsm:w-full md:h-full xsm:h-[45%] bg-black flex items-center justify-center">
            {selectedFiles[currentIndex].type === "video/mp4" ? (
              <video
                src={URL.createObjectURL(selectedFiles[currentIndex])}
                className="w-full h-full object-contain"
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={URL.createObjectURL(selectedFiles[currentIndex])}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        ) : (
          <div className="md:w-1/2 xsm:w-full md:h-full xsm:h-[45%] bg-black flex flex-col items-center justify-center gap-3">
            <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-white/25 text-sm">No files selected</p>
          </div>
        )}

        {/* Right panel */}
        <div className="flex flex-col xsm:h-[55%] md:h-full xsm:w-full md:w-1/2 bg-[#0e1016]">
          {/* Controls */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => filesInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 bg-blue-primary/10 border border-blue-primary/30 rounded-lg text-blue-primary text-sm font-medium hover:bg-blue-primary/20 transition-colors duration-200"
              >
                <span>+ Add Files</span>
              </button>
              {selectedFiles && (
                <span className="text-xs text-white/30">
                  {selectedFiles.length}/10
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setStepManually("3")}
              className={`text-sm font-medium transition-colors duration-200 ${
                selectedFiles && selectedFiles.length > 0
                  ? "text-blue-primary hover:text-blue-primary/70"
                  : "text-white/30 hover:text-white/50 underline"
              }`}
            >
              {selectedFiles && selectedFiles.length > 0 ? "Next Step →" : "Skip →"}
            </button>
          </div>

          {/* Thumbnails grid */}
          {selectedFiles && selectedFiles.length > 0 ? (
            <div className="flex flex-wrap overflow-y-auto flex-1 content-start p-2 gap-1">
              {selectedFiles.map((file, i) => (
                <div key={i} className="w-[19%] aspect-square">
                  <GalleryInputSelectedFilesFileCoverDisplay
                    file={file}
                    index={i}
                    removeFile={removeFile}
                    changeCurrentIndex={changeCurrentIndex}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-white/20 text-center px-8">
                Choose up to 10 images or videos to fill the gallery
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryInput;
