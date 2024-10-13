import { useRef, useState } from "react";
import Image from "../Image";
import { useAppSelector } from "../../redux/hooks";

const ProfileImageConfiguration = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const user = useAppSelector((state) => state.auth.user);

  const resetStates = () => {
    setIsLoading(false);
    setIsError(false);
    setErrMsg("");
  };

  const handleFileChange = (e: any) => {
    // return if no file is selected
    // create form data
    // attempt post to api
  };

  return (
    <div className="flex flex-col items-center z-0">
      {/*Display Image or Holder Value*/}
      <div className="border overflow-hidden flex justify-center items-center w-36 h-36 rounded-full">
        {user?.profileImg ? (
          <Image imageId={user?.profileImg} />
        ) : (
          <div
            className="flex flex-col items-center w-full h-full justify-center hover:cursor-pointer bg-black"
            onClick={() => inputRef.current?.click()}
          >
            <h4>Profile</h4>
            <h4>Image</h4>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        {/*Button to prompt file selection*/}
        <div className="flex items-center">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <div className="h-28 flex flex-col border border-red mt-4 items-center justify-center p-2">
              <p>Error</p>
              <p>Failed to Change Profile Image</p>
              <button
                type="button"
                onClick={() => resetStates()}
                className="p-1 rounded border"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="h-32 w-20"></div>
          )}
        </div>
      </div>

      {/*Hidden File Input*/}
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={(e) => handleFileChange(e)}
      />
    </div>
  );
};

export default ProfileImageConfiguration;
