import { useEffect, useState } from "react";

interface params {
  file: File;
  index?: number;
  removeFile?: Function;
  changeCurrentIndex?: Function;
}

const GalleryInputSelectedFilesFileCoverDisplay = ({
  file,
  index,
  removeFile,
  changeCurrentIndex,
}: params) => {
  const [videoDuration, setVideoDuration] = useState("00.00");

  useEffect(() => {
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

          setVideoDuration(videoElement.duration.toFixed(2));

          clearInterval(timer);
        }
      }, 500);
    };

    reader.readAsDataURL(file);
  }, []);

  return (
    <div
      className="w-full h-full relative hover:cursor-pointer"
      onMouseOver={
        changeCurrentIndex ? () => changeCurrentIndex(index) : () => {}
      }
    >
      {file.type === "video/mp4" ? (
        <>
          <video
            src={URL.createObjectURL(file)}
            className="h-full w-full object-cover"
            id="video-id"
          />

          <div className="absolute z-10 right-2 bottom-2 font-bold bg-black p-1 rounded-lg">
            <p>{videoDuration}</p>
          </div>
        </>
      ) : (
        <img
          src={URL.createObjectURL(file)}
          className="h-full w-full object-cover"
        />
      )}

      <div className="bg-black absolute top-0 bottom-0 left-0 right-0 flex justify-center hover:opacity-75 opacity-0">
        <button
          type="button"
          className="w-full h-full"
          onClick={removeFile ? () => removeFile(index) : () => {}}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default GalleryInputSelectedFilesFileCoverDisplay;
