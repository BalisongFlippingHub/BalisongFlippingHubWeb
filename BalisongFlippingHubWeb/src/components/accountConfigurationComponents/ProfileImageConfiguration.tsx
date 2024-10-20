import { useRef, useState } from "react";
import Image from "../Image";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProfileImageConfiguration = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center p-10">
      {/*Go Back Button*/}
      <div className="w-full">
        <button
          type="button"
          className="p-3 rounded bg-shadow flex gap-2 items-center text-xl hover:bg-shadow-green-offset"
          onClick={() => navigate("/me/configure")}
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <h6>Go Back</h6>
        </button>
      </div>

      {/*Display Current Profile Image*/}
      <div className="w-60 h-60 overflow-hidden bg-shadow rounded-full flex justify-center items-center text-xl">
        {user?.profileImg && user?.profileImg !== "" ? (
          <Image imageId={user?.profileImg!} />
        ) : (
          <h6>No Profile Image</h6>
        )}
      </div>

      {/*New Profile Image Form*/}
      <form className="flex flex-col">
        <h5>Select New Profile Image</h5>
      </form>
    </div>
  );
};

export default ProfileImageConfiguration;
