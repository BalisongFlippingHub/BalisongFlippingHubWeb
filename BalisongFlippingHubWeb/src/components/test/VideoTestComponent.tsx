import { useRef, useState } from "react";

const VideoTestComponent = () => {
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedVideoFileStr, setSelectedVideoFileStr] = useState("");
  const [videoDuration, setVideoDuration] = useState<any>(null);

  const handleOnChange = (videoFile: File) => {
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

          // if vidoe duration is less than 2 minutes it's valid
          if (videoElement.duration <= 120) {
            setVideoDuration(videoElement.duration);
            videoElement.controls = true;
            let div: HTMLElement = document.getElementById("videoDiv")!;
            div.appendChild(videoElement);
          }

          clearInterval(timer);
        }
      }, 500);
    };

    reader.readAsDataURL(videoFile);
  };

  return (
    <div className="w-full max-w-[1000px] flex flex-col items-center bg-shadow-green-offset">
      <h1>Video Test</h1>
      <h4>Duration: {videoDuration}</h4>
      <div id="videoDiv"></div>

      <input
        type="file"
        ref={videoFileInputRef}
        onChange={(e) => handleOnChange(e.target.files![0])}
        accept=".mp4"
      />
    </div>
  );
};

export default VideoTestComponent;
