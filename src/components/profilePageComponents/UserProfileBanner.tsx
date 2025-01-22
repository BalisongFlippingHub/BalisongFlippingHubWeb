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
          <Image imageId={user?.bannerImg!} />

          <button
            type="button"
            className="absolute bottom-10 right-10 text-2xl bg-shadow rounded p-4 hover:bg-shadow-green border-4 border-black rounded"
            onClick={() => navigate("/configure/profile-banner")}
          >
            Edit Banner
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full bg-shadow-green-offset overflow-hidden">
        {user?.bannerImg && user?.bannerImg !== "" ? (
          <div
            className="w-full h-full hover:cursor-pointer"
            onClick={() => setIsFullScreen(true)}
          >
            <Image imageId={user?.bannerImg!} />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-2xl font-bold">
            {isLoading ? (
              <h5>Loading...</h5>
            ) : (
              <>
                <h5
                  className="border-4 rounded border-dashed p-14 hover:bg-shadow-green hover:cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Click To Set Profile Banner
                </h5>

                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="jpeg, png"
                  onChange={(e) => handleFileOnChange(e.target.files!)}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default UserProfileBanner;
