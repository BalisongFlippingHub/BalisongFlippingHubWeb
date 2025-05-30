import { useEffect, useState } from "react";
import { axiosApiInstance } from "../api/axios";
import { Buffer } from "buffer";

interface params {
  imageId: string | undefined | null;
  contain?: boolean;
}

const Image = ({ imageId, contain }: params) => {
  const [image, setImage] = useState<ImageBufferData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {}, [imageId]);

  useEffect(() => {
    const getImg = async () => {
      setIsLoading(true);
      await axiosApiInstance
        .request({
          url: `/file/${imageId}`,
          method: "get",
          responseType: "arraybuffer",
        })
        .then((res) => {
          setImage({
            data: Buffer.from(res.data, "binary").toString("base64"),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /*@ts-expect-error*/
            type: res.headers.get("Content-Type"),
          } as ImageBufferData);
        })
        .catch((err) => {
          console.log("Error getting img: ", err);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (imageId && imageId !== "") {
      getImg();
    }
  }, []);

  if (!imageId || imageId === "") {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white">
        <h4 className="text-black">No Image</h4>
      </div>
    );
  } else if (isLoading) {
    return <div className="w-full h-full">loading...</div>;
  } else {
    if (isError) {
      return <div className="w-full h-full">ERROR</div>;
    }

    if (image?.type === "video/mp4") {
      return (
        <video
          src={`data:video/mp4;base64,${image?.data}`}
          className={
            contain
              ? "w-full h-full object-contain"
              : "w-full h-full object-cover"
          }
          autoPlay
          controls
          muted
        ></video>
      );
    } else {
      return (
        <img
          className={
            contain
              ? "w-full h-full object-contain"
              : "w-full h-full object-cover"
          }
          src={`data:image/*;base64,${image?.data}`}
        />
      );
    }
  }
};

export default Image;
