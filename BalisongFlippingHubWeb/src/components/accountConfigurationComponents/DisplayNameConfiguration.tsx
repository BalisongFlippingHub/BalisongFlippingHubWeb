import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";

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
    <div className="z-10">
      <h5>Display Name:</h5>

      <div className="flex gap-2">
        <div className="w-20 border border-shadow">
          {isEditing ? (
            <input
              type="text"
              className="w-full p-1 bg-shadow-green"
              value={displayNameValue}
              onBlur={() => handleOnBlur()}
              onChange={(e) => setDisplayNameValue(e.target.value)}
            />
          ) : (
            <h6 className="p-1 w-full" onClick={() => enableEditing()}>
              {user?.displayName && user?.displayName !== ""
                ? user?.displayName
                : user?.id}
            </h6>
          )}
        </div>

        <button type="button" onClick={enableEditing}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default DisplayNameConfiguration;
