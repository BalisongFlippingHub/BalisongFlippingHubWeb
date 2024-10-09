import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const DisplayNameConfiguration = () => {
  const displayNameInputRef = useRef<HTMLInputElement>(null);

  const [newDisplayName, setNewDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const { user, accessToken } = useAuth();

  const validateNewDisplayName = (newName: string) => {
    return true;
  };

  const handleOnChange = (val: string) => {
    setNewDisplayName(val);

    if (isError) {
      setIsError(false);
      setErrMsg("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setNewDisplayName((prev) => prev.trim());

    if (newDisplayName.length < 4) {
      setIsError(true);
      setErrMsg("Display Name must be at least 4 characters long.");
      return;
    }

    if (newDisplayName === user?.displayName) {
      return;
    }

    if (validateNewDisplayName(newDisplayName)) {
      console.log(newDisplayName);
      setIsLoading(true);
      await axios
        .request({
          url: "/accounts/me/change-display-name",
          method: "post",
          data: newDisplayName,
          headers: {
            Authorization: "Bearer " + accessToken,
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          // update with new display name
          setIsSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          // error in updating in back end
          setIsError(true);
          setErrMsg("Failed to update new display name");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setNewDisplayName(user?.displayName!);
  }, []);

  return (
    <form
      className="w-full max-w-[1000px] flex flex-col items-center gap-2 p-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="text-lg">Please input only letters, numbers, and _.</p>

      <div className="flex w-full gap-2 items-center">
        <div className="flex w-full">
          <input
            type="text"
            ref={displayNameInputRef}
            value={newDisplayName}
            onChange={(e) => handleOnChange(e.target.value)}
            className="w-full bg-black focus:bg-shadow p-2 text-lg outline-none border"
          />

          {newDisplayName === user?.displayName ? (
            <button
              className="p-2 bg-black border border-bg-shadow"
              type="submit"
              disabled
            >
              Submit
            </button>
          ) : (
            <button
              className="p-2 bg-black border hover:bg-shadow-green-offset border-bg-shadow"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>

        {isLoading ? (
          <>Loading...</>
        ) : isSuccess ? (
          <>Success...</>
        ) : isError ? (
          <>Error...</>
        ) : (
          <>Fill...</>
        )}
      </div>

      {isError ? (
        <div className="border-red border p-2 rounded flex flex-col items-center">
          <h6 className="text-red font-bold text-xl">Error</h6>
          <p className="text-lg font-semibold">{errMsg}</p>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default DisplayNameConfiguration;
