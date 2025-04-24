import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { useRef, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";

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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        const new_user = {
          ...user,
          bannerImg: res.data,
        } as Profile;
        dispatch(setNewUser(new_user));
      })
      .catch((error) => {
        console.log(error);
        navigate("/configure/profile-banner");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isFullScreen) {
    return (
      <div className="absolute right-0 left-0 bottom-0 top-0 bg-black flex justify-center z-10">
        <div
          className="h-full w-5/6 relative"
          onClick={() => setIsFullScreen(false)}
        >
          <Image imageId={user?.bannerImg} />

          <button
            type="button"
            className="absolute bottom-10 right-10 text-2xl bg-shadow p-4 hover:bg-shadow-green border-4 border-black rounded"
            onClick={() => navigate("/configure/profile-banner")}
          >
            Edit Banner
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full xsm:h-32 md:h-40 lg:h-48 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-blue-primary border-b rounded-b-3xl">
        {user?.bannerImg && user?.bannerImg !== "" ? (
          <div
            className="w-full h-full hover:cursor-pointer overflow-hidden"
            onClick={() => setIsFullScreen(true)}
          >
            <Image imageId={user?.bannerImg} />
          </div>
        ) : (
          <div className="w-full h-full">
            {isLoading ? (
              <h5 className="w-full text-center">Loading...</h5>
            ) : (
              <div className="relative w-full h-full">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute md:right-6 xsm:right-2 xsm:bottom-3 md:bottom-6 md:text-xl xsm:text-sm text-white font-bold bg-dark-primary p-4 rounded-lg outline-none hover:shadow-lg hover:shadow-black hover:bg-black hover:scale-110 transition-all ease-in-out duration-300"
                >
                  Configure Banner
                </button>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="jpeg, png"
                  onChange={(e) => handleFileOnChange(e.target.files!)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default UserProfileBanner;
