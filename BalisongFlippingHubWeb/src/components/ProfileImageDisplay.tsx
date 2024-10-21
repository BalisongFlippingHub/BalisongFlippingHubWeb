import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { axiosApiInstance } from "../api/axios";
import { Buffer } from "buffer";

const ProfileImageDisplay = () => {
  const [profileImage, setProfileImage] = useState<ImageBufferData | null>(
    null
  );

  const user = useAppSelector((state) => state.auth.user);

  const getProfileImage = async () => {
    await axiosApiInstance
      .request({
        url: `file/${user?.profileImg}`,
        method: "get",
        responseType: "arraybuffer",
      })
      .then((res) => {
        setProfileImage({
          data: Buffer.from(res.data, "binary").toString("base64"),
          /*@ts-ignore*/
          type: res.headers.get("Content-Type"),
        } as ImageBufferData);
      });
  };

  useEffect(() => {
    if (user?.profileImg) {
      getProfileImage();
    }
  }, [user]);

  if (user?.profileImg && user?.profileImg !== "") {
    return (
      <img
        src={
          profileImage?.type !== "image/png"
            ? `data:image/png;base64,${profileImage?.data}`
            : `data:image/jpeg;base64,${profileImage?.data}`
        }
        className="w-full h-full object-cover"
      />
    );
  } else {
    return <div>Error</div>;
  }
};

export default ProfileImageDisplay;
