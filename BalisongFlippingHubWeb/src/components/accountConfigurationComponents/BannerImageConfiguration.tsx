import { useRef, useState } from "react";
import Image from "../Image";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNewUser } from "../../redux/auth/authSlice";

const BannerImageConfiguration = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentFile, setCurrentFile] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.accessToken);

  const dispatch = useAppDispatch();

  const resetErrorState = () => {
    setIsError(false);
    setErrorMsg("");
  };

  const handleFileChange = async (e: any) => {
    // return if no file selected

    // create form data
    const formData = new FormData();
    formData.append("file", e.target.value[0]);

    // submit to backend
    setIsLoading(true);
    await axiosApiInstanceAuth
      .request({
        url: "/accounts/me/update-banner-img",
        method: "post",
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // success on saving new image
        dispatch(
          setNewUser({
            ...user,
            bannerImg: res.data,
          } as Profile)
        );
      })
      .catch((err) => {
        setIsError(true);
        setErrorMsg("Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full h-52 bg-shadow-green-offset flex justify-center items-center text-2xl relative font-bold rounded-b-xl overflow-hidden">
      {isLoading ? (
        <>
          {/*Loading State*/}
          <h5>Loading</h5>
        </>
      ) : (
        <>
          {user?.bannerImg ? (
            <Image imageId={user?.bannerImg} />
          ) : (
            <h5>No Banner Image</h5>
          )}

          {/*Button to select a new image*/}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded bg-shadow hover:bg-shadow-green absolute right-4 bottom-4 z-10 text-lg hover:border"
          >
            Edit Banner
          </button>

          {/*File Input to select new image*/}
          <input
            type="file"
            hidden
            ref={fileInputRef}
            value={currentFile}
            onChange={(e) => handleFileChange(e)}
            accept="jpeg, png"
          />

          {/*Error Display*/}
          {isError ? (
            <div className="w-full h-full opacity-75 bg-black absolute flex flex-col items-center justify-center">
              <h4>Error</h4>
              <h6>{errorMsg}</h6>
              <button
                className="p-2 rounded bg-shadow"
                onClick={resetErrorState}
              >
                Close
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default BannerImageConfiguration;
