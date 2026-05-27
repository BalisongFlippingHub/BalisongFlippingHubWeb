import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { useRef, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const UserProfileBanner = () => {
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
        url: "/accounts/me/update-banner-img",
        method: "post",
        data: fn,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const new_user = { ...user, bannerImg: res.data } as Profile;
        dispatch(setNewUser(new_user));
      })
      .catch(() => navigate("/configure/profile-banner"))
      .finally(() => setIsLoading(false));
  };

  if (isFullScreen) {
    return (
      <div className="absolute right-0 left-0 bottom-0 top-0 bg-black flex justify-center z-10">
        <div className="h-full w-5/6 relative" onClick={() => setIsFullScreen(false)}>
          <Image imageId={user?.bannerImg} />
          <button
            type="button"
            className="absolute bottom-10 right-10 text-2xl bg-dark-neutral-offset px-5 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-200"
            onClick={() => navigate("/configure/profile-banner")}
          >
            Edit Banner
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full xsm:h-[136px] md:h-56 lg:h-64 relative overflow-hidden rounded-b-3xl bg-gradient-to-b from-[#1c1f27] to-[#111318] border-b border-white/10">
      {user?.bannerImg && user.bannerImg !== "" ? (
        <div
          className="w-full h-full hover:cursor-pointer"
          onClick={() => setIsFullScreen(true)}
        >
          <Image imageId={user.bannerImg} />
        </div>
      ) : (
        <div className="w-full h-full relative">
          {isLoading ? (
            <p className="absolute bottom-4 right-4 text-white/30 text-xs">Uploading...</p>
          ) : (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faCamera} className="text-sm" />
              </button>
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
  );
};

export default UserProfileBanner;
