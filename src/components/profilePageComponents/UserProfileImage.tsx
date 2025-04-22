import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { useRef, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";

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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const new_user = {
          ...user,
          profileImg: res.data,
        } as Profile;

        dispatch(setNewUser(new_user));
      })
      .catch((error) => {
        console.log(error);
        navigate("/configure/profile-image");
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
          <Image imageId={user?.profileImg} />

          <button
            type="button"
            className="absolute bg-shadow bottom-10 right-10 text-2xl p-4 rounded border-4 border-black hover:bg-shadow-green"
            onClick={() => navigate("/configure/profile-image")}
          >
            Edit Profile Image
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center absolute">
        <div className="md:h-48 md:w-48 sm:h-36 sm:w-36 xsm:h-32 xsm:w-32 rounded-full overflow-hidden md:-translate-y-24 sm:-translate-y-18 xsm:-translate-y-16 border-8 border-dark-primary hover:border-white transition-colors ease-linear duration-200">
          {user?.profileImg ? (
            <div
              className="w-full h-full hover:cursor-pointer"
              onClick={() => setIsFullScreen(true)}
            >
              <Image imageId={user?.profileImg} />
            </div>
          ) : (
            <div
              className="w-full h-full flex justify-center items-center bg-white hover:cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {isLoading ? (
                <h6>Loading...</h6>
              ) : (
                <>
                  <h5 className="text-black md:text-xl xsm:text-md font-bold">
                    + Profile Image
                  </h5>

                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={(e) => handleFileOnChange(e.target.files!)}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default UserProfileImage;
