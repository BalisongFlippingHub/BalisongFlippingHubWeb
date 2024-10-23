import { useEffect, useRef, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";

const YoutubeLinkConfiguration = () => {
  const linkInputRef = useRef<HTMLInputElement>(null);

  const [newLink, setNewLink] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const handleOnChange = (value: string) => {
    setNewLink(value);

    if (isSuccess) setIsSuccess(false);

    if (isError) {
      setIsError(false);
      setErrorMsg("");
    }
  };

  const resetState = () => {
    setIsError(false);
    setIsLoading(false);
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleOnClick = () => {
    resetState();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const value = newLink.toLocaleLowerCase().trim();

    if (value === "") return;

    if (!value.startsWith("https://www.youtube.com")) {
      setIsError(true);
      setErrorMsg("Link must be a Youtube link");
      return;
    }

    setIsLoading(true);
    await axiosApiInstanceAuth
      .request({
        url: "accounts/me/update-youtube-link",
        method: "post",
        data: { newLink },
      })
      .then((res) => {
        setIsSuccess(true);
        const newUser = {
          ...user,
          youtubeLink: res.data,
        } as Profile;
        dispatch(setNewUser(newUser));
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setErrorMsg("Server Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user?.youtubeLink && user?.youtubeLink !== "")
      setNewLink(user?.youtubeLink);
  }, []);

  return (
    <form
      className="w-1/2 flex flex-col items-center gap-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="text-lg">Link your Youtube account.</p>

      <div className="w-full flex">
        <input
          type="text"
          ref={linkInputRef}
          value={newLink}
          onChange={(e) => handleOnChange(e.target.value)}
          onClick={handleOnClick}
          className="w-full bg-black focus:bg-shadow p-2 text-lg outline-none border"
        />

        {user?.youtubeLink === newLink ||
        !newLink.startsWith("https://www.youtube.com") ? (
          <button
            type="submit"
            className="text-xl p-2 bg-black border"
            disabled
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            className="text-xl p-2 bg-black border hover:bg-shadow-green-offset"
          >
            Submit
          </button>
        )}

        {/*Display States for submit*/}
        {isLoading ? (
          <h4>Loading...</h4>
        ) : isSuccess ? (
          <h4>Success...</h4>
        ) : isError ? (
          <h4>Error... {errorMsg}</h4>
        ) : (
          <h4 className="invisible">Fill</h4>
        )}
      </div>
    </form>
  );
};

export default YoutubeLinkConfiguration;
