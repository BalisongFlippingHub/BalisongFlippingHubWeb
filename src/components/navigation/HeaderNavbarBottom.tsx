import {
  faCircleUser,
  faCubes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const HeaderNavbarBottom = () => {
  const user = useAppSelector((state) => state.auth.user);

  const navlinkStyles = ({ isActive }: NavLinkRenderProps) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      backgroundColor: isActive ? "#003333" : "inherit",
    };
  };

  const profileNavLinkStyles = ({ isActive }: NavLinkRenderProps) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      backgroundColor: isActive ? "teal" : "inherit",
    };
  };

  return (
    <div className="flex text-white">
      <NavLink
        to={`/${user?.displayName}/${user?.identifierCode}`}
        style={navlinkStyles}
        className="flex justify-center items-center p-2"
      >
        <FontAwesomeIcon icon={faCircleUser} size="2xl" />
      </NavLink>

      <NavLink
        to={`/${user?.displayName}/${user?.identifierCode}/collection`}
        style={profileNavLinkStyles}
        className="flex justify-center items-center p-2"
      >
        <FontAwesomeIcon icon={faCubes} size="2xl" />
      </NavLink>

      <NavLink
        to="/me/create-post"
        style={profileNavLinkStyles}
        className="flex justify-center items-center p-2"
      >
        <FontAwesomeIcon icon={faPlus} size="2xl" />
      </NavLink>
    </div>
  );
};

export default HeaderNavbarBottom;
