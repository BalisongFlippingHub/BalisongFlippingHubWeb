import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImageDisplay from "../ProfileImageDisplay";
import { logout } from "../../redux/auth/authActions";
import { clearCollection } from "../../redux/collection/collectionSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const HeaderProfileDisplay = () => {
  const [userNav, displayUserNav] = useState(false);
  const [currURL, setCurrURL] = useState("");

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .finally(() => {
        dispatch(clearCollection());
        navigate("/login");
      });
  };

  useEffect(() => {
    setCurrURL(location.pathname);
  }, []);

  useEffect(() => {
    if (location.pathname !== currURL) {
      setCurrURL(location.pathname);
      displayUserNav(false);
    }
  }, [location]);

  return (
    <div className="flex gap-2">
      {/*Notifications Bell Icon*/}
      <button type="button">
        <FontAwesomeIcon icon={faBell} />
      </button>

      {/*User Icon*/}
      <div
        className="flex gap-2 hover:cursor-pointer"
        onClick={() => displayUserNav((prev) => !prev)}
      >
        {/*Display for large screens*/}
        <div className="lg:visible lg:static xsm:absolute xsm:collapse w-8 h-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faUser} />
        </div>

        {/*Display for medium to small screens*/}
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black rounded-full overflow-hidden lg:collapse lg:absolute xsm:static xsm:visible">
          {user?.profileImg === null || user?.profileImg === "" ? (
            <FontAwesomeIcon icon={faUser} />
          ) : (
            <ProfileImageDisplay />
          )}
        </div>

        {/*Display Name or User ID Display*/}
        <div className="flex items-center text-lg md:visible md:static xsm:collapse xsm:absolute">
          {user?.displayName && user.displayName !== "" ? (
            <h4>{user?.displayName}</h4>
          ) : (
            <h4>{user?.id}</h4>
          )}
        </div>
      </div>

      {/*Account Drop Down Menu*/}
      {userNav ? (
        <div className="absolute bg-shadow mt-[49px] w-36 right-0">
          <ul>
            <li
              className="flex p-2 hover:cursor-pointer hover:bg-shadow-green border-b"
              onClick={() =>
                navigate(`/${user?.displayName}/${user?.identifierCode}`)
              }
            >
              Profile
            </li>
            <li
              className="flex p-2 hover:cursor-pointer hover:bg-shadow-green border-b"
              onClick={() => navigate(`/configure`)}
            >
              Settings
            </li>
            <li
              className="flex p-2 hover:cursor-pointer hover:bg-shadow-green"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HeaderProfileDisplay;
