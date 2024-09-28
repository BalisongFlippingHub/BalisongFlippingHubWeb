import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Image from "../Image";

const ProfileImageConfiguration = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const { user } = useAuth();

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
    <div className="flex flex-col gap-2 items-center z-0">
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1 bg-shadow rounded hover:bg-shadow-green hover:border-white border"
            onClick={() => inputRef.current?.click()}
          >
            Edit Profile Image
          </button>

          {isLoading ? <h6>Loading...</h6> : <></>}
        </div>

        {/*Loading Display*/}
        {isError ? (
          <div className="flex gap-2 items-center h-20">
            <h6>Error...</h6>
            <div className="p-2 border border-red rounded flex justify-center items-center">
              <p>{errMsg}</p>
              <button type="button" onClick={() => resetStates()}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="h-20"></div>
        )}
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
