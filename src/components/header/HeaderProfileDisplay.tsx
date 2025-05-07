import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImageDisplay from "../ProfileImageDisplay";
import { logout } from "../../redux/auth/authActions";
import { clearCollection } from "../../redux/collection/collectionSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useWindowSize from "../../hooks/useWindowSize";

const HeaderProfileDisplay = () => {
  const [userNav, displayUserNav] = useState(false);
  const [currURL, setCurrURL] = useState("");

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const windowSize = useWindowSize();

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
        <FontAwesomeIcon icon={faBell} size="xl" />
      </button>

      {/*User Display Portal*/}
      <div
        className="flex gap-2 hover:cursor-pointer"
        onClick={() => displayUserNav((prev) => !prev)}
      >
        {user?.profileImg && user.profileImg != "" ? (
          <div>
            <ProfileImageDisplay />
          </div>
        ) : (
          <div>
            <FontAwesomeIcon icon={faCircleUser} size="xl" />
          </div>
        )}

        {/*For larger Screens - Display user ID or User display name*/}
        {windowSize.at(1)! > 950 ? (
          <div className="flex items-center">
            <h4>
              {user?.displayName && user.displayName != ""
                ? user?.displayName
                : user?.id}
            </h4>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/*Account Drop Down Menu*/}
      {userNav ? (
        <div className="absolute bg-black mt-[42px] w-36 right-0">
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
