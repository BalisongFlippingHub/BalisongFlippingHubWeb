import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const BannerConfiguration = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const handleOnChange = (e: any) => {
    if (isSuccess) {
      setIsSuccess(false);
    }

    setSelectedFile(e[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (selectedFile) {
      const fn = new FormData();
      fn.append("file", selectedFile);

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
          console.log("update banner image res: ", res);
          let newUser = {
            ...user,
            bannerImg: res.data,
          } as Profile;
          dispatch(setNewUser(newUser));
          setIsSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/*Display Current Banner Image*/}
      <div className="pt-4 text-2xl font-bold flex flex-col items-center gap-4 w-full border-t-8 border-b-8 border-black pt-10 pb-10">
        <h5>Current Banner</h5>

        {isSuccess ? (
          <div className="w-full h-64 bg-shadow-green-offset flex items-center justify-center">
            <img
              src={URL.createObjectURL(selectedFile!)}
              className="w-full h-full object-cover"
            />
          </div>
        ) : user?.bannerImg && user?.bannerImg !== "" ? (
          <div className="w-full h-64 bg-shadow-green-offset flex items-center justify-center">
            <Image imageId={user?.bannerImg!} />
          </div>
        ) : (
          <div className="w-full h-64 bg-shadow-green-offset flex items-center justify-center">
            <h6>No Banner Set</h6>
          </div>
        )}
      </div>

      <div>
        {isLoading ? (
          <h6>Loading...</h6>
        ) : isError ? (
          <div>
            <h6>Error...</h6>
          </div>
        ) : isSuccess ? (
          <h6>Success</h6>
        ) : (
          <h6 className="invisible">Fill...</h6>
        )}
      </div>

      {/*Display and form for new banner image selection*/}
      <form
        className="w-1/2 flex flex-col items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-full flex flex-col items-center text-2xl font-bold border p-4 gap-4">
          <h5>Selected Banner</h5>

          <div className="w-full h-96 rounded-lg overflow-hidden bg-black flex items-center justify-center">
            {selectedFile ? (
              <img
                className="w-full h-full object-cover"
                src={URL.createObjectURL(selectedFile)}
              />
            ) : (
              <h6>No Selected File</h6>
            )}
          </div>

          <div>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="jpeg, png"
              onChange={(e) => handleOnChange(e.target.files)}
            />
            <button
              type="button"
              className="p-2 rounded bg-black hover:bg-shadow-green-offset"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Banner
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 text-2xl font-bold bg-black p-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default BannerConfiguration;
