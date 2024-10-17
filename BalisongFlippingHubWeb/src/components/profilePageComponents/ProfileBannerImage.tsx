import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { useState } from "react";

const ProfileBannerImage = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (isFullScreen) {
    return (
      <div className="absolute right-0 left-0 bottom-0 top-0 bg-black flex justify-center">
        <div className="h-full w-5/6" onClick={() => setIsFullScreen(false)}>
          <Image imageId={user?.bannerImg!} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-[60%] bg-shadow-green-offset overflow-hidden">
        {user?.bannerImg && user?.bannerImg !== "" ? (
          <div className="w-full h-full" onClick={() => setIsFullScreen(true)}>
            <Image imageId={user?.bannerImg!} />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-2xl font-bold">
            <h5
              className="border-4 rounded border-dashed p-14 hover:bg-shadow-green hover:cursor-pointer"
              onClick={() => navigate("/me/configure/profile-banner")}
            >
              Click To Set Profile Banner
            </h5>
          </div>
        )}
      </div>
    );
  }
};

export default ProfileBannerImage;
