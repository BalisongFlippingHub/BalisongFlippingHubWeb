import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const DisplayNameConfiguration = () => {
  const displayNameInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [displayNameValue, setDisplayNameValue] = useState("");

  const { user } = useAuth();

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleOnBlur = () => {
    if (
      displayNameValue === user?.displayName ||
      displayNameValue === user?.id ||
      displayNameValue === ""
    ) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (user?.displayName && user?.displayName !== "")
      setDisplayNameValue(user?.displayName);
  }, []);

  return (
    <div
      className="bg-shadow w-full h-full rounded p-2 hover:cursor-pointer hover:bg-shadow-green"
      onClick={enableEditing}
    >
      <div>
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-2xl">Display Name</h5>
          <FontAwesomeIcon icon={faEdit} size="xl" />
        </div>

        <h6>
          {user?.displayName && user?.displayName !== ""
            ? user?.displayName
            : user?.id}
        </h6>
      </div>

      {/*Editing Div*/}
      {isEditing ? (
        <div className="absolute top-[64px] left-[192px] right-0 bottom-0 z-10 bg-black flex justify-center p-10 hover:cursor-mouse">
          {/*Form To Edit Display Name*/}
          <form className="w-2/3 bg-shadow h-28 rounded-lg p-4 flex flex-col">
            {/*Prompt*/}
            <p className="text-lg font-semibold">
              Please only input capital letters, lowercase letters, numbers, or
              _.
            </p>

            {/*Input*/}
            <div className="flex flex-col">
              <label className="text-xl font-bold">Display Name Change:</label>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  value={displayNameValue}
                  ref={displayNameInputRef}
                  onChange={(e) => setDisplayNameValue(e.target.value)}
                  className="bg-shadow-green p-1 rounded text-lg w-full"
                />

                {/*Submit Btn, Loading and Error State plus Submit*/}
                <button type="submit" className="p-1 rounded border">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DisplayNameConfiguration;
