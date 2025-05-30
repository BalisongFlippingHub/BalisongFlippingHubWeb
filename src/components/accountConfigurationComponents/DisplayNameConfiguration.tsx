import { useEffect, useRef, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCollection } from "../../redux/collection/collectionSlice";
import { logout } from "../../redux/auth/authActions";
import { setNewUser } from "../../redux/auth/authSlice";
import { Profile } from "../../modals/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faX } from "@fortawesome/free-solid-svg-icons";

const DisplayNameConfiguration = () => {
  const displayNameInputRef = useRef<HTMLInputElement>(null);

  const [newDisplayName, setNewDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const validateNewDisplayName = (newName: string) => {
    if (newName) {
      return true
    }
    
    return true;
  };

  const handleOnChange = (val: string) => {
    setNewDisplayName(val);

    if (isError) {
      setIsError(false);
      setErrMsg("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await axiosApiInstanceAuth
        .request({
          url: "/accounts/me/change-display-name",
          method: "post",
          data: newDisplayName,
        })
        .then((res) => {
          console.log(res);
          // update with new display name
          dispatch(
            setNewUser({
              ...user,
              displayName: res.data.displayName,
              identifierCode: res.data.identifierCode,
            } as Profile)
          );

          setIsSuccess(true);

        const id =  setTimeout(() => {
            setIsSuccess(false)
          }, 5000)

          clearTimeout(id)
        })
        .catch((err) => {
          // error in updating in back end
          setIsError(true);
          setErrMsg("Failed to update new display name");

          if (err.response.status === 401) {
            dispatch(clearCollection());
            dispatch(logout());
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (user?.displayName)
      setNewDisplayName(user?.displayName);

  }, []);

  return (
    <form
      className="w-full max-w-[1000px] flex flex-col items-center gap-2 p-4 text-white"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="text-lg">
        Display names can contain letters, numbers or these special characters:
        ! . _
      </p>

      <div className="flex w-full items-center">
        <div className="flex w-full">
          <input
            type="text"
            ref={displayNameInputRef}
            value={newDisplayName}
            onChange={(e) => handleOnChange(e.target.value)}
            className="w-full bg-dark-primary focus:bg-blue-primary p-2 text-lg outline-none border font-bold"
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
              className="p-2 bg-black border hover:scale-110 transition-transform ease-linear duration-300 border-bg-shadow"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="h-full w-12 flex justify-center items-center bg-blue border">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          </div>
        ) : isSuccess ? (
          <div className="h-full w-12 flex justify-center items-center bg-green border">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ) : isError ? (
          <div className="h-full w-12 flex justify-center items-center bg-red border">
            <FontAwesomeIcon icon={faX}  />
          </div>
        ) : (
          <div className="h-full w-12 flex justify-center items-center">
            
          </div>
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
