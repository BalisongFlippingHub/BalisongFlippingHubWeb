import { useEffect, useState } from "react";
import { axiosApiInstanceAuth } from "../api/axios";
import { Buffer } from "buffer";

interface params {
  files?: Array<File>;
  filesStr?: Array<string>;
}

const PostFilesDisplay = ({ files, filesStr }: params) => {
  const [filesData, setFilesData] = useState<Array<ImageBufferData>>([]);
  const [currentFileIndex, setCurrentfileIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  const toggleNextImg = () => {
    if (files) {
      if (files.length === 1) {
        return;
      }

      if (currentFileIndex === files.length - 1) {
        setCurrentfileIndex(0);
        return;
      } else {
        setCurrentfileIndex((prev) => ++prev);
        return;
      }
    }

    if (filesData) {
      if (filesData.length === 1) {
        return;
      }

      if (currentFileIndex === filesData.length - 1) {
        setCurrentfileIndex(0);
        return;
      } else {
        setCurrentfileIndex((prev) => ++prev);
        return;
      }
    }
  };

  const toggleNextImgReverse = () => {
    if (files) {
      if (files.length === 1) {
        return;
      }

      if (currentFileIndex === 0) {
        setCurrentfileIndex(files.length - 1);
        return;
      } else {
        setCurrentfileIndex((prev) => --prev);
        return;
      }
    }

    if (filesData) {
      if (filesData.length === 1) {
        return;
      }

      if (currentFileIndex === 0) {
        setCurrentfileIndex(filesData.length - 1);
        return;
      } else {
        setCurrentfileIndex((prev) => --prev);
        return;
      }
    }
  };

  useEffect(() => {
    if (!files) {
      if (filesStr) {
        const filesArr: Array<ImageBufferData> = [];
        const getFiles = async () => {
          for (var i = 0; i < filesStr?.length; ++i) {
            await axiosApiInstanceAuth
              .request({
                url: `/file/${filesStr[i]}`,
                method: "get",
                responseType: "arraybuffer",
              })
              .then((res) => {
                filesArr.push({
                  data: Buffer.from(res.data, "binary").toString("base64"),
                  /*@ts-ignore*/
                  type: res.headers.get("Content-Type"),
                } as ImageBufferData);
              })
              .catch((err) => {
                console.log("Error getting img: ", err);
              })
              .finally(() => {});
          }

          setFilesData(filesArr);
        };

        getFiles();
      }
    }
  }, []);

  try {
    if (files) {
      if (fullScreen) {
        return (
          <div className="absolute right-0 top-0 left-0 bottom-0 bg-black">
            {files.length === 1 ? (
              <></>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleNextImg}
                  className="absolute text-7xl p-2 rounded-2xl border top-[46%] right-4 opacity-15 hover:opacity-100"
                >{`>`}</button>
                <button
                  type="button"
                  onClick={toggleNextImgReverse}
                  className="absolute text-7xl p-2 rounded-2xl border top-[46%] left-4 opacity-15 hover:opacity-100"
                >{`<`}</button>
              </>
            )}
            <img
              src={URL.createObjectURL(files[currentFileIndex])}
              className="object-contain w-full h-full"
            />
            <button
              type="button"
              onClick={() => setFullScreen((prev) => !prev)}
              className="absolute right-5 text-5xl bottom-5 opacity-15 hover:opacity-100"
            >{`[]`}</button>
          </div>
        );
      } else {
        return (
          <div className="w-full h-96 relative bg-black">
            {files.length === 1 ? (
              <></>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleNextImg}
                  className="absolute text-5xl p-2 rounded-2xl border top-36 right-4 opacity-15 hover:opacity-100"
                >{`>`}</button>
                <button
                  type="button"
                  onClick={toggleNextImgReverse}
                  className="absolute text-5xl p-2 rounded-2xl border top-36 left-4 opacity-15 hover:opacity-100"
                >{`<`}</button>
              </>
            )}
            <img
              src={URL.createObjectURL(files[currentFileIndex])}
              className="object-contain w-full h-full"
            />
            <button
              type="button"
              onClick={() => setFullScreen((prev) => !prev)}
              className="absolute right-5 text-5xl bottom-5 opacity-15 hover:opacity-100"
            >{`[]`}</button>
          </div>
        );
      }
    }

    if (filesData) {
      if (fullScreen) {
        return (
          <div className="absolute right-0 top-0 left-0 bottom-0 bg-black">
            {filesData.length === 1 ? (
              <></>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleNextImg}
                  className="absolute text-7xl p-2 rounded-2xl border top-[46%] right-4 opacity-15 hover:opacity-100"
                >{`>`}</button>
                <button
                  type="button"
                  onClick={toggleNextImgReverse}
                  className="absolute text-7xl p-2 rounded-2xl border top-[46%] left-4 opacity-15 hover:opacity-100"
                >{`<`}</button>
              </>
            )}
            <img
              src={
                filesData[currentFileIndex].type === "image/png"
                  ? `data:image/png;base64,${filesData[currentFileIndex].data}`
                  : `data:image/jpeg;base64,${filesData[currentFileIndex].data}`
              }
              className="object-contain w-full h-full"
            />
            <button
              type="button"
              onClick={() => setFullScreen((prev) => !prev)}
              className="absolute right-5 text-5xl bottom-5 opacity-15 hover:opacity-100"
            >{`[]`}</button>
          </div>
        );
      } else {
        return (
          <div className="w-full h-96 relative bg-black">
            {filesData.length === 1 ? (
              <></>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleNextImg}
                  className="absolute text-5xl p-2 rounded-2xl border top-36 right-4 opacity-15 hover:opacity-100"
                >{`>`}</button>
                <button
                  type="button"
                  onClick={toggleNextImgReverse}
                  className="absolute text-5xl p-2 rounded-2xl border top-36 left-4 opacity-15 hover:opacity-100"
                >{`<`}</button>
              </>
            )}
            <img
              src={
                filesData[currentFileIndex].type === "image/png"
                  ? `data:image/png;base64,${filesData[currentFileIndex].data}`
                  : `data:image/jpeg;base64,${filesData[currentFileIndex].data}`
              }
              className="object-contain w-full h-full"
            />
            <button
              type="button"
              onClick={() => setFullScreen((prev) => !prev)}
              className="absolute right-5 text-5xl bottom-5 opacity-15 hover:opacity-100"
            >{`[]`}</button>
          </div>
        );
      }
    }
  } catch (e: any) {
    return (
      <div>
        <p>{e.toString()}</p>
      </div>
    );
  }
};

export default PostFilesDisplay;
