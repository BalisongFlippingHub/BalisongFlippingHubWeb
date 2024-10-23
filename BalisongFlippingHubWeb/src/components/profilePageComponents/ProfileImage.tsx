import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { useRef, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";

const ProfileImage = () => {
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
        navigate("/me/configure/profile-image");
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
          <Image imageId={user?.profileImg!} />

          <button
            type="button"
            className="absolute bg-shadow bottom-10 right-10 text-2xl p-4 rounded border-4 border-black hover:bg-shadow-green"
            onClick={() => navigate("/me/configure/profile-image")}
          >
            Edit Profile Image
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center relative">
        <div className="md:h-52 md:w-52 xsm:h-36 xsm:w-36 border-4 border-shadow-green rounded-full absolute md:-translate-y-[6.5rem] xsm:-translate-y-[4.4rem] overflow-hidden">
          {user?.profileImg ? (
            <div
              className="w-full h-full hover:cursor-pointer"
              onClick={() => setIsFullScreen(true)}
            >
              <Image imageId={user?.profileImg!} />
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
                  <h5 className="text-black text-xl font-bold">
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

export default ProfileImage;
