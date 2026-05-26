import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { useRef, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const UserProfileImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFileOnChange = async (files: FileList) => {
    if (files[0] === null) return;

    const fn = new FormData();
    fn.append("file", files[0]);

    setIsLoading(true);
    await axiosApiInstanceAuth
      .request({
        url: "/accounts/me/update-profile-img",
        method: "post",
        data: fn,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const new_user = { ...user, profileImg: res.data } as Profile;
        dispatch(setNewUser(new_user));
      })
      .catch(() => navigate("/configure/profile-image"))
      .finally(() => setIsLoading(false));
  };

  if (isFullScreen) {
    return (
      <div className="absolute right-0 left-0 bottom-0 top-0 bg-black flex justify-center z-10">
        <div className="h-full w-5/6 relative" onClick={() => setIsFullScreen(false)}>
          <Image imageId={user?.profileImg} />
          <button
            type="button"
            className="absolute bottom-10 right-10 text-2xl bg-dark-neutral-offset px-5 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-200"
            onClick={() => navigate("/configure/profile-image")}
          >
            Edit Profile Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center absolute pointer-events-none">
      <div className="lg:h-56 lg:w-56 md:h-48 md:w-48 sm:h-40 sm:w-40 xsm:h-32 xsm:w-32 rounded-full overflow-hidden lg:-translate-y-28 md:-translate-y-24 sm:-translate-y-20 xsm:-translate-y-16 border-4 border-[#0a0c10] pointer-events-auto">
        {user?.profileImg && user.profileImg !== "" ? (
          <div
            className="w-full h-full hover:cursor-pointer"
            onClick={() => setIsFullScreen(true)}
          >
            <Image imageId={user.profileImg} />
          </div>
        ) : (
          <div
            className="w-full h-full flex flex-col justify-center items-center gap-1 bg-dark-neutral-offset hover:bg-[#1e2128] hover:cursor-pointer transition-colors duration-200"
            onClick={() => fileInputRef.current?.click()}
          >
            {isLoading ? (
              <p className="text-white/40 text-xs">...</p>
            ) : (
              <>
                <FontAwesomeIcon icon={faCamera} className="text-white/30 text-lg" />
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/jpeg, image/png"
                  onChange={(e) => handleFileOnChange(e.target.files!)}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileImage;
