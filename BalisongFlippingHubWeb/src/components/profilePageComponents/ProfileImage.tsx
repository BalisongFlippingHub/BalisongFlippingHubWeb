import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { useState } from "react";

const ProfileImage = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (isFullScreen) {
    return (
      <div className="absolute right-0 left-0 bottom-0 top-0 bg-black flex justify-center">
        <div className="h-full w-5/6" onClick={() => setIsFullScreen(false)}>
          <Image imageId={user?.profileImg!} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center relative">
        <div className="h-52 w-52 border-4 border-shadow-green rounded-full absolute -translate-y-[6.5rem] overflow-hidden">
          {user?.profileImg ? (
            <div
              className="w-full h-full"
              onClick={() => setIsFullScreen(true)}
            >
              <Image imageId={user?.profileImg!} />
            </div>
          ) : (
            <div
              className="w-full h-full flex justify-center items-center bg-white hover:cursor-pointer"
              onClick={() => navigate("/me/configure/profile-image")}
            >
              <h5 className="text-black text-xl font-bold">+ Profile Image</h5>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ProfileImage;
