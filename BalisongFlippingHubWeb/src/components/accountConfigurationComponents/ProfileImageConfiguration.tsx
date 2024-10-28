import { useRef, useState } from "react";
import Image from "../Image";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faN } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { axiosApiInstanceAuth } from "../../api/axios";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";

const ProfileImageConfiguration = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFileSelection = (files: FileList) => {
    if (files[0] === null) return;

    setSelectedFile(files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedFile) return;

    const fn = new FormData();
    fn.append("file", selectedFile);

    setIsLoading(true);
    await axiosApiInstanceAuth({
      url: "/accounts/me/update-profile-img",
      method: "post",
      data: fn,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const newUser = {
          ...user,
          profileImg: res.data,
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
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/*Display Current Profile Image*/}
      <div className="w-60 h-60 overflow-hidden bg-shadow rounded-full flex justify-center items-center text-xl">
        {isSuccess ? (
          <img
            src={URL.createObjectURL(selectedFile!)}
            className="w-full h-full object-cover"
          />
        ) : user?.profileImg && user?.profileImg !== "" ? (
          <Image imageId={user?.profileImg!} />
        ) : (
          <h6>No Profile Image</h6>
        )}
      </div>

      {/*New Profile Image Form*/}
      <form
        className="mt-10 flex flex-col items-center gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col items-center gap-4 border-4 border-black rounded p-10">
          <h5>Select New Profile Image</h5>

          <div className="w-80 h-96 bg-black flex text-xl font-bold items-center justify-center">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                className="w-full h-full object-cover"
              />
            ) : (
              <h6>No Image Selected</h6>
            )}
          </div>

          <button
            type="button"
            className="p-2 rounded text-lg bg-black"
            onClick={() => fileInputRef.current?.click()}
          >
            Select File
          </button>

          <input
            type="file"
            accept="png, jpeg"
            hidden
            ref={fileInputRef}
            onChange={(e) => handleFileSelection(e.target.files!)}
          />
        </div>

        <button type="submit" className="rounded p-2 text-xl bg-shadow">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileImageConfiguration;
